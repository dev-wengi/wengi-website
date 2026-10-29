import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { TechTag } from './TechTag'
import type { Project } from '../data/projects'

export interface ProjectCardProps {
  project: Project
  className?: string
}

/**
 * Reusable ProjectCard Component
 * - Large white rounded card (32px radius, 36px 40px padding)
 * - 2-column layout (Text ~50%, Image ~45%, 60px gap)
 * - Left: Title, Description, Tech Tag row
 * - Right: Image (~310px height, 28px radius) with a repository link
 * - Interactive hover lift + gentle image zoom
 * - Mobile: Stacks cleanly with Image on top
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
      },
    },
  }

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.15 }}
      aria-labelledby={`project-title-${project.id}`}
      className={`w-full bg-[var(--card-white,#FFFFFF)] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] group ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-[60px] items-stretch">
        {/* LEFT COLUMN: Text Content (md:col-span-6 lg:col-span-6 flex flex-col justify-between) */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between order-2 md:order-1">
          <div>
            {/* Title: 36px (tablet 28px, mobile 26px), Inter 800, line-height 1.35 */}
            <h3
              id={`project-title-${project.id}`}
              className="font-headline font-extrabold text-[26px] sm:text-[28px] lg:text-[36px] text-[#0A0A0A] leading-[1.3] max-w-[420px] tracking-[-0.02em]"
            >
              {project.title}
            </h3>

            {/* Description: 17px, Inter 500, line-height 1.3, max-w 320px */}
            <p className="mt-5 text-[15px] sm:text-[17px] text-[#0A0A0A] leading-[1.3] max-w-[320px] font-sans font-medium">
              {project.description}
            </p>
          </div>

          {/* Tech Tags Row (pushed to bottom, ~60px min gap above) */}
          <div className="mt-8 md:mt-12 lg:mt-16 pt-2 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Project Image + Repository Link (md:col-span-6 lg:col-span-6) */}
        <div className="md:col-span-6 lg:col-span-6 relative order-1 md:order-2 flex flex-col justify-center">
          <div className="relative w-full h-[220px] sm:h-[260px] md:h-[310px] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-neutral-100 shadow-sm">
            {/* Main Image with Zoom on Card Hover */}
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />

            {/* Repository link */}
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 inline-flex items-center gap-1.5 font-exo font-semibold text-[16px] sm:text-[18px] text-black rounded-full px-4 sm:px-5 py-1.5 sm:py-2 shadow-md transition-all duration-200 hover:brightness-95 hover:scale-105 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{
                backgroundColor: 'var(--green-live, #6CF05A)',
              }}
            >
              <span>GitHub</span>
              {/* Arrow Up Right Icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <path
                  d="M3.5 10.5L10.5 3.5M10.5 3.5H4.66667M10.5 3.5V9.33333"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
