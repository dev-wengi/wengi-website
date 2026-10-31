import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FilterChips } from '../components/FilterChips'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectRow } from '../components/ProjectRow'
import { PROJECTS_DATA, PROJECT_CATEGORIES, type Project } from '../data/projects'

export interface ProjectsProps {
  initialProjects?: Project[]
  categories?: string[]
  className?: string
}

const GRID_EASE = [0.2, 0.7, 0.2, 1] as const
const INITIAL_PROJECT_COUNT = 6

export const Projects: React.FC<ProjectsProps> = ({
  initialProjects = PROJECTS_DATA,
  categories = PROJECT_CATEGORIES,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [activeRow, setActiveRow] = useState<{ index: number; shiftX: number } | null>(
    null,
  )
  const prefersReducedMotion = useReducedMotion()

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'All'
        ? initialProjects
        : initialProjects.filter((project) =>
            project.category.includes(selectedCategory),
          ),
    [initialProjects, selectedCategory],
  )

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT)
  const hasMoreProjects = filteredProjects.length > INITIAL_PROJECT_COUNT
  const rows: Project[][] = []
  for (let index = 0; index < displayedProjects.length; index += 3) {
    rows.push(displayedProjects.slice(index, index + 3))
  }

  const clearRow = (rowIndex: number) => {
    setActiveRow((current) =>
      current?.index === rowIndex ? null : current,
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setShowAll(false)
    setActiveRow(null)
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`w-full scroll-mt-24 overflow-x-clip py-20 lg:py-[100px] ${className}`}
      style={
        {
          backgroundColor: 'var(--bg-gray, #E2E2E2)',
        } as React.CSSProperties
      }
    >
      <style>{`
        #projects {
          --card-media-dark: #0A0A0A;
          --card-overlay: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 80%);
          --card-w: clamp(480px, 34vw, 640px);
          --card-gap: 28px;
          --bleed: calc(var(--card-w) * 0.45);
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #projects {
            --card-w: clamp(380px, 52vw, 520px);
            --bleed: calc(var(--card-w) * 0.35);
          }
        }
        @media (max-width: 767px) {
          #projects {
            --card-w: 78vw;
            --bleed: 0px;
          }
          #projects .project-row {
            left: 0;
            transform: none !important;
            translate: none !important;
            width: 100%;
          }
          #projects .project-row-track {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6">
        <div className="mb-12 flex flex-col-reverse gap-8 sm:mb-14 md:flex-row md:items-start md:justify-between md:gap-12 lg:mb-[60px]">
          <div className="w-full md:w-auto">
            <FilterChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, ease: GRID_EASE }
            }
            className="w-full shrink-0 text-left md:w-auto md:text-right"
          >
            <h2
              id="projects-heading"
              className="font-headline text-[36px] font-extrabold leading-[1] tracking-[-0.02em] text-[#0A0A0A] select-none sm:text-[44px] lg:text-[56px]"
            >
              <span className="block">
                <span className="font-extrabold text-[var(--green-highlight,#6CF05A)]">
                  Real-world
                </span>{' '}
                projects
              </span>
              <span className="mt-1 block">to learn and build</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedCategory}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.25,
            ease: GRID_EASE,
          }}
          className="flex flex-col gap-[var(--card-gap)]"
        >
          {rows.map((row, rowIndex) => (
            <ProjectRow
              key={`${selectedCategory}-${rowIndex}`}
              rowIndex={rowIndex}
              shiftX={
                activeRow?.index === rowIndex ? activeRow.shiftX : 0
              }
              onShift={(index, shiftX) => setActiveRow({ index, shiftX })}
              onClear={clearRow}
            >
              {row.map((project) => {
                const projectIndex = displayedProjects.findIndex(
                  (item) => item.id === project.id,
                )
                return (
                  <motion.div
                    key={project.id}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.25,
                      delay: prefersReducedMotion
                        ? 0
                        : (projectIndex % 3) * 0.08,
                      ease: GRID_EASE,
                    }}
                    className="shrink-0"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                )
              })}
            </ProjectRow>
          ))}

          {displayedProjects.length === 0 && (
            <div className="mx-auto w-full max-w-[1160px] px-4">
              <div className="rounded-[24px] bg-white p-12 text-center font-sans text-neutral-500">
                No projects found in category "{selectedCategory}".
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto mt-10 w-full max-w-[1160px] px-4 sm:px-6">
        {hasMoreProjects && (
          <button
            type="button"
            onClick={() => setShowAll((previous) => !previous)}
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-exo text-[18px] font-semibold tracking-[0.02em] text-black transition-[transform,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)] focus-visible:ring-offset-2 sm:px-9 sm:py-4 sm:text-[20px]"
            style={{ backgroundColor: 'var(--green-highlight, #6CF05A)' }}
          >
            {showAll ? 'Show less' : 'See more projects'}
          </button>
        )}
        <a
          href="https://github.com/dev-wengi/dev-wengi/tree/main/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-sm font-sans text-[16px] font-semibold text-black underline decoration-[var(--green-highlight,#6CF05A)] decoration-2 underline-offset-4 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-highlight,#6CF05A)]"
        >
          Browse all project repositories on GitHub
        </a>
      </div>
    </section>
  )
}

export default Projects
