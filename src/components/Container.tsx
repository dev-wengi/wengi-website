import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  clean?: boolean // If true, omits default horizontal padding
  as?: React.ElementType
}

/**
 * Standard container component enforcing the global 1280px max-width boundary
 * with consistent mobile-first padding.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const padding = clean ? '' : 'px-4 sm:px-6 lg:px-8'
  return (
    <Component
      className={`w-full max-w-[1280px] mx-auto ${padding} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}
