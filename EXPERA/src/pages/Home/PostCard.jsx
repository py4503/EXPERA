import React from 'react'
import { Link } from 'react-router-dom';

function PostCard({ userName, likes, title, userLiked, profileImage, featuredImage }) {
  return (
    <div className="max-w-150 w-full mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">

      {/* Post Image */}
      <Link to={`/all-posts`}>
        <div className="relative w-full h-70 bg-gray-100 overflow-hidden group">
          <img
            src={featuredImage}
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
                src={profileImage}
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
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
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
        <span className="text-sm text-gray-600">{likes} {likes === 1 ? "like" : "likes"}</span>
      </div>
    </div>
  );
}

export default PostCard
