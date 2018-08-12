// @flow
import * as React from 'react'

/*
* @param initialState is data default when create store
* @param globalProvider is
* @seft is Provider component...because data is saved state in Provider so we need to this to change data
*/

type Props = {
  initialState?: Object,
  children?: React$Node
}

type State = {
  [string]: any
}

type SetState = (
  key: string,
  value: any,
  callback: () => void
) => void

type WithProvider = (
  initialState: State,
  GlobalProvider: React$ComponentType<*>,
  currentComponent: React$Node
) => React$Node

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
