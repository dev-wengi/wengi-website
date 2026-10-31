export interface Project {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  liveUrl: string
  category: string[]
  tags: string[]
}

export const PROJECT_CATEGORIES: string[] = ['All', 'Frontend', 'Backend', 'Fullstack']

const images = {
  workspace:
    'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80',
  code:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  developer:
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
  dashboard:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  design:
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
  hardware:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    description: 'Explore a dashboard for tracking product activity and key metrics.',
    image: images.dashboard,
    imageAlt: 'Analytics dashboard displayed on a screen',
    liveUrl: 'https://example.com',
    category: ['Frontend'],
    tags: ['Dashboard', 'Metrics', 'Charts'],
  },
  {
    id: 'job-queue',
    title: 'Job Queue',
    description: 'Build a background worker that processes jobs in a reliable queue.',
    image: images.hardware,
    imageAlt: 'Computer hardware representing background processing',
    liveUrl: 'https://example.com',
    category: ['Backend'],
    tags: ['Background jobs', 'Processing'],
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    description: 'Organize team work with a board for tasks, owners, and progress.',
    image: images.design,
    imageAlt: 'Interface design workspace representing a task board',
    liveUrl: 'https://example.com',
    category: ['Fullstack'],
    tags: ['Task management', 'Drag and drop'],
  },
  {
    id: 'auth-api',
    title: 'Authentication API',
    description: 'Create an API for sign-in, user sessions, and protected routes.',
    image: images.workspace,
    imageAlt: 'Developer workspace representing an API project',
    liveUrl: 'https://example.com',
    category: ['Backend'],
    tags: ['Authentication', 'JWT', 'API'],
  },
  {
    id: 'auth-app',
    title: 'Authentication App',
    description: 'Design a clear sign-in experience with accessible form states.',
    image: images.code,
    imageAlt: 'Code editor representing a frontend application',
    liveUrl: 'https://example.com',
    category: ['Frontend'],
    tags: ['Frontend', 'Authentication'],
  },
  {
    id: 'chat-app',
    title: 'Chat App',
    description: 'Build a real-time chat interface for conversations and messages.',
    image: images.developer,
    imageAlt: 'Developer working on a chat application',
    liveUrl: 'https://example.com',
    category: ['Frontend'],
    tags: ['Frontend', 'Real-time chat'],
  },
  {
    id: 'chat-app-backend',
    title: 'Chat App Backend',
    description: 'Connect clients to a real-time chat service over WebSockets.',
    image: images.hardware,
    imageAlt: 'Server hardware representing a chat backend',
    liveUrl: 'https://example.com',
    category: ['Backend'],
    tags: ['Backend', 'WebSockets'],
  },
  {
    id: 'file-upload-service',
    title: 'File Upload Service',
    description: 'Handle file uploads with validation and cloud storage.',
    image: images.workspace,
    imageAlt: 'Computer workspace representing a file service',
    liveUrl: 'https://example.com',
    category: ['Backend'],
    tags: ['File uploads', 'Storage', 'API'],
  },
]
