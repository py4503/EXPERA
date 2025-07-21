import React, { useEffect, useState } from 'react'
import likeService from '../../appwrite/LikeService';
import { Query } from 'appwrite';
import postService from '../../appwrite/PostService';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png'
import { useSelector } from 'react-redux';

function PostCard({ $id, userName, title, userId, featuredImage }) {
  
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const slug = $id;
  const currentUserId = useSelector((state) => state.auth.userData?.$id);
  const [saved, setSaved] = useState(false);
  
    const handleLike = async() => {
    if(!userLiked){
      setLikes(() => likes + 1);
      setUserLiked(true);
      console.log(currentUserId);
      await likeService.registerLike({slug, userId:currentUserId});
    }
    else{
      setLikes(() => likes - 1);
      setUserLiked(false)
      await likeService.unRegisterLike({slug, userId:currentUserId})
    }
  }

  useEffect(() => {
    const getLikes = async() => {
      const query = [Query.equal('slug', slug)];
      const like_count = await likeService.isLiked(query);
      if(like_count){
        setLikes(like_count.documents.length);
      }
    }
    const isLikedc = async() => {
      const query = [Query.and([
        Query.equal('userId',currentUserId),
        Query.equal('slug',slug)
      ])]

      const liked = await likeService.isLiked(query);
      if(liked.documents.length > 0 && liked.documents[0].userId == currentUserId){
        setUserLiked(true);
      }
    }
    getLikes();
    isLikedc();
  }, []);

  useEffect(() => {
    const getSavedStatus = async() => {
          const queries = [Query.and([
            Query.equal('userId', currentUserId),
            Query.equal('slug',slug)
          ])]

          const isSaved = await postService.getSavedPosts(queries);

          if(isSaved.documents.length){
            setSaved(true);
          }
    }
    getSavedStatus();
  },[])

  const handleSave = async() => {
    if(saved){
      setSaved(false);
      await postService.removeFromSaved({slug, userId});
    }
    else{
      setSaved(true);
      await postService.savePost({slug, userId});
    }
  }

  return (
    <div className="max-w-150 w-full mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      
      {/* Post Image */}
      <Link to={`/post/${slug}`}>
      <div className="relative w-full h-70 bg-gray-100 overflow-hidden group">
        <img
          src={postService.getFile(featuredImage)}
          alt="Post"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Profile & Title */}
      <div className="flex items-center p-4 space-x-4 bg-white backdrop-blur-sm">
        
        {/* Profile Image */}
        <div className="flex-shrink-0 relative">
            <div className="group relative transition duration-500 hover:ring-3 hover:ring-blue-300 rounded-3xl">

          <img
            src={ `https://api.dicebear.com/7.x/adventurer/svg?seed=${$id}`}
            alt={userName}
            className="w-14 h-14 rounded-full border-2 border-white shadow-md"
          />
          </div>
        </div>

        {/* Username & Title */}
        <div>
          <p className="text-sm text-gray-500">{userName}</p>
          <p className="text-lg font-semibold text-gray-800">{title}</p>
        </div>
      </div>
      </Link>
      {/* Like Button */}
<div className="px-4 pb-4 flex justify-between items-center gap-2">
  <div className='flex flex-wrap'>
  <button
    onClick={handleLike}
    className={`transition-all duration-200 rounded-full p-2 
      ${userLiked ? 'text-red-600 bg-red-100' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={userLiked ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.318 6.318a4.5 4.5 0 016.364 0L12 6.94l.318-.622a4.5 4.5 0 116.364 6.364L12 21.25 5.318 13.64a4.5 4.5 0 010-6.364z"
      />
    </svg>
  </button>
  <div className="text-sm text-gray-600 items-center my-auto px-1">{likes} {likes === 1 ? "like" : "likes"}</div>
  </div>
  <div>
      <button
    onClick={handleSave}
    className={`transition-all duration-200 rounded-full p-2 
      ${saved ? 'text-black/80 bg-black/10' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  fill={saved ? 'currentColor' : 'none'}
  viewBox="0 0 24 24"
  stroke="currentColor"
  className="w-5 h-5"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 3a2 2 0 012-2h10a2 2 0 012 2v18l-7-5-7 5V3z"
  />
</svg>

  </button>
  </div>
</div>
    </div>
  );
}

export default PostCard
