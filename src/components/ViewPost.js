import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getPost } from '../graphql/queries';
import { useParams } from "react-router-dom";

function ViewPost() {
    let { id } = useParams();
    const [post, setPost] = React.useState();

    React.useEffect(() => {
        queryPostById();
    }, [])

    const queryPostById = async () => {
        const resp = await API.graphql(graphqlOperation(getPost, { id }));
        console.log('--->>>>', resp)
        setPost(resp.data.getPost);
    }

    if(!post) {
        return <div>Loading....</div>
    }
    return (
      <div>
        <h1>{post.title}</h1>
        <div>
            <span>By <b>{post.owner}</b></span>
        </div>
        <p>{post.content}</p>
        <ul>
            {
                post.comments.items.map(com => (<li>{com.content}</li>))
            }
        </ul>
      </div>
    );
}

export default ViewPost;