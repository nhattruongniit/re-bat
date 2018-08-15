import React from 'react'

export const Todo = ({ todo, deleteTodo, completeTodo }) => (
  <li>
    <span style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: "pointer"
      }} onClick={() => completeTodo(todo.id)}>{todo.text}</span>
    <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
  </li>
)
