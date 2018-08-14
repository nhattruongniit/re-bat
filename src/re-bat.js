// @flow
import * as React from 'react'

import withConnect from './connect'
import withProvider from './Provider'

import {consoleError, getInitial} from './utils'

import type { CurrentComponent, Dispatch, Context, Subscribe, CreateStore, GetState } from './utils/types'

/*
* @param {globalConfig} is Object has modules containes all state and actions what you want save to store
* @returns {Provider, connect, dispatch, getState, subscribe }
*/

const createStore: CreateStore = globalConfig => {
  if (typeof globalConfig !== 'object')
    throw new Error('globalConfig must be object')

  const {root, logger} = globalConfig

  let initialState = {}
  let actions = {}
  let isLogger = logger ? logger : false

  initialState = getInitial(root, 'initialState')
  actions = getInitial(root, 'actions')

  const context: Context = React.createContext()

  let provider
  let isDispatching = false
  let listeners = []
  let state = initialState

  /*
  * @param {seft} is Provider Component
  */

  const currentComponent: CurrentComponent = self => {
    provider = {
      setState: (type, key, state, isLogger, callback) => self.customSetState(type, key, state, isLogger, callback)
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
      consoleError('Can not subscribe when dispatch function...')

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
      consoleError('Can not get state when dispatch function...')

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
      consoleError(`Can not find ${key} in root`)
      return
    }

    if (!actions[key] || !actions[key][type] || typeof actions[key][type] !== 'function') {
      consoleError(`Action ${type} can not find in ${key}`)
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

      if (result && typeof result.then === 'function') {
        result.then(r => state = {...state, [key]: {...r}})
      } else
      state = {...state, [key]: {...result}}


    } finally {
      isDispatching = false

    }

    listeners.forEach(l => l({getState}))

    return result && typeof result.then === 'function'
      ? result.then(r => provider.setState(type, key, {
        ...state[key],
        ...r
      }, isLogger))
      : provider.setState(type, key, {
        ...state[key],
        ...result
      }, isLogger)

  }

  const Provider = withProvider(initialState, context.Provider, currentComponent)
  const connect = withConnect(context.Consumer, dispatch)

  return {Provider, connect, dispatch, getState, subscribe}

}

export default createStore
