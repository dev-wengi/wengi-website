import { pathStationPercent, type PathStation } from './PathSvg'
import type { ProcessStepData } from '../data/steps'

interface ProcessStepProps {
  step: ProcessStepData
  station: PathStation
  active: boolean
  layout: 'desktop' | 'mobile'
  stepIndex: number
}

export function ProcessStep({
  step,
  station,
  active,
  layout,
  stepIndex,
}: ProcessStepProps) {
  const isCrest = layout === 'desktop' && stepIndex % 2 === 1
  const isRightmost = layout === 'desktop' && stepIndex === 3
  const desktopPosition =
    layout === 'desktop' ? pathStationPercent(station) : undefined

  return (
    <li
      className={
        layout === 'desktop'
          ? 'process-step process-step--desktop'
          : 'process-step process-step--mobile'
      }
      style={desktopPosition}
    >
      <span
        aria-hidden="true"
        data-step-dot={stepIndex}
        className={`process-step__dot ${active ? 'process-step__dot--active' : ''}`}
      />

      <span
        className={`process-step__index ${active ? 'process-step__index--active' : ''} ${
          isCrest ? 'process-step__index--crest' : ''
        } ${isRightmost ? 'process-step__index--right' : ''}`}
      >
        {step.index}
      </span>

      <div
        className={`process-step__copy ${
          active ? 'process-step__copy--active' : ''
        } ${isCrest ? 'process-step__copy--crest' : ''} ${
          isRightmost ? 'process-step__copy--right' : ''
        }`}
      >
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>

      {step.note && (
        <span
          className={`process-step__note ${
            isRightmost || stepIndex === 1 ? 'process-step__note--left' : ''
          }`}
        >
          {step.note}
        </span>
      )}
    </li>
  )
}
