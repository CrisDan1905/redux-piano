import logger from 'redux-logger'
import strokes from './modules/strokes/slice'
import currentStroke from './modules/currentStroke/slice'
import historyIndex from './modules/historyIndex/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    historyIndex,
    currentStroke,
    strokes
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
