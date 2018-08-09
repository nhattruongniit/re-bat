// @flow
import * as React from 'react'
import connected from './ConnectComponent'

const withConnect = Consumer => (mapStateToProps = () => {}, mapDispatchToProps = () => {}) => Component => props => {

  return (
    <Consumer>
      {data => {
        const state = mapStateToProps(data || {})
        const actions = mapDispatchToProps()
        return (
          <Component {...props} {...state} {...actions}/>
        )
      }}
    </Consumer>
  )
}

export default withConnect
