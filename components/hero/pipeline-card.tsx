'use client'

import { useEffect, useState } from 'react'
import { buildStages, verifyStages, type Stage } from '@/data/pipeline'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import styles from './pipeline-card.module.css'

const STEP_MS = 850
const HOLD_MS = 4200
const TOTAL = buildStages.length + verifyStages.length

type StageState = 'queued' | 'running' | 'passed'

const stateLabel: Record<StageState, string> = {
  queued: 'queued',
  running: 'running…',
  passed: 'passed',
}

const StageRow = ({ stage, state }: { stage: Stage; state: StageState }) => (
  <li className={styles.row} data-state={state}>
    <span className={styles.status} aria-hidden="true" />
    <div className={styles.rowText}>
      <p className={styles.stage}>{stage.name}</p>
      <p className={styles.tools}>{stage.tools}</p>
    </div>
    <span className={styles.label}>{stateLabel[state]}</span>
  </li>
)

const PipelineCard = () => {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduced) {
      setStep(TOTAL)
      return
    }
    const timer = setTimeout(() => setStep((s) => (s >= TOTAL ? 0 : s + 1)), step >= TOTAL ? HOLD_MS : STEP_MS)
    return () => clearTimeout(timer)
  }, [step, reduced])

  const stateOf = (index: number): StageState => (step > index ? 'passed' : step === index ? 'running' : 'queued')
  const complete = step >= TOTAL

  return (
    <div
      role="img"
      aria-label="A release pipeline: the API service, web app and database I build with NestJS, React and PostgreSQL, followed by the quality gates I verify with Postman, Playwright and SQL checks."
      className={styles.card}
    >
      <div className={styles.head}>
        <div>
          <p className={styles.file}>release-gate.yml</p>
          <p className={styles.branch}>main · build → verify</p>
        </div>
        <span className={styles.badge} data-done={complete}>
          {complete ? 'passed' : 'running'}
        </span>
      </div>
      <div className={styles.bar}>
        <i style={{ transform: `scaleX(${Math.min(1, step / TOTAL)})` }} />
      </div>
      <p className={styles.group}>Build · developer</p>
      <ol className={styles.list}>
        {buildStages.map((stage, i) => (
          <StageRow key={stage.name} stage={stage} state={stateOf(i)} />
        ))}
      </ol>
      <p className={styles.group}>Verify · QA</p>
      <ol className={styles.list}>
        {verifyStages.map((stage, i) => (
          <StageRow key={stage.name} stage={stage} state={stateOf(buildStages.length + i)} />
        ))}
      </ol>
      <p className={styles.done} data-show={complete}>
        ✓ Built and verified · ready to ship
      </p>
    </div>
  )
}

export default PipelineCard
