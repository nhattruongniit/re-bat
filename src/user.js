const key = 'manageUser'

const initialState = {
  user: {
    name: 'Tran Ba Thanh Tung',
    age: 18
  },
  loading: false,
}

const actions = {
  setName: (state, dispatch, ...arg) => {
    dispatch('pending')()
    return new Promise(resolve => setTimeout(() => {
      dispatch('fullfield')()
      dispatch('InCre')()

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
}

export default {
  key,
  initialState,
  actions
}
