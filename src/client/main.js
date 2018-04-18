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

import * as Cache from './utils/cache'

const reducers = {
  ...indexReducers,
  routing: routerReducer
}

const promiseMiddlewere = ({ dispatch, getState }) => {
  return next => action => {
    let {
        type,
        payload,
        meta = {}
      } = action,
      cacheKey,
      resultData

    if (!meta.promise) {
      // Normal action: pass it on
      return next(action)
    }

    const
      promise = meta.promise,
      cache = meta.cache,
      types = [`${type}_START`, `${type}_DONE`, `${type}_ERROR`]

    if (cache) {
      cacheKey = Cache.createKey(type, payload),
      resultData = Cache.get(cacheKey)

      if (resultData) {
        const cacheAction = createAction(`${type}_DONE`, payload => payload)
        next(cacheAction(resultData))
        return Promise.resolve(resultData)
      }
    }

    const [startType, doneType, errorType] = types,
      startAction = createAction(startType, payload => payload),
      doneAction = createAction(doneType, data => data),
      errorAction = createAction(errorType, (data, status) => ({ data, status }))

    next(startAction(payload))

    return promise(payload).then(
      response => {
        resultData = response.data

        if (cache) {
          Cache.set(cacheKey, resultData)
        }

        next(doneAction(resultData))

        return resultData
      },
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
