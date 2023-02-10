import { createAction } from '@reduxjs/toolkit'
import { type Stroke } from '../utils/types'

export const endStroke = createAction<{
  stroke: Stroke
  historyIndex: number
}>('endStroke')
