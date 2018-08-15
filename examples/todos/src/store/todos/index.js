// Key is name of module
export const KEY = 'todos'
//random id
export const generalId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const initialState = {
  todos: [],
  filter: 'all'
}

const actions = {
  addTodo: ({state}, value) => ({
      ...state,
      todos: [
        ...state.todos,
        {
          id: generalId(),
          text: value,
          completed: false
        }
      ]
    }),
  deleteTodo: ({state}, id) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id)
  }),
  completeTodo: ({state}, id) => ({
    ...state,
    todos: state.todos.map(t => t.id === id ? {...t, completed: !t.completed} : {...t})
  }),
  filterTodo: ({state}, filter) => ({
    ...state,
    filter
  })
}

export default {
  initialState,
  actions
}
