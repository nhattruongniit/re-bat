# Re-bat
Re-bat is a simple state management for React application...It's built with new Context Api
## Before start

If you are person who has experience with react , having problems managing data in the application or want to learn how a state management library work... Of course, you're welcome

### But

If you are newbie , just start learn react ... you've never built a app with Pure React .. GET OUT HERE NOW.. Don't use re-bat or any library like redux, mobx, v..v ... Turn back to react document and build some project just only react.

*Remember, use a lib state management only if you really in trouble .*

## How it work?
![How re-bat work](http://res.cloudinary.com/lighter/image/upload/v1534519868/Screen_Shot_2018-08-17_at_10.27.59_PM_ilkdfi.png)
## Installation
To install re-bat with npm, run command:

```shell
npm install --save re-bat
```

## Examples

#### Todo
[Source](https://github.com/tranbathanhtung/re-bat/tree/master/examples/todos) - [Demo](https://codesandbox.io/s/1yv6ywnk3)

#### Fetch API
[Source](https://github.com/tranbathanhtung/re-bat/tree/master/examples/fetch) - [Demo](https://codesandbox.io/s/jzn0qykvx9)


## API

### createStore(yourConfig)

Create your store to save data, action... Re-bat allows us to divide your store into modules.

```javascript
import createStore from "re-bat";
import module1 from "./module1";
import module2 from "./module2";

const globalConfig = {
  root: {
    module1,
    module2
  },
  logger: true
};

export const {
  Provider,
  connect,
  dispatch,
  subscribe,
  getState
 } = createStore(globalConfig);
```

Each module can contain its own state and actions .. you should declare a variable KEY to easy manage module

```javascript
export const KEY = "module1";

const initialState = {
  //initial your state here
};

const actions = {
  //Your actions of module here
  //The first params of actions is Object contains 3 function ({state, dispatch, rootState} ,...)
  doSomething: ({state, dispatch, rootState}, ...args) => {
    //Here your logic ...
    return {
      ...state,
      //new State
    }
  }
};

export default {
  KEY,
  initialState,
  actions
};

```


*The actions must return object with current state and exactly name of state you want to update*


### Provider
Provider component to make a store to all container components in the application. You only need to use it once when you render the root component.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./store";


ReactDOM.render(
  <Provider>
      <App />
  </Provider>,
  document.getElementById("root")
);
```

### connect
Connect funtion to help you connect any component in the application to the store to get or change the data
```javascript
import React from "react";
import { connect } from "./store";

class App extends React.Component{
  render(){
    return (
      <div>Hello World</div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    ...
  }),
  dispatch => ({
    ...
  })
)(App)
```

__Note__
 * Because all Consumers that are descendants of a Provider .... So, there are many component connect to store will re-render even when value hasn't changed. We will check prevProps and nextProps of Connected Component and override function shouldComponentUpdate

 * Don't use connect function with Functional Component


### dispatch

Dispatch function help you trigger an event to update state in store .. params of dispatch function is action name and name of module contains this action.

```javascript
import React from "react";
import { connect } from "./store";

class App extends React.Component{
  render(){
    const { doSomething } = this.props;
    return (
      <button onClick={doSomething}>Click me</button>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    ...
  }),
  dispatch => ({
    doSomething: dispatch('doSomething', 'your module')
  })
)(App)
```
*You can call an action from another module*

```javascript
const actions = {
  //Your actions of module here
  //The first params of actions is Object contains 3 function ({state, dispatch, rootState} ,...)
  doSomething: ({state, dispatch, rootState}, ...args) => {
    //Here your logic ...
    dispatch('action name', 'module1')()
    dispatch('action name', 'module2')()

    return {
      ...state,
      //new State
    }
  }
};
```

### subscribe

The subscribe function is called each time you dispatch a action.. it returns a unsubscribe function... you should call unsubscribe when unmount a component

*You can call getState into subscribe*

```javascript
import React from "react";
import { connect, subscribe } from "./store";

class App extends React.Component{
  componentDidMount() {
    this.unSubscribe = subscribe(({getState}) => {
      alert(getState())
    })

  }
  componentWillUnmount() {
    this.unSubscribe()
  }
  render(){
    const { doSomething } = this.props;
    return (
      <button onClick={doSomething}>Click me</button>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    ...
  }),
  dispatch => ({
    doSomething: dispatch('doSomething', 'your module')
  })
)(App)
```


### getState

getState function return current state in store

```javascript
import { getState } from './store';
console.log(getState())
```

### logger
The logger mode to help you debug easily

![How re-bat work](http://res.cloudinary.com/lighter/image/upload/v1534686163/Screen_Shot_2018-08-19_at_8.41.54_PM_i3icky.png)
