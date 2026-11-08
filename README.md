# Mohamad Suffian Portfolio

React portfolio built with Vite, Tailwind CSS, and lucide-react icons.

Project cards, profile stats, and the language mix are generated from the real GitHub account `xxMrPHDxx`.

## Local Development

```bash
npm install
gh auth login          # once, if not already authenticated
npm run sync:github    # refresh src/data/github.json from GitHub
npm run dev
```

## GitHub Sync

The portfolio reads a generated snapshot in `src/data/github.json`. The sync script uses the GitHub CLI, so no API token or runtime request is needed.

```bash
npm run sync:github
```

What it pulls:

- Profile: name, location, company, followers, public repo count, avatar URL.
- Featured projects: description, topics, stars, forks, primary language, push date, and live URL.
- Language mix: byte-weighted breakdown across public, non-fork repositories.

### Choose featured projects

Edit `github.config.json`:

```json
{
  "repo": "pdf-lambda-demo",
  "category": "Data & Backend",
  "title": "PDF Fulfilment Pipeline on AWS",
  "summary": "One-line card description.",
  "longDescription": "Longer modal description.",
  "tags": ["NestJS", "Go", "AWS"]
}
```

`summary`, `longDescription`, `tags`, `title`, and `category` are optional overrides. The script fills missing values from GitHub metadata.

Only public repositories are synced. Private repos are ignored so the public portfolio never publishes private links or metadata.

## Build

```bash
npm run build
npm run preview
```

`npm run deploy` syncs GitHub data before building and publishing with `gh-pages`.

## GitHub Pages

The deployment workflow runs `npm run sync:github` before every build using the workflow's `GITHUB_TOKEN`.

For account page, create repository named `xxMrPHDxx.github.io`, push this project to `main`, then enable Pages source as `GitHub Actions` in repository settings.

If deploying under project repository like `portfolio`, set `base: '/portfolio/'` in `vite.config.js` and update `homepage` in `package.json`.
