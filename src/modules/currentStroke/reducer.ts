import { type Stroke, type RootState } from '../../utils/types'
import { type Action, BEGIN_STROKE, UPDATE_STROKE, SET_STROKE_COLOR, END_STROKE } from './actions'

const initialState: RootState['currentStroke'] = {
  points: [],
  color: '#000'
}

export const reducer = (state: RootState['currentStroke'] = initialState, action: Action): Stroke => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return { ...state, points: [action.payload] }
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        points: [...state.points, action.payload]
      }
    }
    case SET_STROKE_COLOR: {
      return { ...state, color: action.payload }
    }
    case END_STROKE: {
      return { ...state, points: [] }
    }
    default:
      return state
  }
}

export const currentStrokeSelector = (state: RootState): Stroke => state.currentStroke
