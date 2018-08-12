// @flow
import * as React from 'react'

import withConnect from './connect'
import withProvider from './Provider'

import {logger, consoleError, getInitial} from './utils'

const createStore = globalConfig => {
  if (typeof globalConfig !== 'object')
    throw new Error('globalConfig must be object')
    // const { initialState, actions } = globalConfig
  const {root} = globalConfig

  let initialState = {}
  let actions = {}

  initialState = getInitial(root, 'initialState')
  actions = getInitial(root, 'actions')

  // console.log(initialState)
  console.log(initialState)
  console.log(actions)

  const Context = React.createContext()

  let provider
  let isDispatching = false
  let listeners = []
  let state = initialState
  const currentComponent = self => {
    console.log(self)
    provider = {
      setState: (key, state, callback) => self.customSetState(key, state, callback)
    }
  }

  const subscribe = listener => {

    let isSubscribe = true

    if (typeof listener !== 'function')
      throw new Error('Listener must be funtion')

    if (isDispatching)
      throw new Error('Something is executing, wait some seconds')

    listeners = [
      ...listeners,
      listener
    ]

    return() => {
      if (!isSubscribe)
        return

      isSubscribe = false

      return listeners.filter(l => l !== listener)
    }

  }

  const getState = () => {
    if (isDispatching)
      throw new Error('Something is executing, wait some seconds')

    return state
  }

  const dispatch = (type, key) => (...arg) => {
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

      // if (process.env.NODE_ENV !== 'production') {
      //    logger({state, result, type})
      // }

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

      console.log(state)
    } finally {
      isDispatching = false
    }

    listeners.forEach(l => l({getState}))
    //
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
