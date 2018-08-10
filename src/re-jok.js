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
    loading: false,
    number: 0
  },
  actions: {
    setName: (state, dispatch, value) => {

      dispatch('pending')()

      return new Promise(resolve => setTimeout(() => {
        dispatch('fullfield')()
        resolve({

          user: {
            name: 'Tungtbt',
            age: 20
          },
        })
      }, 1000))
    },
    pending: () => ({loading: true}),
    fullfield: () => ({loading: false}),
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

export const { Provider, connect, dispatch, subscribe } = createStore(globalConfig)
