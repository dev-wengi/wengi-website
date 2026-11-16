import React from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { FeatureRow, type FeatureRowProps } from '../components/FeatureRow'

export interface VisionFeature extends Omit<FeatureRowProps, 'reverse'> {
  id: string | number
  reverse?: boolean
}

export interface VisionProps {
  headingBefore?: string
  headingHighlight?: string
  subtitle?: string
  features?: VisionFeature[]
  className?: string
}

const DEFAULT_VISION_FEATURES: VisionFeature[] = [
  {
    id: 1,
    image: '/images/vision-collab.jpg',
    imageAlt: 'Two developers pair programming at shared monitors',
    title: 'Follow a learning track',
    text: 'Choose Frontend, Backend, or DevOps, then work through levels with clear tasks and goals.',
    reverse: false,
  },
  {
    id: 2,
    image: '/images/vision-community.jpg',
    imageAlt: 'Community members coding together at a hackathon',
    title: 'Build beyond the tutorial',
    text: 'Try one of 50 coding challenges or contribute to a real-world project. Share your work, get feedback, and improve with each iteration.',
    reverse: true,
  },
]

/**
 * Section 2A: Our Vision
 * - Full-width dark section with background #000000
 * - Centered SectionHeading ("Our [Vision]")
 * - Two alternating 2-column feature rows driven by a data array
 */
export const Vision: React.FC<VisionProps> = ({
  headingBefore = 'Our',
  headingHighlight = 'Vision',
  subtitle = 'Structured learning paths, independent challenges, and community projects give you practical ways to keep progressing.',
  features = DEFAULT_VISION_FEATURES,
  className = '',
}) => {
  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className={`w-full scroll-mt-24 pt-20 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--bg-black, #000000)' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <SectionHeading
          id="vision-heading"
          before={headingBefore}
          highlight={headingHighlight}
          subtitle={subtitle}
          align="center"
          className="mb-20 md:mb-24"
        />

        {/* Alternating Feature Rows */}
        <div className="flex flex-col gap-16 md:gap-[100px]">
          {features.map((item, index) => (
            <FeatureRow
              key={item.id}
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.title}
              text={item.text}
              reverse={item.reverse !== undefined ? item.reverse : index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Vision
