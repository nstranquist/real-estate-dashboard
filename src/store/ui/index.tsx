import { Dispatch } from 'redux'

// TYPES:
export interface UIState {
  screenName: string,
}

export interface setScreen {
  readonly type: 'SET_SCREEN'
  screenName: string
}

export type UIActionTypes =
  | setScreen


// ACTIONS:
export const setScreen = (screenName: string) => (dispatch: Dispatch) => {
  console.log('changing screen')
  dispatch({ type: 'SET_SCREEN', screenName })
}


// REDUCER:
const initialState: UIState = {
  screenName: 'Title',
}

export default (
  state=initialState,
  action: UIActionTypes,
): UIState => {
  switch(action.type) {
    case 'SET_SCREEN':
      return {
        ...state,
        screenName: action.screenName,
      }
    default:
      return state
  }
}