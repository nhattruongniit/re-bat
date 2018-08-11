// @flow
import * as React from 'react'

/*
* @param initialState is data default when create store
* @param globalProvider is
* @seft is Provider component...because data is saved state in Provider so we need to this to change data
*/

const withProvider = (initialState, GlobalProvider, currentComponent) =>
  class ABC extends React.Component<{}>{
    constructor(props){
      super(props)
      currentComponent(this)
      console.log(initialState)
      this.state = props.initialState || initialState
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
