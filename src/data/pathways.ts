import type { LucideIcon } from 'lucide-react'
import { Code2, GitBranch, Server } from 'lucide-react'

export interface Pathway {
  id: string
  index: string
  title: string
  description: string
  learn: string[]
  meta: string
  href: string
  icon: LucideIcon
  containerClassName: string
  colors: number[][]
  animationSpeed: number
  dotSize: number
}

export const pathways: Pathway[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend',
    description:
      'Build for the web with HTML, CSS, JavaScript, React, and modern frontend tools.',
    learn: [
      'HTML and CSS that holds up',
      'JavaScript without the magic',
      'React components',
      'Shipping a real site',
    ],
    meta: 'Beginner friendly · 10 weeks',
    href: 'https://github.com/dev-wengi/dev-wengi/tree/main/tracks/frontend',
    icon: Code2,
    containerClassName: 'bg-[#0B3A16]',
    colors: [[108, 240, 90]],
    animationSpeed: 0.7,
    dotSize: 3,
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend',
    description:
      'Learn server-side development, APIs, and databases by building practical systems.',
    learn: [
      'APIs that return useful data',
      'Queries and data models',
      'Authentication and sessions',
      'Testing and deploying services',
    ],
    meta: 'Beginner friendly · 10 weeks',
    href: 'https://github.com/dev-wengi/dev-wengi/tree/main/tracks/backend',
    icon: Server,
    containerClassName: 'bg-black',
    colors: [[108, 240, 90], [96, 220, 80]],
    animationSpeed: 0.7,
    dotSize: 3,
  },
  {
    id: 'devops',
    index: '03',
    title: 'DevOps',
    description:
      'Explore deployment, CI/CD, and infrastructure through structured tasks.',
    learn: [
      'Git workflows and branching',
      'Linux and shell basics',
      'Build and deployment pipelines',
      'Monitoring running services',
    ],
    meta: 'Beginner friendly · 10 weeks',
    href: 'https://github.com/dev-wengi/dev-wengi/tree/main/tracks/devops',
    icon: GitBranch,
    containerClassName: 'bg-[#145A25]',
    colors: [[132, 245, 112]],
    animationSpeed: 0.7,
    dotSize: 3,
  },
]
