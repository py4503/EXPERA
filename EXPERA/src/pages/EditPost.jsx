import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import postService from '../appwrite/PostService';
import { PostForm, Container } from '../components';

function EditPost() {

    const {slug} = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        postService.getSinglePost(slug)
        .then((post) => {
            if(post){
                console.log("Edit post ::",post)
                setPost(post);
            }
            else{
                navigate('/')
            }
        })
        .catch((error) => console.log(error));
    }, [slug, navigate])

  return post? (
    <Container>
        <PostForm {...post}/>
    </Container>
  ) : (<p>post not found...</p>)
}

export default EditPost
