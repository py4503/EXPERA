import React, { useEffect, useState } from 'react'
import postService from '../appwrite/PostService';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
import { PostCard } from '../components';

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const userId = useSelector((state) => state.auth.userData?.$id)
    const queries = [Query.equal('userId', userId)]

    useEffect(() => {
        postService.getAllPosts(queries)
        .then((post) => {
            if(post){
                // console.log("user posts ::", post.documents)
                setPosts(post.documents);
            }
        })
        .catch((error) => console.log("user has no post to display", error));
    }, []);

  return posts? (
    <section className="max-w-full mx-auto px-14 sm:px-10 lg:px-12 py-6">
        {/* heading */}
        <div className="mb-5 text-center">
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
         Authored by You
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
  ) : (<p>no post found...</p>);
}

export default UserPosts
