import React, { Component } from 'react';
import './App.css';
import Test from './Test';
import { connect, subscribe } from './re-jok'


class App extends Component {

  componentDidMount(){
    // this.sb1 = subscribe(this.alert)

  }

  alert = ({getState}) => {
    alert(getState().user.name)
  }

  render() {
   // console.log('Props App', this.props)
    const {user, loading} = this.props

    return (

        <div className="App">
          <header>

            <h1 className="App-title">{!loading ? user && user.name : 'Loading...'}</h1>
            </header>
            <p className="App-intro">
             {this.props.fuckyou}
            </p>
            <button onClick={this.props.setName}>Click me</button>
          <Test/>
        </div>

    );
  }
}

export default connect(
  (state, props) => ({...state}),
  dispatch => ({
    setName: dispatch('setName')
  })
)(App);
