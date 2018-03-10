import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { AUTH } from './Redux/Actions/Sessions/Types'
import reducers from './Redux/Reducers'
import Routes from './Components/Routes'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Assets/Styles/Style.css'

const composeEnhancers = initReduxDevTools()
const appReducer = combineReducers(reducers)
const rootReducer = (state, action) => {
  if (action.type === AUTH)
    state = undefined

  return appReducer(state, action)
}
const middleware = typeof(composeEnhancers) === 'function' ? composeEnhancers(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)

registerServiceWorker()

function initReduxDevTools() {
  return process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
}
