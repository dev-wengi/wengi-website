export interface Project {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  repositoryUrl: string
  category: string[]
  tags: string[]
}

export const PROJECT_CATEGORIES: string[] = ['All', 'Frontend', 'Backend', 'Fullstack']

const images = {
  workspace:
    'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80',
  code:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
  developer:
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1000&q=80',
  dashboard:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  design:
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80',
  hardware:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    description: 'An admin dashboard for exploring metrics and charts.',
    image: images.dashboard,
    imageAlt: 'Analytics dashboard displayed on a screen',
    repositoryUrl: 'https://github.com/dev-wengi/dashboard',
    category: ['Frontend'],
    tags: ['Dashboard', 'Metrics', 'Charts'],
  },
  {
    id: 'job-queue',
    title: 'Job Queue',
    description: 'A background job processing system.',
    image: images.hardware,
    imageAlt: 'Computer hardware representing background processing',
    repositoryUrl: 'https://github.com/dev-wengi/job-queue',
    category: ['Backend'],
    tags: ['Background jobs', 'Processing'],
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    description: 'A task board with drag-and-drop organization.',
    image: images.design,
    imageAlt: 'Interface design workspace representing a task board',
    repositoryUrl: 'https://github.com/dev-wengi/kanban-board',
    category: ['Fullstack'],
    tags: ['Task management', 'Drag and drop'],
  },
  {
    id: 'auth-api',
    title: 'Authentication API',
    description: 'A backend API for JWT-based user authentication.',
    image: images.workspace,
    imageAlt: 'Developer workspace representing an API project',
    repositoryUrl: 'https://github.com/dev-wengi/auth-api',
    category: ['Backend'],
    tags: ['Authentication', 'JWT', 'API'],
  },
  {
    id: 'auth-app',
    title: 'Authentication App',
    description: 'A frontend application for an authentication experience.',
    image: images.code,
    imageAlt: 'Code editor representing a frontend application',
    repositoryUrl: 'https://github.com/dev-wengi/auth-app',
    category: ['Frontend'],
    tags: ['Frontend', 'Authentication'],
  },
  {
    id: 'chat-app',
    title: 'Chat App',
    description: 'A frontend for a real-time chat application.',
    image: images.developer,
    imageAlt: 'Developer working on a chat application',
    repositoryUrl: 'https://github.com/dev-wengi/chat-app',
    category: ['Frontend'],
    tags: ['Frontend', 'Real-time chat'],
  },
  {
    id: 'chat-app-backend',
    title: 'Chat App Backend',
    description: 'A WebSocket server for a real-time chat application.',
    image: images.hardware,
    imageAlt: 'Server hardware representing a chat backend',
    repositoryUrl: 'https://github.com/dev-wengi/chat-app-backend',
    category: ['Backend'],
    tags: ['Backend', 'WebSockets'],
  },
  {
    id: 'file-upload-service',
    title: 'File Upload Service',
    description: 'A backend API for file uploads and storage.',
    image: images.workspace,
    imageAlt: 'Computer workspace representing a file service',
    repositoryUrl: 'https://github.com/dev-wengi/file-upload-service',
    category: ['Backend'],
    tags: ['File uploads', 'Storage', 'API'],
  },
  {
    id: 'gallery',
    title: 'Image Gallery',
    description: 'An image gallery with a lightbox for viewing photos.',
    image: images.design,
    imageAlt: 'Visual design workspace representing an image gallery',
    repositoryUrl: 'https://github.com/dev-wengi/gallery',
    category: ['Frontend'],
    tags: ['Gallery', 'Lightbox'],
  },
  {
    id: 'github-explorer',
    title: 'GitHub Explorer',
    description: 'An app that integrates with the GitHub API.',
    image: images.code,
    imageAlt: 'Code editor representing a GitHub integration app',
    repositoryUrl: 'https://github.com/dev-wengi/github-explorer',
    category: ['Frontend'],
    tags: ['GitHub API', 'Frontend'],
  },
  {
    id: 'notes-app',
    title: 'Notes App',
    description: 'An application for creating and managing notes.',
    image: images.workspace,
    imageAlt: 'Developer workspace representing a notes application',
    repositoryUrl: 'https://github.com/dev-wengi/notes-app',
    category: ['Fullstack'],
    tags: ['Notes', 'Organization'],
  },
  {
    id: 'quiz-app',
    title: 'Quiz App',
    description: 'An interactive application for taking quizzes.',
    image: images.code,
    imageAlt: 'Code editor representing an interactive quiz app',
    repositoryUrl: 'https://github.com/dev-wengi/quiz-app',
    category: ['Frontend'],
    tags: ['Quiz', 'Interactive'],
  },
  {
    id: 'rate-limiter',
    title: 'Rate Limiter',
    description: 'Middleware for limiting the rate of API requests.',
    image: images.hardware,
    imageAlt: 'Computer hardware representing API infrastructure',
    repositoryUrl: 'https://github.com/dev-wengi/rate-limiter',
    category: ['Backend'],
    tags: ['Middleware', 'API'],
  },
  {
    id: 'todo-api',
    title: 'Todo API',
    description: 'A RESTful API for managing todo items.',
    image: images.workspace,
    imageAlt: 'Developer workspace representing a REST API',
    repositoryUrl: 'https://github.com/dev-wengi/todo-api',
    category: ['Backend'],
    tags: ['REST API', 'Todo'],
  },
  {
    id: 'todo-app',
    title: 'Todo App',
    description: 'A frontend application for managing to-do items.',
    image: images.design,
    imageAlt: 'Interface design workspace representing a todo app',
    repositoryUrl: 'https://github.com/dev-wengi/todo-app',
    category: ['Frontend'],
    tags: ['Frontend', 'Todo'],
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    description: 'A service for creating shorter links from long URLs.',
    image: images.dashboard,
    imageAlt: 'Data interface representing a URL service',
    repositoryUrl: 'https://github.com/dev-wengi/url-shortener',
    category: ['Fullstack'],
    tags: ['URLs', 'Link management'],
  },
  {
    id: 'wather-app',
    title: 'Weather App',
    description: 'An app for checking weather information.',
    image: images.developer,
    imageAlt: 'Developer at a computer representing a weather app project',
    repositoryUrl: 'https://github.com/dev-wengi/wather-app',
    category: ['Frontend'],
    tags: ['Weather', 'Frontend'],
  },
]
