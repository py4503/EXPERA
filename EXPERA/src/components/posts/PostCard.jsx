import React from 'react'

function PostCard({ postImage, profileImage, username, title }) {
  return (
    <div className="max-w-md w-full mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      
      {/* Post Image */}
      <div className="relative w-full h-70 bg-gray-100 overflow-hidden group">
        <img
          src={postImage}
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
            alt={username}
            className="w-14 h-14 rounded-full border-2 border-white shadow-md"
          />
          </div>
        </div>

        {/* Username & Title */}
        <div>
          <p className="text-sm text-gray-500">{username}</p>
          <p className="text-lg font-semibold text-gray-800">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard
