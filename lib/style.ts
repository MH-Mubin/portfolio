import type { CSSProperties } from 'react'

/** Typed inline custom properties, e.g. `vars({ '--d': 2 })` for a reveal delay step. */
export const vars = (values: Record<string, string | number>) => values as CSSProperties
