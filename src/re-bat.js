// @flow
import * as React from 'react'

import withConnect from './connect'
import withProvider from './Provider'

import { logger } from './utils/logger'

const createStore = globalConfig => {
  if(typeof globalConfig !== 'object') throw new Error('globalConfig must be object')
  const { initialState, actions } = globalConfig
  const Context = React.createContext()

  let provider
  let isDispatching = false
  let listeners = []
  let state = initialState
  const currentComponent = self => {
    provider = {
      setState: (state, callback) => self.setState(state, callback)
    }
  }

  const subscribe = listener => {
    if(typeof listener !== 'function') throw new Error('Listener must be funtion')

    if(isDispatching) throw new Error('Something is executing, wait some seconds')

    listeners = [...listeners, listener]

    return () => listeners.filter(l => l !== listener)

  }

  const getState = () => {
    if(isDispatching) throw new Error('Something is executing, wait some seconds')

    return state;
  }

  const dispatch = (type) => (...arg) => {
      if(!provider) throw new Error('<Provider /> is undefined')

      let result
      try{
        isDispatching = true

        result = actions[type](state, dispatch, ...arg)

        state = {...state, ...result}

        logger({state, result, type})

      }
      finally {
        isDispatching = false
      }

      listeners.forEach(l => l({getState}))

      return result.then ? result.then(r => provider.setState(r)) : provider.setState(result)

  }

  const Provider = withProvider(initialState, Context.Provider, currentComponent)
  const connect = withConnect(Context.Consumer, dispatch)


  return {
     Provider,
     connect,
     dispatch,
     getState,
     subscribe
  }

}

export default createStore
