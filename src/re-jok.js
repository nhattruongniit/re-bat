import createStore from './re-bat'
import manageUser from './user'

const globalConfig = {
  root: {
    module1: {
      initialState: {
          user: {
            name: 'Tran Ba Thanh Tung',
            age: 18
          },
          loading: false,

      },
      actions: {
          setName: ({state, dispatch}, ...arg) => {
            dispatch('pending', 'module1')()
            return new Promise(resolve => setTimeout(() => {
              dispatch('fullfield', 'module1')()
              dispatch('InCre', 'module2')()

              resolve({
                ...state,
                user: {
                  name: 'Tungtbt',
                  age: 20
                },
              })
            }, 1000))
          },
      pending: () => ({loading: true}),
      fullfield: () => ({loading: false}),
      },
    },
    module2: {
      initialState: {
        theme: {
          backgroundColor: 'red'
        },
        number: 0
      },
      actions: {
        InCre: ({state}) => {
          return {
            ...state,
            number: state.number + 1,
          }
        },
        DeCre: ({state}) => {
          return {
            ...state,
            number: state.number - 1,
          }
        },

      },

    }
  }
  // initialState: {
  //   [manageUser.key]: {...manageUser.initialState}
  // },
  // actions: {
  //   [manageUser.key]: {...manageUser.actions}
  // },

}

export const { Provider, connect, dispatch, subscribe } = createStore(globalConfig)
