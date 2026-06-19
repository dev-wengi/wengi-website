import React from 'react'

export const SectionLayout = ({ title, children, id }) => {
  return (
    <div>
      <h2 id={id}>{title}</h2>
      <div className='container '>
        {children}
      </div>
    </div>
  )
}
