import React, { Component } from 'react';
import './App.css';
import Test from './Test';
import { connect, subscribe } from './re-jok'


class App extends Component {

  componentDidMount(){
    // this.sb1 = subscribe(this.alert)
    // console.log("hi")

  }

  alert = ({getState}) => {
    alert(getState().user.name)
  }

  // shouldComponentUpdate(nextProps){
  //  console.log(this.props !== nextProps)
  //  console.log(this.props)
  //  console.log(nextProps)
  //  if(JSON.stringify(this.props) !== JSON.stringify(nextProps)) return true
  //  return false
  // }

  render() {
    console.log('Props App', this.props)
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
          <Test user={user} loading={loading}/>
        </div>

    );
  }
}

export default connect(
  (state, props) => ({...state.module1}),
  dispatch => ({
    setName: dispatch('setName', 'module1')
  })
)(App);
