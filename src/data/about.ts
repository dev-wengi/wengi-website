import type { LucideIcon } from 'lucide-react'
import { Users, Code2, Zap, Globe } from 'lucide-react'

// Stats were reduced from the design's marketing figures to realistic ones.
// Confirm or correct: 50+ trained, 120+ resources, 5+ partners, 2+ years.
export interface AboutStat {
  value: string
  label: string
}

export const ABOUT_STATS: AboutStat[] = [
  { value: '50+', label: 'Professionals Trained' },
  { value: '120+', label: 'Resources Shared' },
  { value: '5+', label: 'Industry Partners' },
  { value: '2+', label: 'Years Building' },
]

export interface AboutValue {
  title: string
  text: string
  icon: LucideIcon
}

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: 'Community First',
    text: 'Every decision we make puts our community members at the centre. Learning together is always better than learning alone.',
    icon: Users,
  },
  {
    title: 'Build in Public',
    text: "We share what we're building, what's broken, and what we learned. Transparency accelerates everyone's growth.",
    icon: Code2,
  },
  {
    title: 'Practical Skills',
    text: 'Theory is a starting point, not an end point. We focus on real projects, real code, and skills that translate directly to the workplace.',
    icon: Zap,
  },
  {
    title: 'Local Roots, Global Vision',
    text: "Grounded in Kisumu, we're building a community that competes and collaborates on the world stage.",
    icon: Globe,
  },
]

export interface TeamRole {
  role: string
  skills: string
  text: string
}

export const TEAM_ROLES: TeamRole[] = [
  {
    role: 'Community Lead',
    skills: 'Mentorship · Strategy',
    text: "The driving force behind DevWengi's vision, connecting members with mentors and opportunities.",
  },
  {
    role: 'Frontend Engineer',
    skills: 'React · UI/UX',
    text: "Crafts the user-facing experience across DevWengi's platforms and learning tools.",
  },
  {
    role: 'Backend Engineer',
    skills: 'Node.js · MongoDB',
    text: 'Architects the APIs and databases that power our projects and resource library.',
  },
  {
    role: 'DevOps & Infrastructure',
    skills: 'Cloud · CI/CD',
    text: 'Keeps our systems running, our deployments smooth, and our community tools reliable.',
  },
  {
    role: 'Content & Education',
    skills: 'Curriculum · Blog',
    text: 'Produces the tutorials, blog posts, and structured learning paths the community relies on.',
  },
  {
    role: 'UI/UX Designer',
    skills: 'Figma · Design Systems',
    text: 'Shapes the visual identity and user experience across everything DevWengi puts out.',
  },
]

export interface AboutStep {
  title: string
  text: string
}

export const ABOUT_STEPS: AboutStep[] = [
  {
    title: 'Join the Community',
    text: "Sign up, introduce yourself, and get matched with a mentor who's walked the same path.",
  },
  {
    title: 'Learn by Doing',
    text: 'Access structured resources, join project groups, and build real software alongside peers.',
  },
  {
    title: 'Share Your Work',
    text: 'Showcase completed projects in our public gallery and get feedback from the broader community.',
  },
  {
    title: 'Give Back',
    text: 'Become a mentor, contribute resources, and help the next cohort of builders find their footing.',
  },
]
