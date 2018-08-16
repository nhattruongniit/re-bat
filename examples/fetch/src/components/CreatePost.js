import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { connect } from '../store'


class CreatePost extends Component {

  state = {
    title: "",
    bar: ""
  }

  onSubmit = (e) => {
    e.preventDefault()
    const post = {
      title: this.title.value,
      bar: this.bar.value,
      userId: 1
    }

    this.props.addNewPost(post)

    this.setState({
      title: "",
      bar: ""
    })
  }

  render(){
    return (
      <form onSubmit={this.onSubmit}>
       <input ref={node => this.title = node} placeholder="title"/>
       <input ref={node => this.bar = node} placeholder="bar"/>
       <button type="submit">Create</button>

      </form>
    )
  }
}

export default connect(
  () => {},
  dispatch => ({
    addNewPost: dispatch('addNewPost', 'posts')
  })
)(CreatePost)
