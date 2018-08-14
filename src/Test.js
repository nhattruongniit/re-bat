import React, { Component } from 'react';

import { connect, dispatch } from './re-jok'


class Test extends Component {
  render() {
    // console.log('Props test ',this.props)
    const {user, loading} = this.props
    
    return (
        <div className="App">
          <h1>{!loading ? user && user.age : 'Loading....'}</h1>
        <div>
          <button onClick={this.props.InCre}>Incre</button>
          <button onClick={this.props.DeCre}>Decre</button>
        <p>{this.props.number}</p>
        </div>
        </div>

    );
  }
}

export default connect((state) => ({
  number: state.module2.number || 0,
}),
() => ({
  InCre: dispatch('InCre', 'module2'),
  DeCre: dispatch('DeCre', 'module2')
})
)(Test)
