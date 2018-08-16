import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from '../store'


class CommentList extends Component {

  render(){
    const { fetchPosts, comments, loading } = this.props
    if(loading) {
      return <div>Loading Comments...</div>
    }
    return (
       <React.Fragment>
        <h4>Comments: </h4>
      {comments && comments.length > 0 && comments.map((cm,i) => (
          <div key={i} style={{
              marginBottom: 30,
              borderBottom: "1px solid black"
            }}>
           <p>Name: {cm.name}</p>
           <p>Email: {cm.email}</p>
           <p>content: {cm.body}</p>


          </div>
        ))}
       </React.Fragment>
    )
  }
}

export default connect(
  (state) => ({...state.comments}),
)(CommentList)
