export interface Faq {
  id: number
  question: string
  answer: string
}

export const FAQS_DATA: Faq[] = [
  {
    id: 1,
    question: 'What is Dev.wengi?',
    answer:
      'Dev.wengi is a developer-focused community where you learn by building real projects with real people, with practical guidance and curated resources along the way.',
  },
  {
    id: 2,
    question: 'Where should I start if I am new to coding?',
    answer:
      'Start with Level 0 in the Frontend or Backend learning track. Each track is organized into levels with clear tasks and goals.',
  },
  {
    id: 3,
    question: 'What if I already have some coding experience?',
    answer:
      'Browse the 30-day coding challenges and choose one that matches your experience, or explore the community projects and their contribution guides.',
  },
  {
    id: 4,
    question: 'What learning tracks are available?',
    answer:
      'The repository includes Frontend, Backend, and DevOps tracks. Tracks are structured learning paths, with tasks that build from beginner to advanced.',
  },
  {
    id: 5,
    question: 'What are the 30-day coding challenges?',
    answer:
      'They are 50 projects grouped into five difficulty levels, from beginner-friendly exercises to advanced work involving AI, distributed systems, and infrastructure.',
  },
  {
    id: 6,
    question: 'How can I contribute to a project?',
    answer:
      'Choose a project, read its README and contribution guidance, fork the repository, create a branch, and open a pull request. You can also contribute to the community website.',
  },
  {
    id: 7,
    question: 'Can I work on a challenge by myself?',
    answer:
      'Yes. Challenges are independent, so you can work through one on your own or join the 30-day challenge program.',
  },
  {
    id: 8,
    question: 'Where can I ask questions and share what I learn?',
    answer:
      'The community README points to Discussions, WhatsApp, and Discord. Ask questions, share what you learn, and help other developers when you can.',
  },
]
