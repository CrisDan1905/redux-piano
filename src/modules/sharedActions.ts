import { type AnyAction, createAction } from '@reduxjs/toolkit'
import { type Stroke } from '../utils/types'

export type SharedAction = AnyAction | ReturnType<typeof endStroke>

export const endStroke = createAction<{
  stroke: Stroke
  historyIndex: number
}>('endStroke')
