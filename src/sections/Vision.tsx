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
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Team of developers collaborating on laptops around a wooden table',
    title: 'Follow a learning track',
    text: 'Choose Frontend, Backend, or DevOps, then work through levels with clear tasks and goals.',
    reverse: false,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Group of young friends sitting together outdoors in a tech community',
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
      className={`w-full pt-20 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
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
