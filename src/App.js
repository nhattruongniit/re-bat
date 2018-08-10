import React, { Component } from 'react';
import logo from './logo.svg';
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
          <header className="App-header" style={{
              backgroundColor: this.props.theme.backgroundColor
            }}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">{!loading ? user.name : 'Loading...'}</h1>
            </header>
            <p className="App-intro">
             {this.props.fuckyou}
            </p>
            <button onClick={() => this.props.setName(10)}>Click me</button>
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
