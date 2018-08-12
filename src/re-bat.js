// @flow
import * as React from 'react'

import withConnect from './connect'
import withProvider from './Provider'

import {logger, consoleError, getInitial} from './utils'

import type { CurrentComponent, Dispatch, Context, Subscribe, CreateStore, GetState } from './utils/types'

/*
* @param {globalConfig} is Object has modules containes all state and actions what you want save to store
* @returns {
Provider,
connect,
dispatch,
getState,
subscribe
}
*/

const createStore: CreateStore = globalConfig => {
  if (typeof globalConfig !== 'object')
    throw new Error('globalConfig must be object')
    // const { initialState, actions } = globalConfig
  const {root} = globalConfig

  let initialState = {}
  let actions = {}

  initialState = getInitial(root, 'initialState')
  actions = getInitial(root, 'actions')

  const Context: Context = React.createContext()

  let provider
  let isDispatching = false
  let listeners = []
  let state = initialState

  /*
  * @param {seft} is Provider Component
  */

  const currentComponent = self => {
    provider = {
      setState: (key, state, callback) => self.customSetState(key, state, callback)
    }
  }

  /*
  * @param {listener} is function what you call everytime when you dispatch a action
  * @returns {function} like unSubscrire function
  */

  const subscribe: Subscribe = listener => {

    let isSubscribe = true

    if (typeof listener !== 'function')
      throw new Error('Listener must be funtion')

    if (isDispatching)
      throw new Error('Something is executing, wait some seconds')

    listeners = [
      ...listeners,
      listener
    ]

    return () => {
      if (!isSubscribe)
        return

      isSubscribe = false

      return listeners.filter(l => l !== listener)
    }

  }

  /*
  * @returns {any} current state in your store
  */

  const getState: GetState = () => {
    if (isDispatching)
      throw new Error('Something is executing, wait some seconds')

    return state
  }

  /*
  * @param {type} is name of actions you register in module of store
  * @param {key} is name of your module what you want to dispatch
  */

  const dispatch: Dispatch = (type, key) => (...arg) => {
    if (!provider)
      throw new Error('<Provider /> is undefined')

    if (typeof key !== 'string' && !actions[key] && !state[key]) {
      consoleError('Key is undefined')
      return
    }

    if (!actions[key] || !actions[key][type] || typeof actions[key][type] !== 'function') {
      consoleError('Actions is not function')
      return
    }

    let result
    try {
      isDispatching = true

      result = actions[key][type]({
        state: state[key],
        dispatch,
        rootState: state
      }, ...arg)

      if (process.env.NODE_ENV !== 'production') {
         logger({state, result, type})
      }

      if (typeof result.then === 'function') {
        result.then(r => state[key] = {
          ...state[key],
          ...r
        })
      } else
        state[key] = {
          ...state[key],
          ...result
        }

    } finally {
      isDispatching = false
    }

    listeners.forEach(l => l({getState}))
    
    return result && typeof result.then === 'function'
      ? result.then(r => provider.setState(key, {
        ...state[key],
        ...r
      }))
      : provider.setState(key, {
        ...state[key],
        ...result
      })

  }

  const Provider = withProvider(initialState, Context.Provider, currentComponent)
  const connect = withConnect(Context.Consumer, dispatch)

  return {Provider, connect, dispatch, getState, subscribe}

}

export default createStore
