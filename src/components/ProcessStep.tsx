import { pathStationPercent, type PathStation } from './PathSvg'
import type { ProcessStepData } from '../data/steps'

interface ProcessStepProps {
  step: ProcessStepData
  station: PathStation
  active: boolean
  stepIndex: number
}

export function ProcessStep({
  step,
  station,
  active,
  stepIndex,
}: ProcessStepProps) {
  const isCrest = stepIndex % 2 === 1
  const isRightmost = stepIndex === 3

  return (
    <li
      className={`process-step ${isCrest ? 'process-step--crest' : ''} ${
        isRightmost ? 'process-step--right' : ''
      }`}
      style={pathStationPercent(station)}
    >
      <span
        aria-hidden="true"
        data-step-dot={stepIndex}
        className={`process-step__dot ${active ? 'process-step__dot--active' : ''}`}
      />

      <span
        className={`process-step__index ${active ? 'process-step__index--active' : ''}`}
      >
        {step.index}
      </span>

      <div
        className={`process-step__copy ${active ? 'process-step__copy--active' : ''}`}
      >
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>

      {step.note && <span className="process-step__note">{step.note}</span>}
    </li>
  )
}
