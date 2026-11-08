#!/usr/bin/env node
/**
 * Sync real GitHub profile and repository data into src/data/github.json.
 *
 * Requires the GitHub CLI to be installed and authenticated:
 *   gh auth login
 *
 * Run:
 *   npm run sync:github
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_PATH = resolve(ROOT, 'github.config.json');
const OUTPUT_PATH = resolve(ROOT, 'src', 'data', 'github.json');

function gh(args) {
  try {
    return execFileSync('gh', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 32 * 1024 * 1024,
    }).trim();
  } catch (error) {
    const detail = error.stderr?.toString().trim() || error.message;
    throw new Error(`gh ${args.join(' ')} failed:\n${detail}`);
  }
}

function ghJson(args) {
  const output = gh(args);
  return output ? JSON.parse(output) : null;
}

function normalizeUrl(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function fetchAllRepos(username) {
  const fields = [
    'name',
    'description',
    'homepageUrl',
    'url',
    'isFork',
    'isArchived',
    'primaryLanguage',
    'repositoryTopics',
    'pushedAt',
    'updatedAt',
    'stargazerCount',
    'forkCount',
  ].join(',');
  return ghJson([
    'repo',
    'list',
    username,
    '--visibility',
    'public',
    '--limit',
    '500',
    '--json',
    fields,
  ]);
}

function fetchLanguageStats(username) {
  const query = `
    query($login: String!, $cursor: String) {
      user(login: $login) {
        repositories(
          first: 100
          after: $cursor
          ownerAffiliations: OWNER
          isFork: false
          privacy: PUBLIC
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          pageInfo { hasNextPage endCursor }
          nodes {
            name
            languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name color } }
            }
          }
        }
      }
    }
  `;

  const totals = new Map();
  let cursor = null;

  for (;;) {
    const args = ['api', 'graphql', '-f', `query=${query}`, '-f', `login=${username}`];
    if (cursor) args.push('-f', `cursor=${cursor}`);

    const response = ghJson(args);
    const connection = response?.data?.user?.repositories;
    if (!connection) throw new Error('Unexpected GraphQL response while reading languages.');

    for (const repo of connection.nodes) {
      for (const edge of repo.languages.edges) {
        const name = edge.node.name;
        const color = edge.node.color || '#64748b';
        const current = totals.get(name) || { name, color, bytes: 0 };
        current.bytes += edge.size;
        current.color = color;
        totals.set(name, current);
      }
    }

    if (!connection.pageInfo.hasNextPage) break;
    cursor = connection.pageInfo.endCursor;
  }

  const languages = [...totals.values()].sort((a, b) => b.bytes - a.bytes);
  const totalBytes = languages.reduce((sum, language) => sum + language.bytes, 0) || 1;

  return {
    totalBytes,
    languages: languages.map((language) => ({
      ...language,
      percent: Math.round((language.bytes / totalBytes) * 1000) / 10,
    })),
    colorByName: Object.fromEntries(languages.map((language) => [language.name, language.color])),
  };
}

function buildProjects(config, repos, colorByName) {
  const reposByName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
  const seen = new Set();

  return config.featured.map((entry, index) => {
    const repo = reposByName.get(entry.repo.toLowerCase());
    if (!repo) {
      throw new Error(
        `Featured repo "${entry.repo}" was not found for ${config.username}. ` +
          'Check github.config.json or make sure the repository is public.'
      );
    }
    if (seen.has(repo.name.toLowerCase())) {
      throw new Error(`Repo "${repo.name}" appears more than once in github.config.json.`);
    }
    seen.add(repo.name.toLowerCase());

    const language = repo.primaryLanguage?.name || null;
    const live = normalizeUrl(repo.homepageUrl);
    const description =
      entry.summary ||
      repo.description ||
      `${entry.title || repo.name} — a ${language || 'software'} project.`;

    return {
      id: index + 1,
      repo: repo.name,
      title: entry.title || repo.name,
      category: entry.category || 'Other',
      description,
      longDescription: entry.longDescription || description,
      tags: entry.tags?.length
        ? entry.tags
        : (repo.repositoryTopics || []).map((topic) => topic.name).slice(0, 6),
      image: entry.image || null,
      github: repo.url,
      live,
      hasLive: Boolean(live && live !== repo.url),
      featured: entry.featured ?? true,
      language,
      languageColor: language ? colorByName[language] || '#64748b' : '#64748b',
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      pushedAt: repo.pushedAt,
      updatedAt: repo.updatedAt,
    };
  });
}

function main() {
  console.log('→ Reading github.config.json');
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  if (!config.username) fail('github.config.json must include a "username".');
  if (!Array.isArray(config.featured) || config.featured.length === 0) {
    fail('github.config.json must include a non-empty "featured" array.');
  }

  console.log('→ Checking gh authentication');
  try {
    gh(['auth', 'status']);
  } catch {
    fail('GitHub CLI is not authenticated. Run: gh auth login');
  }

  console.log(`→ Fetching profile for ${config.username}`);
  const user = ghJson([
    'api',
    `users/${config.username}`,
    '--jq',
    '{login,name,bio,company,blog,location,twitter_username,public_repos,followers,following,avatar_url,created_at,html_url}',
  ]);

  console.log('→ Fetching repositories');
  const repos = fetchAllRepos(config.username);
  const owned = repos.filter((repo) => !repo.isFork && !repo.isArchived);

  console.log('→ Aggregating language stats from GitHub');
  const languageStats = fetchLanguageStats(config.username);
  const languages = languageStats.languages.slice(0, 10);

  console.log('→ Fetching per-repo language breakdown');
  const projects = buildProjects(config, repos, languageStats.colorByName).map((project) => {
    let languagesByRepo = {};
    try {
      languagesByRepo = ghJson(['api', `repos/${config.username}/${project.repo}/languages`]);
    } catch {
      // Language data is optional; the card still renders from primary language.
    }
    return { ...project, languages: languagesByRepo };
  });

  const data = {
    generatedAt: new Date().toISOString(),
    profile: {
      login: user.login,
      name: user.name || user.login,
      bio: user.bio || '',
      company: user.company || '',
      blog: user.blog || '',
      location: user.location || '',
      twitterUsername: user.twitter_username || '',
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at,
      url: user.html_url || `https://github.com/${user.login}`,
    },
    stats: {
      sourceRepoCount: owned.length,
      totalStars: owned.reduce((sum, repo) => sum + repo.stargazerCount, 0),
      languageCount: languages.length,
      languages,
    },
    projects,
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

  console.log(`✓ Wrote ${projects.length} projects and ${owned.length} repos to src/data/github.json`);
  console.log(`  Languages: ${languages.slice(0, 5).map((item) => item.name).join(', ')}`);
}

try {
  main();
} catch (error) {
  fail(error.message);
}
