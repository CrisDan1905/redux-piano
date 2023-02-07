type RootState = Record<string, unknown>

type Action = {
  type: string
}

export const rootReducer = (state: RootState = {}, action: Action): RootState => {
  return state
}
