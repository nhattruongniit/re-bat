// @flow
import * as React from 'react'

import withConnect from './connect'
import withProvider from './Provider'



const createStore = globalConfig => {
  if(typeof globalConfig !== 'object') throw new Error('globalConfig must be object')
  const { initialState, actions } = globalConfig
  const Context = React.createContext()

  let provider;
  let state = initialState
  const currentComponent = self => {
    provider = {
      setState: (state, callback) => self.setState(state, callback)
    }
  }

  const dispatch = type => {
      if(!provider) console.error('provider is undefined')

      console.log(state)
      let result = actions[type](state)
      console.log(result)
      state = {...state, ...result}

      return () => result.then ? result.then(r => provider.setState(r)) : provider.setState(result)

  }


  const Provider = withProvider(initialState, Context.Provider, currentComponent)
  const connect = withConnect(Context.Consumer)


  return {
     Provider,
     connect,
     dispatch
  }

}

export default createStore
