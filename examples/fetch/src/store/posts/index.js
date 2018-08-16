// import fetch from 'fetch'
export const KEY = 'posts'

const initialState = {
  posts: [],
  loading: false,
  error: ""
}

const actions = {
   fetchPosts: async ({state, dispatch}) => {

    try{
      dispatch('pending', KEY)()
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const result = await res.json()
      dispatch('fullfield', KEY)()
      return {
        ...state,
        posts: result
      }

    } catch(error){
      dispatch('reject', KEY)()

    }

   },
   addNewPost: async ({state, dispatch}, post) => {

    try{
      dispatch('pending', KEY)()
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         body: JSON.stringify(post),
         headers: {
          "Content-type": "application/json; charset=UTF-8"
          }
       })

       const result = await res.json()
       
       dispatch('fullfield', KEY)()
       return {
         ...state,
         posts: [result, ...state.posts]
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
