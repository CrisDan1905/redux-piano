import { type Stroke, type RootState } from '../../utils/types'
import { endStroke, type SharedAction } from '../sharedActions'

export const reducer = (state: RootState['strokes'] = [], action: SharedAction): Stroke[] => {
  switch (action.type) {
    case endStroke.toString(): {
      const { historyIndex, stroke } = action.payload
      if (!stroke.points.length) {
        return state
      }
      return [...state.slice(0, state.length - historyIndex), stroke]
    }
    default:
      return state
  }
}

export const strokesLengthSelector = (state: RootState): number => state.strokes.length

export const strokesSelector = (state: RootState): Stroke[] => state.strokes
