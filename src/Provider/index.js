// @flow
import * as React from 'react'

import type { WithProvider, Props, State, SetState } from '../utils/types'

/*
* @param initialState is data default when create store
* @param globalProvider is
* @seft is Provider component...because data is saved state in Provider so we need to this to change data
*/



const withProvider: WithProvider = (initialState, GlobalProvider, currentComponent) =>
  class Provider extends React.Component<Props, State>{
    constructor(props: Props){
      super(props)
      currentComponent(this)
      this.state = props.initialState || initialState
    }

    customSetState: SetState = (key, value, callback) => {
      const state = this.state
      this.setState({
        ...state,
        [key]: value
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
