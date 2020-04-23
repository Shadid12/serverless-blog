import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';

function Home() {
  const posts = [
      {
          id: 'id-1',
          title: 'dummy title',
          content: 'dummy content'
      },
      {
        id: 'id-2',
        title: 'dummy title 2',
        content: 'dummy content 2'
    }
  ];


  return (
    <div >
      <ul>
          {posts.map(p => (
              <li>
                  <h3><a href="">{p.title}</a></h3>
                  <p>{p.content}</p>
              </li>
          ))}
      </ul>
    </div>
  );
}

export default withAuthenticator(Home );
