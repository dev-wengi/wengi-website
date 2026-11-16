import type { LucideIcon } from 'lucide-react'
import { Braces, PenTool, Accessibility, Briefcase, Users, GitBranch } from 'lucide-react'

export type PostVisual =
  | { type: 'browser'; title: string }
  | { type: 'code'; file: string; lines: string[] }
  | { type: 'photo'; src: string; alt: string }

export interface BlogPost {
  slug: string
  topic: string
  title: string
  excerpt: string
  readMinutes: number
  visual: PostVisual
  icon: LucideIcon
}

export const BLOG_FILTERS = [
  'All topics',
  'Frontend',
  'Backend',
  'Design',
  'Career',
  'Community',
  'Developer tools',
]

export const FEATURED_POST: BlogPost = {
  slug: 'ship-first-react-project',
  topic: 'Frontend',
  title: 'Ship your first React project. Keep it simple.',
  excerpt:
    'Start with a tiny task board. Break it into components, add state, and give every interaction a clear purpose.',
  readMinutes: 12,
  visual: {
    type: 'photo',
    src: '/images/project-desk.jpg',
    alt: 'Laptop on a wooden desk workspace',
  },
  icon: Braces,
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'css-layouts-real-content',
    topic: 'Frontend',
    title: 'CSS layouts that survive real content',
    excerpt:
      'Build flexible cards and page layouts that work beyond the perfect screenshot.',
    readMinutes: 7,
    visual: { type: 'browser', title: 'Made to make a difference.' },
    icon: PenTool,
  },
  {
    slug: 'first-api-one-route',
    topic: 'Backend',
    title: 'Your first API, one route at a time',
    excerpt:
      'Make a small Express API, understand each request, and handle the unhappy path.',
    readMinutes: 10,
    visual: {
      type: 'code',
      file: 'server.js',
      lines: [
        '// one route at a time',
        'app.get("/hello", (req, res) => {',
        '  res.json({ ok: true });',
        '});',
      ],
    },
    icon: Braces,
  },
  {
    slug: 'better-forms-better-questions',
    topic: 'Design',
    title: 'Better forms begin with better questions',
    excerpt:
      'Turn a complicated signup into a clear, accessible conversation with your users.',
    readMinutes: 6,
    visual: { type: 'browser', title: 'Hello, builder.' },
    icon: Accessibility,
  },
  {
    slug: 'portfolio-with-story',
    topic: 'Career',
    title: 'A portfolio with a story, not just screenshots',
    excerpt:
      'Explain the problem, your decisions and what you would improve in your next build.',
    readMinutes: 8,
    visual: {
      type: 'photo',
      src: '/images/project-monitor.jpg',
      alt: 'Code displayed on a computer monitor',
    },
    icon: Briefcase,
  },
  {
    slug: 'ask-for-help',
    topic: 'Community',
    title: 'How to ask for help without feeling stuck',
    excerpt:
      'Share useful context, show what you tried, and make debugging a team effort.',
    readMinutes: 5,
    visual: {
      type: 'photo',
      src: '/images/vision-community.jpg',
      alt: 'Community members coding together at a hackathon',
    },
    icon: Users,
  },
  {
    slug: 'git-without-guesswork',
    topic: 'Developer tools',
    title: 'Git without the guesswork',
    excerpt:
      'A calmer workflow for branches, commits and your first collaborative pull request.',
    readMinutes: 9,
    visual: {
      type: 'code',
      file: 'a better way to collaborate',
      lines: [
        '$ git checkout -b my-first-build',
        '$ git add .',
        '$ git commit -m "start small"',
        '✓ one step forward',
      ],
    },
    icon: GitBranch,
  },
  {
    slug: 'figma-frame-to-page',
    topic: 'Frontend',
    title: 'From a Figma frame to a responsive page',
    excerpt:
      'Translate spacing, type and components into a page that feels right at every size.',
    readMinutes: 11,
    visual: { type: 'browser', title: 'Less friction. More clarity.' },
    icon: PenTool,
  },
  {
    slug: 'model-project-data',
    topic: 'Backend',
    title: 'Start small: model your project data',
    excerpt:
      'Sketch the relationships before writing queries. A task board is all you need.',
    readMinutes: 8,
    visual: {
      type: 'code',
      file: 'index.js',
      lines: [
        'const progress = {',
        '  learned: "one new thing",',
        '  built: "something useful"',
        '};',
      ],
    },
    icon: Braces,
  },
  {
    slug: 'unfinished-project-worth-sharing',
    topic: 'Community',
    title: 'Your unfinished project is worth sharing',
    excerpt:
      'A simple build log can turn small lessons and open questions into shared learning.',
    readMinutes: 4,
    visual: {
      type: 'photo',
      src: '/images/hero.jpg',
      alt: 'Developers collaborating on laptops at a community hackathon',
    },
    icon: Users,
  },
]

export const ALL_POSTS: BlogPost[] = [FEATURED_POST, ...BLOG_POSTS]
