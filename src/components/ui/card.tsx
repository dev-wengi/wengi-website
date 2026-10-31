import * as React from 'react'

function Card({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div className={`rounded-xl border ${className}`} {...props} />
}

function CardHeader({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}

function CardTitle({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div className={`font-semibold leading-none tracking-tight ${className}`} {...props} />
}

function CardDescription({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div className={`text-sm text-muted-foreground ${className}`} {...props} />
}

function CardContent({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

function CardFooter({ className = '', ...props }: React.ComponentProps<'div'>) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
