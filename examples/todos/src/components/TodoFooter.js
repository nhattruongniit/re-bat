import React from 'react'

export const TodoFooter = ({ filterTodo, clearComplete }) => {
  return (
    <React.Fragment>
      {
        ['all', 'completed', 'active'].map((d, i) => (
          <button onClick={() => filterTodo(d)} key={i}>
            {d}
          </button>
        ))
      }
      <button onClick={clearComplete}>
        clear complete
      </button>
    </React.Fragment>
  )

}
