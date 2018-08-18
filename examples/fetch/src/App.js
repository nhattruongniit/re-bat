import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
// import {  } from 'react-router';
import PostList from './components/PostList'
import Post from './components/Post'
import CreatePost from './components/CreatePost'


class App extends Component {
  componentDidMount(){
    // this.props.fetchPosts()
  }
  render() {
    const { fetchPosts, posts, loading } = this.props
    if(loading) {
      return <div>Loading...</div>
    }
    return (
      <React.Fragment>
        <div style={
            {
              display: 'flex'
            }
          }>
          <div style={{
              width: 256
            }}>
            <Link to="/">Home</Link>

            <Link to="/add/post"><button>Create Post</button></Link>
            <PostList/>
          </div>
          <div>
          <Switch>
            <Route exact path="/" component={() => <div>Click title to see detailt post</div>} />
            <Route path="/post/:postId" component={Post} />
            <Route path="/add/post" component={CreatePost} />

          </Switch>
        </div>
        </div>


      </React.Fragment>

    );
  }
}

export default App;
