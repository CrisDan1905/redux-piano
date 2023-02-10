import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../../utils/types'

export type ModalState = {
  isShown: boolean
  modalName: string | null
}

const initialState: ModalState = {
  isShown: true,
  modalName: null
}

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.isShown = true
      state.modalName = action.payload
    },
    hide: (state) => {
      state.isShown = false
      state.modalName = null
    }
  }
})

export const modalVisible = slice.reducer

export const { show, hide } = slice.actions

export const modalVisibleSelector = (state: RootState): ModalState => state.modalVisible

export const modalNameSelector = (state: RootState): string | null =>
  state.modalVisible.modalName