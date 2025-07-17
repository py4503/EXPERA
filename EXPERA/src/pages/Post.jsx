import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from 'react-redux';
import postService from '../appwrite/PostService';
import parse from 'html-react-parser'
import { Container } from '../components';
import { Link } from 'react-router-dom';

function Post() {

  const navigate = useNavigate();
  const [post, setPost] = useState()
  const [isAuthor, setIsAuthor] = useState(false);
  const {slug} = useParams();
  console.log("slug:",slug);
  const user = useSelector((state) => state.auth.userData.$id);

  useEffect(() => {
    postService.getSinglePost(slug)
    .then((post) => {
      console.log("POST ::",post)
      if(post){
        setPost(post);
        if(post.userId === user){
          setIsAuthor(true)
        }
      }
    })
  }, [])

  const deletePost = async() => {
    await postService.deletePost(slug)
    .then(() => navigate('/'))
    .catch(() => console.log("Error while deleting post")) 
  }
  return post ? (
  <div className="py-10">
    <Container>
      {/* Post Wrapper */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden transition hover:shadow-md">

        {/* Featured Image with Controls */}
        <div className="relative w-full">
          <img
            src={postService.getFile(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[500px] object-cover object-center rounded-t-3xl"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="px-4 py-2 text-sm rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Title and Content */}
        <div className="px-6 py-8 sm:px-10 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">{post.title}</h1>

          <div className="prose max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-img:rounded-xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            {/* {parse(post.content)} */}
          </div>
        </div>
      </div>
    </Container>
  </div>
) : null;

}

export default Post
