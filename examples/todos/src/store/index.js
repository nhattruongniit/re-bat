import createStore from 're-bat'
import todos from './todos'

const globalConfig = {
  root: {
    todos: todos
  },
  logger: true
}

const { Provider, connect } = createStore(globalConfig)

export { Provider, connect }
