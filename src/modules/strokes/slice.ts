import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type Stroke, type RootState } from '../../utils/types'
import { endStroke } from '../sharedActions'
import { getProject, newProject } from './api'

const initialState: RootState['strokes'] = []

export const loadProject = createAsyncThunk('LOAD_PROJECT', async (projectId: string) => {
  try {
    const { project } = await getProject(projectId)
    return project.strokes
  } catch (err) {
    console.log(err)
  }
})

type SaveProjectArg = {
  projectName: string
  thumbnail: string
}

export const saveProject = createAsyncThunk('SAVE_PROJECT', async ({ projectName, thumbnail }: SaveProjectArg, { getState }) => {
  try {
    const response = await newProject(projectName, (getState() as RootState)?.strokes, thumbnail)

    console.log(response)
  } catch (e) {
    console.log(e)
  }
})

const strokes = createSlice({
  name: 'strokes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload

      if (historyIndex === 0) {
        state.push(stroke)
      } else {
        state.splice(-historyIndex, historyIndex, stroke)
      }
    })
    builder.addCase(loadProject.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default strokes.reducer

export const strokesLengthSelector = (state: RootState): number => state.strokes.length

export const strokesSelector = (state: RootState): Stroke[] => state.strokes
