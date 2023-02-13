import logger from 'redux-logger'
import strokes from './modules/strokes/slice'
import currentStroke from './modules/currentStroke/slice'
import historyIndex from './modules/historyIndex/slice'
import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import { modalVisible } from './modules/modals/slice'
import { type RootState } from './utils/types'

export const store = configureStore({
  reducer: {
    historyIndex,
    currentStroke,
    strokes,
    modalVisible
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
