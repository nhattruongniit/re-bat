// @flow
import * as React from 'react'

import type { WithProvider, Props, State, SetState } from '../utils/types'

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

    customSetState: SetState = (key, value, callback) => {
      this.setState({
        ...this.state,
        [key]: {...value}
      }, callback)
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
