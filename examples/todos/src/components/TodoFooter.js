import React from 'react'

export const TodoFooter = ({ filterTodo }) => {
  return ['all', 'completed', 'active'].map((d, i) => (
    <button onClick={() => filterTodo(d)} key={i}>
      {d}
    </button>
  ))

}
