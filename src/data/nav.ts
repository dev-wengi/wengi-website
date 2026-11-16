export interface NavItem {
  name: string
  link: string
}

export const navItems: NavItem[] = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Blog', link: '/blog' },
  { name: 'Resources', link: '/resources' },
]

export const GET_STARTED_LINK = '/get-started'
