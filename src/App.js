import React from 'react';
import Home from './components/Home';
import Post from './components/Post';
import EditPost from './components/EditPost';
import ViewPost from './components/ViewPost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts/new">New Post</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/posts/new">
              <Post />
            </Route>
            <Route path="/posts/edit/:id">
              <EditPost />
            </Route>
            <Route path="/posts/:id">
              <ViewPost />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
