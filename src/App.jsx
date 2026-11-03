import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Send, 
  Menu, 
  X, 
  Terminal, 
  Cpu, 
  Globe, 
  Database, 
  Layers, 
  CheckCircle2, 
  Copy, 
  ChevronRight,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import IconLink from './components/IconLink.jsx';
import ProjectFilterButton from './components/ProjectFilterButton.jsx';
import SectionTitle from './components/SectionTitle.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, submitted: false, error: null });

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle active navigation highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Simulate API request delay
    setTimeout(() => {
      setFormStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null });
      }, 5000);
    }, 1200);
  };

  const skillsData = {
    Frontend: [
      { name: 'React.js / Next.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'HTML5 / CSS3 / Tailwind CSS', level: 95 },
      { name: 'TypeScript', level: 82 },
    ],
    Backend: [
      { name: 'Python', level: 88 },
      { name: 'Node.js / Express', level: 80 },
      { name: 'RESTful APIs & GraphQL', level: 88 },
      { name: 'SQL & PostgreSQL / MongoDB', level: 78 },
    ],
    Tools: [
      { name: 'Git & GitHub Collaboration', level: 92 },
      { name: 'Docker & Containerization', level: 75 },
      { name: 'Linux / Command Line', level: 85 },
      { name: 'CI/CD Pipelines & Vercel', level: 80 },
    ]
  };

  const projectsData = [
    {
      id: 1,
      title: 'DevPulse - Full-Stack Developer Platform',
      category: 'Full Stack',
      description: 'A modern collaborative web app designed for developers to share code snippets, track project milestones, and integrate with GitHub workflows in real-time.',
      longDescription: 'DevPulse bridges developer collaboration with automated project dashboards. It features OAuth authentication, real-time code highlighting, custom workspace channels, and automated webhook integration with GitHub repositories.',
      tags: ['React', 'Python', 'Tailwind CSS', 'REST APIs', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/xxMrPHDxx',
      live: 'https://github.com/xxMrPHDxx',
      featured: true
    },
    {
      id: 2,
      title: 'Automated Data Pipeline & Dashboard',
      category: 'Data & Backend',
      description: 'An interactive analytical dashboard with custom Python data fetchers, transforming asynchronous API streams into real-time graphical visual metrics.',
      longDescription: 'Built to aggregate high-frequency financial and web analytics data. Python workers collect structured data from third-party APIs into MongoDB, while a sleek React front-end serves lightweight dynamic charting.',
      tags: ['Python', 'React', 'REST APIs', 'Chart.js', 'FastAPI'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/xxMrPHDxx',
      live: 'https://github.com/xxMrPHDxx',
      featured: true
    },
    {
      id: 3,
      title: 'NextGen E-Commerce Interface',
      category: 'Frontend',
      description: 'A lightning-fast modern shopping experience built with React, context state management, glassmorphism UI design, and responsive cart workflows.',
      longDescription: 'Focuses on micro-interactions and performance optimization. Features smooth animated product grids, quick-view modals, seamless search & multi-tag filtering, and client-side checkout simulations.',
      tags: ['React', 'JavaScript', 'Tailwind CSS', 'State Management'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/xxMrPHDxx',
      live: 'https://github.com/xxMrPHDxx',
      featured: false
    },
    {
      id: 4,
      title: 'Git Workflow & Repo Insights CLI',
      category: 'Tools & Utilities',
      description: 'A developer productivity CLI tool written in Python to analyze git commit velocity, line churn, and code contributor stats with intuitive visual outputs.',
      longDescription: 'Simplifies repository health checks directly in the terminal. Includes export options to formatted JSON or interactive HTML visual summaries for engineering team leads.',
      tags: ['Python', 'Git', 'CLI', 'Web Scraping'],
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
      github: 'https://github.com/xxMrPHDxx',
      live: 'https://github.com/xxMrPHDxx',
      featured: false
    }
  ];

  const experienceData = [
    {
      role: 'Software & Web Developer',
      company: 'Tech Solutions & Consulting',
      period: '2022 - Present',
      description: 'Architecting dynamic web applications, developing scalable REST APIs, and modernizing frontend interfaces using React and modern CSS architecture.',
      achievements: [
        'Built modern single-page applications boosting client engagement by 40%.',
        'Implemented modular backend Python scripts to streamline data sync processes.',
        'Championed clean code practices, Git flow standards, and reusable component libraries.'
      ]
    },
    {
      role: 'Frontend Developer & Tech Consultant',
      company: 'Digital Innovation Lab',
      period: '2020 - 2022',
      description: 'Focused on UI/UX redesigns, component lifecycle optimization, cross-browser compatibility, and seamless web interface integrations.',
      achievements: [
        'Converted complex Figma blueprints into fluid responsive React web interfaces.',
        'Reduced web bundle load times by 35% through lazy loading and code splitting.'
      ]
    }
  ];

  const educationData = [
    {
      degree: 'Bachelor of Computer Science / Information Technology',
      institution: 'Higher Education Institution',
      period: '2017 - 2021',
      details: 'Specialized in Software Engineering, Web Systems, Database Management, and Algorithm Analysis.'
    }
  ];

  const filteredProjects = activeProjectFilter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeProjectFilter);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* BACKGROUND GRAPHICS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${darkMode ? 'bg-cyan-500' : 'bg-blue-400'}`}></div>
        <div className={`absolute top-1/2 -left-40 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`}></div>
        <div className={`absolute -bottom-40 right-1/3 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* BRAND / LOGO */}
            <a href="#hero" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                MS
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Mohamad Suffian
              </span>
            </a>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg transition-colors relative ${
                      isActive 
                        ? 'text-cyan-400 font-semibold' 
                        : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* ACTION BUTTONS (DARK MODE & SOCIALS) */}
            <div className="hidden md:flex items-center space-x-3">
              <IconLink href="https://github.com/xxMrPHDxx" title="GitHub Profile" darkMode={darkMode}>
                <Github size={18} />
              </IconLink>
              <IconLink href="https://www.linkedin.com/in/mohamad-suffian-abu-bakar-717bb5288/" title="LinkedIn Profile" darkMode={darkMode}>
                <Linkedin size={18} />
              </IconLink>
              <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} mobile />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'}`}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 pt-2 pb-6 space-y-2 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            {[
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Experience', href: '#experience' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  darkMode ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex space-x-4">
              <a
                href="https://github.com/xxMrPHDxx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-cyan-400"
              >
                <Github size={16} /> <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mohamad-suffian-abu-bakar-717bb5288/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-indigo-400"
              >
                <Linkedin size={16} /> <span>LinkedIn</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen pt-28 pb-16 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 backdrop-blur-md">
                <Sparkles size={14} className="animate-pulse" />
                <span>Available for Full-Stack & Web Projects</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
                Hello, I'm <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Mohamad Suffian
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-medium text-slate-400">
                Full-Stack Software Developer & Web Specialist
              </p>

              <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                I craft elegant, high-performance web applications using modern JavaScript, React, Python, and RESTful architectures. Passionate about user experience, clean code, and solving complex problems through technology.
              </p>

              {/* CALL TO ACTION BUTTONS */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <a
                  href="#projects"
                  className="px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center space-x-2 group"
                >
                  <span>Explore My Work</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className={`px-6 py-3.5 rounded-xl font-semibold border transition-all ${
                    darkMode 
                      ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200' 
                      : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  Get In Touch
                </a>
              </div>

              {/* SOCIAL LINKS BADGES */}
              <div className="pt-6 flex items-center justify-center lg:justify-start space-x-6 text-slate-400">
                <a 
                  href="https://github.com/xxMrPHDxx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm hover:text-cyan-400 transition-colors"
                >
                  <Github size={20} />
                  <span>@xxMrPHDxx</span>
                  <ArrowUpRight size={14} />
                </a>
                <span className="text-slate-700">•</span>
                <a 
                  href="https://www.linkedin.com/in/mohamad-suffian-abu-bakar-717bb5288/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm hover:text-indigo-400 transition-colors"
                >
                  <Linkedin size={20} />
                  <span>Mohamad Suffian</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* HERO VISUAL CARD / CODE EDITOR SIMULATION */}
            <div className="lg:col-span-5">
              <div className={`rounded-2xl p-6 border shadow-2xl backdrop-blur-xl relative overflow-hidden ${
                darkMode ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-800'
              }`}>
                {/* WINDOW CONTROLS */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/40">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="text-xs font-mono text-slate-500">developer.profile.js</div>
                </div>

                {/* CODE CONTENT */}
                <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300">
                  <code>
                    <span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = {'{\n'}
                    {'  '}name: <span className="text-emerald-400">'Mohamad Suffian Abu Bakar'</span>,\n
                    {'  '}title: <span className="text-emerald-400">'Full Stack Developer'</span>,\n
                    {'  '}coreTech: [<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'JS'</span>, <span className="text-emerald-400">'Python'</span>, <span className="text-emerald-400">'APIs'</span>],\n
                    {'  '}passions: [<span className="text-emerald-400">'Clean Architecture'</span>, <span className="text-emerald-400">'UI/UX'</span>, <span className="text-emerald-400">'Git Workflows'</span>],\n
                    {'  '}status: <span className="text-amber-300">'Ready for opportunities'</span>\n
                    {'}'};\n\n
                    <span className="text-purple-400">function</span> <span className="text-blue-400">buildSolutions</span>() {'{\n'}
                    {'  '}return developer.coreTech.<span className="text-yellow-300">map</span>(tech =&gt; {'\n'}
                    {'    '}<span className="text-cyan-300">createScalableApp</span>(tech)\n
                    {'  '});\n
                    {'}'}
                  </code>
                </pre>

                {/* HIGHLIGHT FLOATING PILLS */}
                <div className="mt-6 pt-4 border-t border-slate-700/40 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    ⚡ Fast Performance
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    🎨 Glassmorphism UI
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    🔄 API Integration
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-20 relative z-10 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle eyebrow="Get To Know Me" title="Driven by Passion, Built on Code" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* BIO CONTENT */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                I'm Mohamad Suffian Abu Bakar, a versatile Web & Software Developer.
              </h3>
              
              <p className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                With a robust foundation in web development, interactive frontend frameworks, and Python backend scripts, I specialize in bringing modern web platforms from conceptual designs to deployment.
              </p>

              <p className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Whether I am writing React components with Tailwind CSS, modeling backend API services, or version controlling with Git, my focus is always on delivering intuitive, accessible, and high-performance digital solutions.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-3xl font-extrabold text-cyan-400 mb-1">3+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Years Experience</div>
                </div>
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-3xl font-extrabold text-indigo-400 mb-1">15+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Projects Built</div>
                </div>
              </div>
            </div>

            {/* KEY HIGHLIGHT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Code2 className="text-cyan-400" size={28} />,
                  title: 'Frontend Crafting',
                  desc: 'Building responsive React applications with modern hooks, component systems, and Tailwind CSS.'
                },
                {
                  icon: <Terminal className="text-indigo-400" size={28} />,
                  title: 'Python Development',
                  desc: 'Developing scripting solutions, API servers, data parsing tools, and automation tasks.'
                },
                {
                  icon: <Globe className="text-purple-400" size={28} />,
                  title: 'RESTful APIs',
                  desc: 'Connecting systems via structured JSON endpoints, standard OAuth mechanisms, and asynchronous data pipelines.'
                },
                {
                  icon: <Cpu className="text-emerald-400" size={28} />,
                  title: 'Git & Workflows',
                  desc: 'Maintaining clean commits, pull requests, continuous deployment, and collaborative codebases.'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl border backdrop-blur-sm transition-all hover:-translate-y-1 ${
                    darkMode 
                      ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' 
                      : 'bg-white border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SKILLS / TECH STACK SECTION */}
      <section id="skills" className="py-20 relative z-10 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle eyebrow="Capabilities & Tools" title="Skills & Technical Mastery" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills]) => (
              <div 
                key={category} 
                className={`p-6 rounded-2xl border backdrop-blur-sm ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  {category === 'Frontend' && <Code2 className="text-cyan-400" size={22} />}
                  {category === 'Backend' && <Database className="text-indigo-400" size={22} />}
                  {category === 'Tools' && <Layers className="text-purple-400" size={22} />}
                  <h3 className="text-xl font-bold">{category}</h3>
                </div>

                <div className="space-y-5">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5 font-medium">
                        <span>{skill.name}</span>
                        <span className="text-slate-400 text-xs">{skill.level}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* BADGE CLOUD */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider">Quick Tech Summary</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {['ReactJS', 'JavaScript (ES6)', 'Python', 'Tailwind CSS', 'Web Development', 'REST APIs', 'Git', 'GitHub', 'HTML5', 'CSS3', 'Node.js', 'PostgreSQL', 'Docker', 'Vercel', 'JSON'].map((tech) => (
                <span 
                  key={tech}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-500/50 hover:text-indigo-600'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS SHOWCASE SECTION */}
      <section id="projects" className="py-20 relative z-10 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle eyebrow="Featured Work" title="Projects Showcase" className="mb-12" />

          {/* PROJECT CATEGORY FILTERS */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {['All', 'Full Stack', 'Frontend', 'Data & Backend', 'Tools & Utilities'].map((cat) => (
              <ProjectFilterButton
                key={cat}
                category={cat}
                activeCategory={activeProjectFilter}
                darkMode={darkMode}
                onClick={setActiveProjectFilter}
              />
            ))}
          </div>

          {/* PROJECTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className={`group rounded-2xl border overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  darkMode ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div>
                  {/* PROJECT IMAGE CONTAINER */}
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-cyan-400">
                      {project.category}
                    </span>
                  </div>

                  {/* PROJECT CONTENT */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                            darkMode ? 'bg-slate-800/80 text-cyan-300' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD FOOTER LINKS */}
                <div className={`p-6 pt-0 border-t border-transparent flex items-center justify-between`}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ChevronRight size={14} />
                  </button>

                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                      title="View GitHub Code"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                      title="Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`max-w-2xl w-full rounded-2xl border p-6 relative overflow-hidden shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="w-full h-48 object-cover rounded-xl mb-6"
            />

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              {selectedProject.category}
            </span>

            <h3 className="text-2xl font-bold mt-3 mb-2">{selectedProject.title}</h3>

            <p className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedProject.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-cyan-300">
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 hover:bg-slate-800 flex items-center space-x-2"
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white flex items-center space-x-2"
              >
                <span>Live Project</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* EXPERIENCE & EDUCATION SECTION */}
      <section id="experience" className="py-20 relative z-10 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle eyebrow="Career Journey" title="Experience & Education" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* EXPERIENCE TIMELINE */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Briefcase size={22} />
                </div>
                <h3 className="text-2xl font-bold">Work Experience</h3>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {experienceData.map((exp, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-slate-950"></div>
                    
                    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
                      darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{exp.role}</h4>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400">
                          {exp.period}
                        </span>
                      </div>
                      
                      <div className="text-xs font-medium text-indigo-400 mb-4">{exp.company}</div>
                      
                      <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {exp.description}
                      </p>

                      <ul className="space-y-2 text-xs text-slate-400">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION TIMELINE */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <GraduationCap size={22} />
                </div>
                <h3 className="text-2xl font-bold">Education & Certifications</h3>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {educationData.map((edu, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-indigo-400 ring-4 ring-slate-950"></div>
                    
                    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
                      darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{edu.degree}</h4>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-400">
                          {edu.period}
                        </span>
                      </div>
                      
                      <div className="text-xs font-medium text-cyan-400 mb-3">{edu.institution}</div>
                      
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}

                {/* CERTIFICATIONS BADGE BOX */}
                <div className="relative pl-10">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-slate-950"></div>
                  
                  <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
                    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <h4 className="font-bold text-lg mb-3">Continuous Learning</h4>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Actively refining capabilities across modern React ecosystems, state management, full-stack API integration, and cloud deployment practices.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                        React Specialist
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                        Python Architect
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                        Git Workflows
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 relative z-10 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle eyebrow="Let's Connect" title="Get In Touch" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* CONTACT INFO CARD */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`p-8 rounded-2xl border backdrop-blur-md ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  
                  {/* EMAIL */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email</p>
                      <button 
                        onClick={() => copyToClipboard('msuffian1997@gmail.com')}
                        className="text-sm font-semibold hover:text-cyan-400 flex items-center space-x-2 mt-0.5"
                      >
                        <span className="truncate">msuffian1997@gmail.com</span>
                        <Copy size={14} className="shrink-0" />
                      </button>
                      {copied && <span className="text-xs text-emerald-400 mt-1 block">Copied to clipboard!</span>}
                    </div>
                  </div>

                  {/* LINKEDIN */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/mohamad-suffian-abu-bakar-717bb5288/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:text-indigo-400 flex items-center space-x-1 mt-0.5"
                      >
                        <span>Mohamad Suffian Abu Bakar</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* GITHUB */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                      <Github size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">GitHub</p>
                      <a 
                        href="https://github.com/xxMrPHDxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:text-purple-400 flex items-center space-x-1 mt-0.5"
                      >
                        <span>@xxMrPHDxx</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/60">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Open for software engineering opportunities, project collaborations, and full-stack development inquiries.
                  </p>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="lg:col-span-7">
              <form 
                onSubmit={handleFormSubmit}
                className={`p-8 rounded-2xl border backdrop-blur-md space-y-6 ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">Send a Message</h3>

                {formStatus.submitted && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center space-x-2">
                    <CheckCircle2 size={18} />
                    <span>Thank you! Your message has been successfully submitted.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors ${
                        darkMode 
                          ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-white' 
                          : 'bg-slate-50 border-slate-300 focus:border-indigo-500 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Your Email
                    </label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors ${
                        darkMode 
                          ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-white' 
                          : 'bg-slate-50 border-slate-300 focus:border-indigo-500 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Subject
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Collaboration"
                    className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors ${
                      darkMode 
                        ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-white' 
                        : 'bg-slate-50 border-slate-300 focus:border-indigo-500 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Mohamad Suffian, I'd like to discuss..."
                    className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors ${
                      darkMode 
                        ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-white' 
                        : 'bg-slate-50 border-slate-300 focus:border-indigo-500 text-slate-900'
                    }`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-95 shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  {formStatus.submitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-8 border-t text-sm ${darkMode ? 'border-slate-800/80 bg-slate-950 text-slate-500' : 'border-slate-200 bg-white text-slate-500'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Mohamad Suffian Abu Bakar. All rights reserved.</p>

          <div className="flex space-x-6">
            <a 
              href="https://github.com/xxMrPHDxx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/mohamad-suffian-abu-bakar-717bb5288/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
