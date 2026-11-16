import type { LucideIcon } from 'lucide-react'
import {
  Sprout,
  PenTool,
  Braces,
  BookOpen,
  GitBranch,
  Accessibility,
  Figma,
  Atom,
  Compass,
  Code2,
  Users,
} from 'lucide-react'

export interface LearningPath {
  id: string
  index: string
  tag: string
  title: string
  blurb: string
  points: string[]
  outcome: string
  featured?: boolean
  icon: LucideIcon
}

export const RESOURCE_PATHS: LearningPath[] = [
  {
    id: 'first-website',
    index: '01',
    tag: 'New to code',
    title: 'Your first website',
    blurb: 'No coding experience needed',
    points: [
      'HTML: give your content structure',
      'CSS: make it responsive',
      'JavaScript: add an interaction',
    ],
    outcome: 'Build a personal introduction page',
    featured: true,
    icon: Sprout,
  },
  {
    id: 'interface-experience',
    index: '02',
    tag: 'Design curious',
    title: 'From interface to experience',
    blurb: 'Start with a problem, not a tool',
    points: [
      'Map a simple user journey',
      'Create a reusable UI in Figma',
      'Prototype, test and refine',
    ],
    outcome: 'Design an accessible signup flow',
    icon: PenTool,
  },
  {
    id: 'beyond-browser',
    index: '03',
    tag: 'Ready for the next step',
    title: 'Build beyond the browser',
    blurb: 'Comfortable with basic JavaScript',
    points: [
      'Use Git to manage changes',
      'Build and test a small API',
      'Connect a frontend to your data',
    ],
    outcome: 'Build a full-stack task board',
    icon: Braces,
  },
]

export type BriefVisual =
  | { type: 'browser'; title: string }
  | { type: 'code'; file: string; lines: string[] }

export interface ProjectBrief {
  id: string
  kicker: string
  topics: string[]
  level: string
  stages: number
  title: string
  description: string
  outcome: string
  visual: BriefVisual
  icon: LucideIcon
}

export const BRIEF_FILTERS = [
  'All projects',
  'HTML & CSS',
  'JavaScript',
  'React',
  'Backend',
  'Design',
  'Git',
]

export const PROJECT_BRIEFS: ProjectBrief[] = [
  {
    id: 'portfolio',
    kicker: 'HTML · CSS',
    topics: ['HTML & CSS'],
    level: 'Beginner',
    stages: 3,
    title: 'A portfolio that feels like you',
    description:
      'Build a responsive home for your work with semantic HTML and flexible layouts.',
    outcome: 'A responsive personal site',
    visual: { type: 'browser', title: 'Made to make a difference.' },
    icon: PenTool,
  },
  {
    id: 'expense-tracker',
    kicker: 'JavaScript',
    topics: ['JavaScript'],
    level: 'Beginner',
    stages: 4,
    title: 'A tiny expense tracker',
    description:
      'Practice forms, arrays and local storage with a useful everyday money log.',
    outcome: 'A working browser-based tracker',
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
    id: 'friendlier-signup',
    kicker: 'Figma · Accessibility',
    topics: ['Design'],
    level: 'Beginner',
    stages: 3,
    title: 'Design a friendlier signup',
    description:
      'Make a form easier to understand with good labels, focus states and helpful errors.',
    outcome: 'A testable signup prototype',
    visual: { type: 'browser', title: 'Hello, builder.' },
    icon: Accessibility,
  },
  {
    id: 'first-pull-request',
    kicker: 'Git · Markdown',
    topics: ['Git'],
    level: 'Beginner',
    stages: 3,
    title: 'Your first pull request',
    description:
      'Learn a repeatable Git workflow by improving a small project README.',
    outcome: 'A contribution-ready change',
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
    id: 'reading-list-api',
    kicker: 'Node.js · Express',
    topics: ['Backend'],
    level: 'Intermediate',
    stages: 5,
    title: 'An API for your reading list',
    description:
      'Create routes, validate inputs and return clear responses for a small collection.',
    outcome: 'A tested CRUD API',
    visual: {
      type: 'code',
      file: 'GET /api/projects',
      lines: [
        '{',
        '  "status": "ready",',
        '  "next": "build something"',
        '}',
      ],
    },
    icon: Braces,
  },
  {
    id: 'task-board',
    kicker: 'React · REST API',
    topics: ['React'],
    level: 'Intermediate',
    stages: 5,
    title: 'A task board, end to end',
    description:
      'Bring components and API calls together, including loading and error states.',
    outcome: 'A connected project dashboard',
    visual: { type: 'browser', title: 'Made to make a difference.' },
    icon: Atom,
  },
]

export interface Reference {
  id: string
  title: string
  description: string
  url: string
  host: string
  tag: string
  icon: LucideIcon
}

export const REFERENCES: Reference[] = [
  {
    id: 'mdn',
    title: 'MDN Web Docs',
    description:
      'Understand HTML, CSS and JavaScript with clear reference material.',
    url: 'https://developer.mozilla.org',
    host: 'developer.mozilla.org',
    tag: 'Web fundamentals',
    icon: BookOpen,
  },
  {
    id: 'javascript-info',
    title: 'JavaScript.info',
    description:
      'Go deeper on language concepts, from functions to async code.',
    url: 'https://javascript.info',
    host: 'javascript.info',
    tag: 'Language reference',
    icon: Braces,
  },
  {
    id: 'git-docs',
    title: 'Git documentation',
    description:
      'Look up everyday commands and build a safer collaboration habit.',
    url: 'https://git-scm.com/docs',
    host: 'git-scm.com/docs',
    tag: 'Version control',
    icon: GitBranch,
  },
  {
    id: 'react-docs',
    title: 'React documentation',
    description:
      'Learn components and state through the official learning guide.',
    url: 'https://react.dev/learn',
    host: 'react.dev/learn',
    tag: 'Frontend',
    icon: Atom,
  },
  {
    id: 'a11y',
    title: 'The A11Y Project',
    description:
      'Use a practical checklist to make your next interface more accessible.',
    url: 'https://www.a11yproject.com',
    host: 'a11yproject.com',
    tag: 'Inclusive design',
    icon: Accessibility,
  },
  {
    id: 'figma',
    title: 'Figma Learn',
    description:
      'Get comfortable with frames, auto layout and reusable components.',
    url: 'https://help.figma.com',
    host: 'help.figma.com',
    tag: 'Design practice',
    icon: Figma,
  },
]

export interface HeroStep {
  title: string
  text: string
  icon: LucideIcon
}

export const HERO_STEPS: HeroStep[] = [
  { title: 'Choose a direction', text: 'Start where you are.', icon: Compass },
  { title: 'Make something useful', text: 'Practice over perfection.', icon: Code2 },
  { title: 'Share what you learned', text: 'Grow with the community.', icon: Users },
]

export const DISCORD_INVITE = 'https://discord.gg/bbeZwXM9z'
export const CONTACT_EMAIL = 'dev.wengi.ke@gmail.com'
