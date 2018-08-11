import createStore from './re-bat'
import manageUser from './user'

const globalConfig = {
  // root: {
  //   module1: {
  //     initialState: {
  //         user: {
  //           name: 'Tran Ba Thanh Tung',
  //           age: 18
  //         },
  //         loading: false,
  //       theme: {
  //         backgroundColor: 'red'
  //       },
  //       number: 0
  //     },
  //     actions: {
  //         setName: (state, dispatch, ...arg) => {
  //           dispatch('pending')()
  //           return new Promise(resolve => setTimeout(() => {
  //             dispatch('fullfield')()
  //             dispatch('InCre')()
  //
  //             resolve({
  //               user: {
  //                 name: 'Tungtbt',
  //                 age: 20
  //               },
  //             })
  //           }, 1000))
  //         },
  //         pending: () => ({loading: true}),
  //         fullfield: () => ({loading: false}),
  //         InCre: state => {
  //           return {
  //             number: state.number + 1,
  //           }
  //         },
  //         DeCre: state => {
  //           return {
  //             number: state.number - 1,
  //           }
  //         }
  //     }
  //   },
  //   module2: {
  //     initialState: {
  //       abc: 1
  //     },
  //     actions: {}
  //   }
  // }
  initialState: {
    [manageUser.key]: {...manageUser.initialState}
  },
  actions: {
    [manageUser.key]: {...manageUser.actions}
  },
  
}

export const { Provider, connect, dispatch, subscribe } = createStore(globalConfig)
