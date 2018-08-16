import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from '../store'


class PostList extends Component {
  componentDidMount(){
    this.props.fetchPosts()
  }
  render(){
    const { fetchPosts, posts, loading } = this.props
    if(loading) {
      return <div>Loading Posts...</div>
    }
    return (
       <React.Fragment>
         {posts && posts.length > 0 && posts.map((p,i) => (
          <div key={i} style={{
              marginBottom: 30,
              borderBottom: "1px solid black"
            }}>
             <Link to={`/post/${p.id}`}>Title: {p.title}</Link>


          </div>
        ))}
       </React.Fragment>
    )
  }
}

export default connect(
  (state) => ({...state.posts}),
  dispatch => ({
    fetchPosts: dispatch('fetchPosts', 'posts')
  })
)(PostList)
