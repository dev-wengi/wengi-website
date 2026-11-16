import type { LucideIcon } from 'lucide-react'
import { Sprout, PenTool, Code2, Braces, MessageSquare } from 'lucide-react'

export interface Audience {
  title: string
  level: string
  text: string
  firstStep: string
  featured?: boolean
  icon: LucideIcon
}

export const AUDIENCES: Audience[] = [
  {
    title: "I'm just getting started",
    level: 'Beginner',
    text: 'No perfect setup or prior experience needed. Start with the basics, ask your questions, and build your first small page.',
    firstStep: 'First step: introduce yourself and pick a learning path.',
    featured: true,
    icon: Sprout,
  },
  {
    title: 'I think in experiences',
    level: 'Designer',
    text: 'Explore how people use what we build. Practice UI, accessibility and thoughtful handoffs with other makers.',
    firstStep: 'First step: bring a sketch or a problem you want to solve.',
    icon: PenTool,
  },
  {
    title: "I'm ready to build more",
    level: 'Developer',
    text: 'Deepen your skills through practical projects, code conversations and sharing the decisions behind your work.',
    firstStep: 'First step: share a project, a question or a useful lesson.',
    icon: Code2,
  },
]

export interface Participation {
  title: string
  text: string
  action: string
  icon: LucideIcon
}

export const PARTICIPATION: Participation[] = [
  {
    title: 'Find people to learn with',
    text: 'Learning makes more sense when you can talk it through. Ask a focused question, explain your thinking and help someone else connect the dots.',
    action: 'Participate: ask or answer a question.',
    icon: MessageSquare,
  },
  {
    title: 'Turn knowledge into practice',
    text: 'Move beyond watching another tutorial. Pick a small project, share progress and invite constructive feedback on your next iteration.',
    action: 'Participate: share a work-in-progress.',
    icon: Braces,
  },
  {
    title: 'Make the path easier for others',
    text: "You don't have to know everything to contribute. A useful resource, a clear bug report or a kind review can move someone forward.",
    action: 'Participate: contribute one useful thing.',
    icon: PenTool,
  },
]

export interface NextStep {
  title: string
  text: string
}

export const NEXT_STEPS: NextStep[] = [
  {
    title: 'Look out for a reply',
    text: 'The community team can use your email to respond with guidance on joining.',
  },
  {
    title: 'Say a small hello',
    text: "Share what you're learning, what you'd like to make and one thing you need help with.",
  },
  {
    title: 'Choose your first small step',
    text: 'Try a learning path, explore a project brief or join a conversation.',
  },
]

export const COMMUNITY_VALUES: string[] = [
  'Be kind. Respect different starting points.',
  'Give useful feedback, not personal criticism.',
  'Credit the work you share. Protect private information.',
  'Ask thoughtfully. Help when you can.',
]

export interface GetStartedFaq {
  id: number
  question: string
  answer: string
}

export const GET_STARTED_FAQS: GetStartedFaq[] = [
  {
    id: 1,
    question: 'Do I need to know how to code?',
    answer:
      'No. Curiosity and a willingness to learn are enough to begin. Choose the beginner pathway and start with one small, practical step.',
  },
  {
    id: 2,
    question: 'Do I have to be based in Kisumu?',
    answer:
      "DevWengi is rooted in Kisumu and East Africa. If you're elsewhere, you're welcome to express interest; tell us your location so we can suggest a suitable way to take part.",
  },
  {
    id: 3,
    question: 'What should I bring to the community?',
    answer:
      'Bring your questions, respect for other people and an interest in making things. A laptop helps with coding practice, but you can start by exploring ideas and resources.',
  },
  {
    id: 4,
    question: 'Is this a job placement or certification programme?',
    answer:
      'No. DevWengi is a learning and building community. Participation is not a promise of a job, a certificate or a dedicated mentor.',
  },
  {
    id: 5,
    question: 'How can I help if I already have experience?',
    answer:
      'Share a practical lesson, review a small project or suggest a useful resource. Tell us what you enjoy doing in your join request, or email dev.wengi.ke@gmail.com.',
  },
]

export const EXPERIENCE_LEVELS = [
  'Just starting out',
  'Learning the basics',
  'Building independently',
  'Experienced — here to help',
]

export const PATH_OPTIONS = ['Beginner', 'Design', 'Development']
