import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { reducer as strokes } from './modules/strokes/reducer'
import { reducer as currentStroke } from './modules/currentStroke/reducer'
import { reducer as historyIndex } from './modules/historyIndex/reducer'

export const store = createStore(
  combineReducers({
    historyIndex,
    currentStroke,
    strokes
  }),
  composeWithDevTools(applyMiddleware(logger))
)
