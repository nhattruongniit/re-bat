// @flow
import * as React from 'react'
import connected from './ConnectComponent'

const withConnect = (Consumer, dispatch) => (mapStateToProps = () => {}, mapDispatchToProps = () => {}) => Component => props => {
  return (
    <Consumer>
      {data => {
        const state = mapStateToProps(data || {}, props || {})
        const actions = mapDispatchToProps(dispatch)
        return (
          <Component {...props} {...state} {...actions}/>
        )
      }}
    </Consumer>
  )
}

export default withConnect
