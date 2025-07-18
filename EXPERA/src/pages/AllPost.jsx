import React, { useEffect, useState } from 'react'
import postService from '../appwrite/PostService'
import { PostCard } from '../components';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            postService.getAllPosts()
            .then((posts) => {
                if(posts){
                // console.log("all posts ::",posts.documents)
                setPosts(posts.documents);
                }
            })
            .catch(() => console.log("ALL-POSTS ::",error))
        } catch (error) {
            console.log("Error while loading posts", error);
        }
    }, [])
  return (
    <section className="max-w-full px-14 sm:px-10 lg:px-12 py-6">
        {/* heading */}
        <div className="mb-5 text-center">
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          Explore what others are sharing. Stories, thoughts, visuals, and more.
        </p>
      </div>

      {/* grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.length > 0 ? (
          posts.map((post) => <PostCard key={post.$id} {...post} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center">No posts found.</p>
        )}
      </div>
       
    </section>
  )
}

export default AllPost
