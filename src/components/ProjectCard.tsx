import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { TechTag } from './TechTag'
import type { Project } from '../data/projects'

export interface ProjectCardProps {
  project: Project
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
}) => (
  <article
    data-project-card
    aria-labelledby={`project-title-${project.id}`}
    className={`group relative aspect-[16/10] w-[var(--card-w)] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[var(--card-media-dark)] ${className}`}
  >
    <img
      src={project.image}
      alt={project.imageAlt}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      loading="lazy"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[image:var(--card-overlay)]"
    />

    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} live`}
      className="absolute right-[14px] top-[14px] z-10 inline-flex items-center gap-1 rounded-full bg-[var(--green-live)] px-3 py-1.5 font-exo text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      Live
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>

    <div className="absolute inset-x-0 bottom-0 z-[1] p-6 text-white">
      <h3
        id={`project-title-${project.id}`}
        className="font-inter text-[26px] font-extrabold leading-[1.1]"
      >
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-2 max-w-[360px] font-inter text-[15px] font-medium leading-[1.3] text-white/70">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TechTag key={tag} label={tag} tone="dark" />
        ))}
      </div>
    </div>
  </article>
)
