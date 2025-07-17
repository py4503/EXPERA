import React from "react";
import { PostCard } from "../components";

const posts = [
  {
    $id: 1,
    postImage: "https://source.unsplash.com/random/600x400?future",
    featuredImage: "https://randomuser.me/api/portraits/men/1.jpg",
    userId: "Ada Lovelace",
    title: "AI will soon speak your language natively.",
  },
  {
    $id: 2,
    postImage: "https://source.unsplash.com/random/600x400?design",
    featuredImage: "https://randomuser.me/api/portraits/women/2.jpg",
    userId: "Steve Jobs",
    title: "Design is not just what it looks like.",
  },
  {
    $id: 3,
    postImage: "https://source.unsplash.com/random/600x400?innovation",
    featuredImage: "https://randomuser.me/api/portraits/men/3.jpg",
    userId: "Alan Turing",
    title: "Can machines think, or dream?",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch bg-white">
      {/* Left Intro Section */}
      <div className="md:w-1/2 w-full px-8 py-16 flex flex-col justify-center items-start space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">SiriSpace</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Discover ideas, tech insights, and visual inspiration — shared by minds shaped by design, AI, and innovation.
        </p>
        <button className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl font-medium shadow-md hover:opacity-90 transition">
          Get Started
        </button>
      </div>

      {/* Right Floating Post Feed */}
      <div className="md:w-1/2 w-full relative overflow-y-auto px-4 py-8 bg-gray-50 rounded-t-3xl md:rounded-none md:border-l">
        <div className="space-y-6 animate-fade-in-up">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}