export interface NavItem {
  name: string
  link: string
}

export const navItems: NavItem[] = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#vision' },
  // TODO: Replace this placeholder when the blog destination exists.
  { name: 'Blog', link: '#' },
  // TODO: Replace this placeholder when the resources destination exists.
  { name: 'Resources', link: '#' },
]
