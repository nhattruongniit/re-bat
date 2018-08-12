// @flow
import * as React from 'react'
import connected from './ConnectComponent'
import type { WithConnect } from '../utils/types'
import { isFunc } from '../utils'

/*
* @param {Consumer} is Context.Consumer
* @param {dispatch} is funtion to dispatch actions
* @returns {WrapperComponent} with component has state and funtion in store
*/

const withConnect: WithConnect = (Consumer, dispatch) => (mapStateToProps, mapDispatchToProps) => Component => props => {

  const displayName = `Connect(${Component.displayName || Component.name || 'Unknow'})`

  const WrapperComponent = arg => (
    <Consumer>
      {data => {
        const state = isFunc(mapStateToProps) ? mapStateToProps(data, props) : {}
        const actions = isFunc(mapDispatchToProps) ? mapDispatchToProps(dispatch) : {}
        return (
          <Component {...arg} {...props} {...state} {...actions}/>
        )
      }}
    </Consumer>
  )

  WrapperComponent.displayName = displayName

  return <WrapperComponent />
}

export default withConnect
