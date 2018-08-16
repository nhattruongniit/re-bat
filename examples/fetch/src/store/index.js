import createStore from 're-bat'
import posts from './posts'
import post from './post'
import comments from './comments'

const globalConfig = {
  root: {
     posts,
     post,
     comments
  },
  logger: true
}

const { Provider, connect } = createStore(globalConfig)

export { Provider, connect }
