export interface Project {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  /** Repository URL. Empty when the project has no public repo yet. */
  liveUrl: string
  category: string[]
  tags: string[]
}

export const PROJECT_CATEGORIES: string[] = ['All', 'Frontend', 'Backend', 'Fullstack']

const images = {
  dashboard: '/images/project-dashboard.jpg',
  servers: '/images/project-servers.jpg',
  whiteboard: '/images/project-whiteboard.jpg',
  code: '/images/project-code.jpg',
  monitor: '/images/project-auth.jpg',
  chat: '/images/project-chat.jpg',
  rack: '/images/project-rack.jpg',
  desk: '/images/project-desk.jpg',
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    description: 'Explore a dashboard for tracking product activity and key metrics.',
    image: images.dashboard,
    imageAlt: 'Analytics dashboard interface with charts',
    liveUrl: '',
    category: ['Frontend'],
    tags: ['Dashboard', 'Metrics', 'Charts'],
  },
  {
    id: 'job-queue',
    title: 'Job Queue',
    description: 'Build a background worker that processes jobs in a reliable queue.',
    image: images.servers,
    imageAlt: 'Server racks in a data center',
    liveUrl: '',
    category: ['Backend'],
    tags: ['Background jobs', 'Processing'],
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    description: 'Organize team work with a board for tasks, owners, and progress.',
    image: images.whiteboard,
    imageAlt: 'Team planning around a whiteboard',
    liveUrl: '',
    category: ['Fullstack'],
    tags: ['Task management', 'Drag and drop'],
  },
  {
    id: 'auth-api',
    title: 'Authentication API',
    description: 'Create an API for sign-in, user sessions, and protected routes.',
    image: images.code,
    imageAlt: 'Close-up of programming code',
    liveUrl: 'https://github.com/dev-wengi/auth-api',
    category: ['Backend'],
    tags: ['Authentication', 'JWT', 'API'],
  },
  {
    id: 'auth-app',
    title: 'Authentication App',
    description: 'Design a clear sign-in experience with accessible form states.',
    image: images.monitor,
    imageAlt: 'Code displayed on a computer monitor',
    liveUrl: 'https://github.com/dev-wengi/auth-app',
    category: ['Frontend'],
    tags: ['Frontend', 'Authentication'],
  },
  {
    id: 'chat-app',
    title: 'Chat App',
    description: 'Build a real-time chat interface for conversations and messages.',
    image: images.chat,
    imageAlt: 'Group of people messaging on smartphones',
    liveUrl: '',
    category: ['Frontend'],
    tags: ['Frontend', 'Real-time chat'],
  },
  {
    id: 'chat-app-backend',
    title: 'Chat App Backend',
    description: 'Connect clients to a real-time chat service over WebSockets.',
    image: images.rack,
    imageAlt: 'Server rack cabling close-up',
    liveUrl: '',
    category: ['Backend'],
    tags: ['Backend', 'WebSockets'],
  },
  {
    id: 'file-upload-service',
    title: 'File Upload Service',
    description: 'Handle file uploads with validation and cloud storage.',
    image: images.desk,
    imageAlt: 'Laptop on a wooden desk workspace',
    liveUrl: '',
    category: ['Backend'],
    tags: ['File uploads', 'Storage', 'API'],
  },
]
