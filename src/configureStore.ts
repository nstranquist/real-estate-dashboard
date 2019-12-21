import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import throttle from 'lodash/throttle'
import rootApp from './store/root'
// import { loadState, saveState } from './utils/localStorage'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  }
}

// const logStoreChange = (store: any) => {
//   const rawDispatch = store.dispatch
//   return (action: Action) => {
//     //console.log('TYPE: ', action.type)
//     console.log('prev state: ', store.getState())
//     console.log('prev action:', action)
//     const returnValue = rawDispatch(action)
//     console.log('next state', store.getState())
//     return returnValue
//   }
// }

const configureStore = () => {
  //const persistedState = loadState()

  // 3 args: 1) reducer, 2) preloaded state, 3) enhancer
  const store = createStore(
    rootApp,
    //persistedState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : (f: any) => f
    ),
  )

  // store.dispatch = logStoreChange(store)

  // put items here that will be saved to localStorage
  //store.subscribe(throttle(() => {
  //  saveState({
  //    events: store.getState().calendar.events,
  //  })
  //}, 1000))

  return store
}

export default configureStore