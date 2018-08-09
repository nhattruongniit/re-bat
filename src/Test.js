import React, { Component } from 'react';

import { connect, dispatch } from './re-jok'


class Test extends Component {
  render() {
    // console.log('Props test ',this.props)
    return (

        <div className="App">
          <h1>{this.props.user.age}</h1>
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
  user: state.user,
  number: state.number || 0,
}),
() => ({
  InCre: dispatch('InCre'),
  DeCre: dispatch('DeCre')
})
)(Test)