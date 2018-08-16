export const KEY = 'post'

const initialState = {
  post: {},
  loading: false,
  error: ""
}

const actions = {
  fetchPost: async ({state, dispatch}, id) => {
    try{
      dispatch('pending', KEY)()
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      const result = await res.json()
      dispatch('fullfield', KEY)()
      return {
        ...state,
        post: result
      }

    } catch(error){
      dispatch('reject', KEY)()

    }
  },
  pending: ({state}) => ({...state, loading: true, error: ""}),
  fullfield: ({state}) => ({...state, loading: false, error: ""}),
  reject: ({state}) => ({...state, loading: false, error: "Oops! Something wrong"}),
}


export default {
  initialState,
  actions
}
