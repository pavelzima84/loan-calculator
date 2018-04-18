import React from 'react'
import { browserHistory, Router } from 'react-router-3'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import promiseMiddlewere from './promiseMiddlewere'
import indexReducers from './reducers/index'
import routes from './routes'

const reducers = {
  ...indexReducers,
  routing: routerReducer
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const customRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(thunk, customRouterMiddleware, promiseMiddlewere)
  )
)

// Create an enhanced history that syncs navigation events with the store
syncHistoryWithStore(browserHistory, store)

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
      </Provider>
    )
  }
}
