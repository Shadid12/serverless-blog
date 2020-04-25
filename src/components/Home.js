import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';
import { deletePost } from '../graphql/mutations';
import {
  Link
} from "react-router-dom";

function Home() {
  const [posts, setPosts] = React.useState([])
  React.useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      let resp = await API.graphql(graphqlOperation(listPosts));
      console.log('===>>>>',resp);
      setPosts(resp.data.listPosts.items)
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  const deleteSelected = async id => {
    try {
      let input = {
        id
      }
      let deleted  = await API.graphql(graphqlOperation(deletePost, {input}));
      let newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
      console.log('Post delete', deleted);
    } catch (error) {
      alert('Not Allowed', error);
    }
  }


  return (
    <div >
      <ul>
          {posts.map(p => (
              <li>
                  <h4><a href="">{p.title}</a></h4>
                  <span>By {p.owner}</span>
                  <div>
                  <button onClick={() => deleteSelected(p.id)}>delete</button>
                  <Link to={`/posts/edit/${p.id}`}>Edit</Link>
                  </div>
              </li>
          ))}
      </ul>
    </div>
  );
}

export default withAuthenticator(Home);
