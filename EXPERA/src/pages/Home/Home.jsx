import React from "react";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import profile_1 from '../../assets/home/profile_1.jpg'
import profile_2  from '../../assets/home/profile_2.webp'
import profile_3 from '../../assets/home/profile_3.jpg'
import design from '../../assets/home/design.png'
import moon from '../../assets/home/moon_mountain.webp'
import mental_health from '../../assets/home/mental_health.png'

const posts = [
  {
    $id: 2,
    profileImage: profile_1,
    featuredImage: design,
    userName: "Steve Jobs",
    userLiked:true,
    likes:1232,
    title: "Design is not just what it looks like.",
  },
  {
    $id: 7,
    profileImage: profile_2,
    featuredImage: moon,
    userName: "Leo Vega",
    userLiked:false,
    likes:500,
    title: "I write poems under moonlight and pretend I’m stardust.",
  },
  {
    $id: 9,
    profileImage: profile_3,
    featuredImage: mental_health,
    userName: "Noah Arai",
    userLiked:true,
    likes:3098,
    title: "I documented my burnout. Here's what I learned.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-gray-350 to-gray-950/60 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Discover, Share & Reflect
        </h1>
        <p className="text-lg text-gray-600">
          A cozy corner of the internet to pen down your thoughts, experiences, and unique perspectives. Whether it’s a fleeting moment or a lifelong lesson — every story matters.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-gray-800 text-white text-sm rounded-xl shadow hover:bg-gray-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/all-posts"
            className="px-6 py-3 border border-gray-400 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition"
          >
            Explore Stories
          </Link>
        </div>
      </div>

      {/* Right Section: Scrolling Post Feed */}
      <div className="md:w-1/2 h-[600px] overflow-hidden relative rounded-xl border border-gray-600 bg-black/10 shadow-inner p-4">
        <div className="absolute top-0 left-0 w-full animate-[scroll_30s_linear_infinite] space-y-6">
          {posts.concat(posts).map((post, index) => (
            <div key={index} className="w-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Animation */}
      <style>{`
        @keyframes scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}