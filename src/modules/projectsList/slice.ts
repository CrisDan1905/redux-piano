import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type Project, type RootState } from '../../utils/types'
import { fetchProjectsList } from './api'

const initialState: RootState['projectsList'] = {
  error: undefined,
  pending: false,
  projects: []
}

export const getProjectsList = createAsyncThunk('GET_PROJECTS_LIST', async () => {
  return await fetchProjectsList()
})

const slice = createSlice({
  name: 'projectsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, state => {
      state.pending = true
    })
    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.pending = false
      state.projects = action.payload
      state.error = undefined
    })
    builder.addCase(getProjectsList.rejected, state => {
      state.pending = false
      state.error = 'Something went wrong'
    })
  }
})

export const projectsList = slice.reducer

export const projectsListSelector = (state: RootState): Project[] => state.projectsList.projects
export const projectsListPendingSelector = (state: RootState): boolean => state.projectsList.pending
export const projectsListErrorSelector = (state: RootState): string | undefined => state.projectsList.error
