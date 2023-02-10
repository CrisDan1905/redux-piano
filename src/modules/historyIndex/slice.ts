import { createSlice, type Slice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../../utils/types'
import { endStroke } from '../sharedActions'

export const historyIndex: Slice<number> = createSlice({
  name: 'historyIndex',
  initialState: 0,
  reducers: {
    undo: (state, action: PayloadAction<number>) => {
      return Math.min(state + 1, action.payload)
    },
    redo: (state) => {
      return Math.max(state - 1, 0)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, () => {
      return 0
    })
  }
})

export default historyIndex.reducer

export const { undo, redo } = historyIndex.actions

export const historyIndexSelector = (state: RootState): number => state.historyIndex
