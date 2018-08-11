// @flow
import * as React from 'react'

import withConnect from './connect'
import withProvider from './Provider'

import { logger } from './utils/logger'

const getInitialState = (root) => {

  if(typeof root !== 'object' || !root) return {}

  let initialState = {}

  return Object.keys(root)
  .map(k =>
    initialState =
    {...initialState,
      [k]: {...{...root[k].initialState}}
    })
}

const createStore = globalConfig => {
  if(typeof globalConfig !== 'object') throw new Error('globalConfig must be object')
  const { initialState, actions } = globalConfig
  // const { actions } = root

  // let initialState = {}

  // initialState = getInitialState(root)

  // console.log(initialState)
  console.log(initialState)
  console.log(actions)

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

    let isSubscribe = true

    if(typeof listener !== 'function') throw new Error('Listener must be funtion')

    if(isDispatching) throw new Error('Something is executing, wait some seconds')

    listeners = [...listeners, listener]

    return () => {
      if(!isSubscribe) return

      isSubscribe = false

      return listeners.filter(l => l !== listener)
    }

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

        if (process.env.NODE_ENV !== 'production') {
           logger({state, result, type})
        }

        state = {...state, ...result}

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
