// @flow
import * as React from 'react'

import type { WithProvider, Props, State, SetState } from '../utils/types'
import { logger } from '../utils'

/*
* @param {initialState} is data default when create store
* @param {GlobalProvider} is Context.Provider
* @param {currentComponent} is this component...because data is saved state in Provider so we need to this to change state
* @return {Provider} component
*/

const withProvider: WithProvider = (initialState, GlobalProvider, currentComponent) =>
  class Provider extends React.Component<Props, State>{
    constructor(props: Props){
      super(props)
      currentComponent(this)
      this.state = props.initialState || initialState
    }

    customSetState: SetState = (type, key, value, isLogger, callback) => {
      const prevState = {...this.state}

      this.setState({
        ...this.state,
        [key]: {...value}
      }, () => {
        if (process.env.NODE_ENV !== 'production' && isLogger) {
           logger({state: prevState, result: this.state, type: `${type} - ${key}`})
        }
      })
    }

    render(){
      return (
        <GlobalProvider value={this.state} >
          {React.Children.only(this.props.children)}
        </GlobalProvider>
      )

    }
  }

export default withProvider
