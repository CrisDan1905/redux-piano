import { type Point, type Stroke } from '../../utils/types'

export const BEGIN_STROKE = 'BEGIN_STROKE'
export const UPDATE_STROKE = 'UPDATE_STROKE'
export const END_STROKE = 'END_STROKE'
export const SET_STROKE_COLOR = 'SET_STROKE_COLOR'

export type Action = {
  type: typeof BEGIN_STROKE
  payload: Point
} | {
  type: typeof UPDATE_STROKE
  payload: Point
} | {
  type: typeof END_STROKE
  payload: { stroke: Stroke, historyIndex: number }
} | {
  type: typeof SET_STROKE_COLOR
  payload: string
}

export const beginStroke = (x: number, y: number): Action => (
  { type: BEGIN_STROKE, payload: { x, y } }
)

export const updateStroke = (x: number, y: number): Action => (
  { type: UPDATE_STROKE, payload: { x, y } }
)

export const endStroke = (historyIndex: number, stroke: Stroke): Action => (
  { type: 'END_STROKE', payload: { historyIndex, stroke } }
)

export const setStrokeColor = (color: string): Action => {
  return { type: SET_STROKE_COLOR, payload: color }
}