import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updatePost } from '../graphql/mutations';
import { getPost } from '../graphql/queries';
import { useParams } from "react-router-dom";

function EditPost() {
    let { id } = useParams();
    const [title, setTitle] = React.useState();
    const [content, setContent] = React.useState();

    React.useEffect(() => {
        queryPostById();
    }, [])

    const queryPostById = async () => {
        const resp = await API.graphql(graphqlOperation(getPost, { id }));
        console.log('--->>>>', resp)
        setTitle(resp.data.getPost.title);
        setContent(resp.data.getPost.content);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let input = {
                id,
                title,
                content
            }
            let newPost = await API.graphql(graphqlOperation(updatePost, {input}));
            setTitle('');
            setContent('');
            console.log('Post Updated ->>', newPost)
          } catch (error) {
            console.log(error)
        }
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                Title:
                <input type="text" value={title} onChange={
                    (e) => setTitle(e.target.value)
                } />
            </label>
            </div>
            <div>
            <label>
                Content:
                <textarea type="text" value={content} onChange={
                    (e) => setContent(e.target.value)
                } />
            </label>
            </div>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default EditPost;