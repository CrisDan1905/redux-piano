import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Stroke, type RootState, type Point } from '../../utils/types'
import { endStroke } from '../sharedActions'

const initialState: RootState['currentStroke'] = {
  points: [],
  color: '#000'
}

const slice = createSlice({
  name: 'currentStroke',
  initialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload]
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload)
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, state => {
      state.points = []
    })
  }
})

export default slice.reducer

export const { beginStroke, updateStroke, setStrokeColor } = slice.actions

export const currentStrokeSelector = (state: RootState): Stroke => state.currentStroke
