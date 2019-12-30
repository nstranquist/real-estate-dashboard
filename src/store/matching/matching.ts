// includes the types, actions, and reducers

export interface MatchingState {
  params: string[]
  errors: null
  // loading: boolean
}

export interface setParams {
  readonly type: 'SET_PARAMS'
  params: string[]
}
export interface setError {
  readonly type: 'SET_ERROR'
  err: any
}

export type MatchingActionTypes =
  | setParams
  | setError

// actions (not needed)
export const updateParams = (params: string[]) => ({
  type: 'SET_PARAMS',
  params
})

// reducer

const initialState: MatchingState = {
  params: ['price'],
  errors: null
}

export default (
  state = initialState,
  action: MatchingActionTypes
): MatchingState => {
  switch (action.type) {
    case 'SET_PARAMS':
      return {
        ...state,
        params: action.params
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: action.err
      }
    default:
      return state
  }
}