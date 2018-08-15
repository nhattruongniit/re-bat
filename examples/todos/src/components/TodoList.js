import React from 'react'
import { Todo } from './Todo'

export const TodoList = ({ todos, deleteTodo, completeTodo, filter }) => {
  let tds = todos.filter(td => filter === 'all' ? true : filter === 'completed' ? td.completed : !td.completed)

  return (
    <ul>
      {
        tds.length > 0 && tds.map((t, i) => (
          <Todo completeTodo={completeTodo} deleteTodo={deleteTodo} todo={t} key={i}/>
        ))
      }
    </ul>
  )

}
