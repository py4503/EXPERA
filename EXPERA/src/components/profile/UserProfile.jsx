import { FaBookmark, FaHeart, FaRegFrown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import postService from "../../appwrite/PostService";
import { Query } from "appwrite";
import PostCard from "../posts/PostCard";
import likeService from "../../appwrite/LikeService";
import Loader from "../Loader/Loader";

const EmptyState = ({ icon, message, details }) => (
  <div className="col-span-full flex flex-col items-center justify-center text-center text-slate-500 py-20 bg-slate-50 rounded-xl border-2 border-dashed">
    <div className="text-5xl text-slate-400 mb-4">{icon}</div>
    <p className="font-semibold text-slate-700">{message}</p>
    <p className="text-sm mt-1">{details}</p>
  </div>
);


export default function UserProfile() {
  const user = useSelector((state) => state.auth.userData);
  const [activeTab, setActiveTab] = useState("saved");
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.$id) return;

    const fetchData = async () => {
      try {
        const savedQuery = [Query.equal("userId", user.$id)];
        const savedRes = await postService.getSavedPosts(savedQuery);

        // console.log("sres ::", savedRes.documents)
        setSavedPosts(savedRes.documents || []);

        const likedRes = await likeService.getLikedPosts({ userId: user.$id });
        // console.log("lres::",likedRes.documents);

        setLikedPosts(likedRes.documents)

      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.$id]);

  const TABS = [
    { id: "saved", label: "Saved", icon: <FaBookmark />, data: savedPosts },
    { id: "liked", label: "Liked", icon: <FaHeart />, data: likedPosts },
  ];

  const displayedPosts =
    TABS.find((tab) => tab.id === activeTab)?.data || [];

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl overflow-hidden bg-slate-800 text-white text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/path-to-pattern.svg')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.$id}`}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white/50 shadow-xl mb-4 bg-slate-700"
            />
            <h1 className="text-4xl font-extrabold tracking-tight">
              {user.name}
            </h1>
            <p className="text-blue-200 mt-2 max-w-lg">
              {user.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around my-8 bg-white p-2 rounded-xl shadow-md sticky top-4 z-20">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 flex items-center max-w-140 justify-center gap-2 px-4 py-3 font-bold text-sm rounded-lg transition-colors duration-300 ${activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-100"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
              <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full">
                {tab.data.length}
              </span>
            </button>
          ))}
        </div>

        {/* Posts Section */}
        <div className="p-4 sm:p-0">
          {loading ? (
            <div className="text-center text-slate-500 py-20"><Loader /></div>
          ) : displayedPosts.length > 0 ? (
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post) => (
                <PostCard key={post.$id} {...post.slug} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<FaRegFrown />}
              message={`No ${activeTab} posts yet`}
              details="When you save or like posts, they will appear here."
            />
          )}
        </div>
      </div>
    </div>
  );
}
