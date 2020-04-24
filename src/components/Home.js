import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../graphql/queries';

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

  return (
    <div >
      <ul>
          {posts.map(p => (
              <li>
                  <h4><a href="">{p.title}</a></h4>
                  <span>By {p.owner}</span>
                  <div>
                    <button>delete</button>
                    <button>Edit</button>
                  </div>
              </li>
          ))}
      </ul>
    </div>
  );
}

export default withAuthenticator(Home);
