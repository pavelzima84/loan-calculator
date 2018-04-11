import React from 'react'
import { browserHistory, Router } from 'react-router-3'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAction, createActions } from 'redux-actions'

import indexReducers from './reducers/index'
import routes from './routes'

const reducers = {
  ...indexReducers,
  routing: routerReducer
}

const callPromiseMiddlewere = ({ dispatch, getState }) => {
  return next => action => {
    let {
        type,
        payload = {}
      } = action,
      types,
      promise

    if (!payload.promise) {
      // Normal action: pass it on
      return next(action)
    }

    promise = payload.promise
    payload = payload.data

    if (!types && typeof type === 'string') {
      types = [`${type}_START`, `${type}_DONE`, `${type}_ERROR`]
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    const [startType, doneType, errorType] = types,
      startAction = createAction(startType, payload => payload),
      doneAction = createAction(doneType, data => data),
      errorAction = createAction(errorType, (data, status) => ({ data, status }))

    next(startAction(payload))

    return promise(payload).then(
      response => next(doneAction(response.data)),
      error => {
        next(errorAction(error.response.data, error.response.status))
        return Promise.reject(error.response)
      }
    )
  }
}


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const customRouterMiddleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(thunk, customRouterMiddleware, callPromiseMiddlewere)
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
