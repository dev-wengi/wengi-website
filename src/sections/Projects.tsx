import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FilterChips } from '../components/FilterChips'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECTS_DATA, PROJECT_CATEGORIES, type Project } from '../data/projects'

export interface ProjectsProps {
  initialProjects?: Project[]
  categories?: string[]
  className?: string
}

/**
 * Section 3: Projects to Explore and Contribute To
 * - Light gray background (#E2E2E2)
 * - Top row: Filter chips on left, right-aligned 2-line heading on right
 * - Filterable project cards with AnimatePresence
 * - "See more projects" / "Show less" toggle button and link to all 17 repositories
 */
export const Projects: React.FC<ProjectsProps> = ({
  initialProjects = PROJECTS_DATA,
  categories = PROJECT_CATEGORIES,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showAll, setShowAll] = useState<boolean>(false)

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return initialProjects
    }
    return initialProjects.filter((p) => p.category.includes(selectedCategory))
  }, [initialProjects, selectedCategory])

  // Limit display to 3 projects unless showAll is toggled
  const displayedProjects = useMemo(() => {
    if (showAll) {
      return filteredProjects
    }
    return filteredProjects.slice(0, 3)
  }, [filteredProjects, showAll])

  const hasMoreProjects = filteredProjects.length > 3

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Keep or reset showAll
    setShowAll(false)
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`w-full scroll-mt-28 py-20 lg:py-24 px-4 sm:px-6 overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--bg-gray, #E2E2E2)' }}
    >
      <div className="max-w-[1160px] mx-auto w-full">
        {/* Top Row: Filter Chips (Left) + Heading (Right) */}
        <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-8 md:gap-12 mb-12 sm:mb-14 lg:mb-[60px]">
          {/* LEFT: Filter Chips (max-w ~480px) */}
          <div className="w-full md:w-auto">
            <FilterChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>

          {/* RIGHT: Section Heading (Right-aligned, 2 lines) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full md:w-auto text-left md:text-right shrink-0"
          >
            <h2
              id="projects-heading"
              className="font-headline font-extrabold text-[36px] sm:text-[44px] lg:text-[56px] text-[#0A0A0A] leading-[1.0] tracking-[-0.02em] select-none"
            >
              <span className="block">
                <span className="text-[var(--green-highlight,#6CF05A)] font-extrabold">
                  Real-world
                </span>{' '}
                projects
              </span>
              <span className="block mt-1">to learn and build</span>
            </h2>
          </motion.div>
        </div>

        <p className="mb-8 max-w-[700px] font-sans text-sm leading-relaxed text-neutral-700 sm:text-base">
          Explore 17 community repositories, from APIs and background jobs to dashboards and
          interactive apps. Each project includes its own README and contribution guidance.
        </p>

        {/* Project Cards Stack (32px gap) */}
        <motion.div layout className="flex flex-col gap-8 w-full">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>

          {displayedProjects.length === 0 && (
            <div className="w-full bg-white rounded-[32px] p-12 text-center text-neutral-500 font-sans">
              No projects found in category "{selectedCategory}".
            </div>
          )}
        </motion.div>

        {/* "See more projects" Button */}
        {hasMoreProjects && (
          <div className="mt-10 flex justify-start sm:justify-start items-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center font-exo font-semibold text-[18px] sm:text-[20px] tracking-[0.02em] text-black rounded-full px-8 sm:px-9 py-3.5 sm:py-4 transition-all duration-200 shadow-sm hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_8px_25px_rgba(108,240,90,0.35)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2"
              style={{
                backgroundColor: 'var(--green-highlight, #6CF05A)',
              }}
            >
              {showAll ? 'Show less' : 'See more projects'}
            </button>
          </div>
        )}
        <a
          href="https://github.com/dev-wengi/dev-wengi/tree/main/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-sans font-semibold text-[16px] text-black underline decoration-[var(--green-highlight,#6CF05A)] decoration-2 underline-offset-4 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] rounded-sm"
        >
          Browse all 17 project repositories on GitHub
        </a>
      </div>
    </section>
  )
}

export default Projects
