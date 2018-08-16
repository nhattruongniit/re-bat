import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from '../store'
import CommentList from './CommentList'

class PostList extends Component {
  async componentDidMount(){

    const { postId } = this.props.match.params
    await this.props.fetchPost(postId)
    await this.props.fetchComments(postId)

  }
  async componentDidUpdate(prevProps, _){
    if(this.props.match.params.postId !== prevProps.match.params.postId){
      const { postId } = this.props.match.params

      await this.props.fetchPost(postId)
      await this.props.fetchComments(postId)


    }
  }
  render(){
    const { fetchPost, post, loading } = this.props
    if(loading) {
      return <div>Loading Post...</div>
    }
    return (
       <React.Fragment>
         <h1>{post.title}</h1>
         <p>{post.body}</p>
         <CommentList/>

       </React.Fragment>
    )
  }
}

export default connect(
  (state) => ({...state.post}),
  dispatch => ({
    fetchPost: dispatch('fetchPost', 'post'),
    fetchComments: dispatch('fetchComments', 'comments')

  })
)(PostList)
