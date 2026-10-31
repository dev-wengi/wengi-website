export interface ProcessStepData {
  id: string
  index: string
  title: string
  description: string
  note?: string
}

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    id: 'choose',
    index: '01',
    title: 'Choose something to build',
    description:
      'Pick a learning track, a coding challenge, or a community project.',
  },
  {
    id: 'make',
    index: '02',
    title: 'Make it work',
    description:
      'Start with the requirements, build a small piece, and learn as you go.',
    note: 'small is fine',
  },
  {
    id: 'share',
    index: '03',
    title: 'Share your work',
    description:
      'For a track task or project contribution, open a pull request for review.',
  },
  {
    id: 'iterate',
    index: '04',
    title: 'Get feedback. Iterate.',
    description:
      'Use feedback to improve your work, then take on the next step.',
    note: 'then go again',
  },
]
