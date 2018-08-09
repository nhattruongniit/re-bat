import createStore from './re-bat'

const globalConfig = {
  initialState: {
    user: {
      name: 'Tran Ba Thanh Tung',
      age: 18
    },
    theme: {
      backgroundColor: 'red'
    },
    number: 0
  },
  actions: {
    setName: (state) => {
      // console.log(state)
      return {
        // ...state,
        user: {
          name: 'Tungtbt'
        }
      }
    },
    InCre: state => {
      return {
        number: state.number + 1,
      }
    },
    DeCre: state => {
      return {
        number: state.number - 1,
      }
    }
  }
}

export const { Provider, connect, dispatch } = createStore(globalConfig)
