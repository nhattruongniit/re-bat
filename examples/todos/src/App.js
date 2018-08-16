import React, { Component } from 'react';
import { connect } from './store'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

import { TodoFooter } from './components/TodoFooter'


class App extends Component {
  render() {
    const { addTodo, filterTodo, clearComplete, ...rest } = this.props

    return (
      <div className="App">
        <TodoForm addTodo={addTodo} />

        <TodoList
          {...rest}
           />
         <TodoFooter filterTodo={filterTodo} clearComplete={clearComplete}/>

      </div>
    );
  }
}

export default connect(
  state => ({...state.todos}),
  dispatch => ({
    addTodo: dispatch('addTodo', 'todos'),
    deleteTodo: dispatch('deleteTodo', 'todos'),
    completeTodo: dispatch('completeTodo', 'todos'),
    filterTodo: dispatch('filterTodo', 'todos'),
    clearComplete: dispatch('clearComplete', 'todos')
  })
)(App);
