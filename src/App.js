import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './Test';
import { connect, dispatch } from './re-jok'


class App extends Component {
  render() {
   // console.log('Props App', this.props)
    return (

        <div className="App">
          <header className="App-header" style={{
              backgroundColor: this.props.theme.backgroundColor
            }}>
            <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.user.name}</h1>
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
  state => ({...state}),
  () => ({
    setName: dispatch('setName')
  })
)(App);
