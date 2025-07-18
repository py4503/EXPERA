import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, X, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import postService from '../appwrite/PostService'; // Assuming this path is correct
import parse from 'html-react-parser';
import { Container } from '../components';

// Confirmation
const ConfirmationModal = ({ onConfirm, onCancel, isOpen }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-gray-800">Confirm Deletion</h2>
                            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <p className="mt-4 text-gray-600">Are you sure you want to delete this post? This action cannot be undone.</p>
                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                onClick={onCancel}
                                className="px-6 py-2 rounded-full font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-2 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Post
export default function Post() {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Fetch post data and check for authorship
    useEffect(() => {
        if (slug) {
            postService.getSinglePost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                    if (userData && fetchedPost.userId === userData.$id) {
                        setIsAuthor(true);
                    }
                } else {
                    navigate('/all-posts');
                }
            });
        }
    }, [slug, userData, navigate]);

    const deletePost = () => {
        if (post) {
            postService.deletePost(post.$id);
            setDeleteModalOpen(false);
            navigate('/');
        }
    };

    // Render a loading state or null while the post is being fetched
    if (!post) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-xl font-semibold text-gray-700">Loading Post...</div>
            </div>
        );
    }

    return (
      <div className='px-2'>
        <div className="bg-gray-50 min-h-screen font-sans">
            <main>
                {/* --- Hero Section --- */}
                <motion.div 
                    className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src={postService.getFile(post.featuredImage)}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-end p-6 md:p-12">
                        <motion.h1 
                            className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl drop-shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        >
                            {post.title}
                        </motion.h1>
                    </div>
                </motion.div>

                {/* --- Post Meta & Content --- */}
                <div className="container mx-auto -mt-24 md:-mt-32 relative z-10 px-4 pb-16">
                    <motion.div 
                        className="bg-white rounded-2xl shadow-2xl p-6 md:p-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                    >
                        {/* --- Author & Actions --- */}
                        <div className="flex flex-wrap justify-between items-center gap-6 border-b border-gray-200 pb-6">
                            <div className="flex items-center space-x-4">
                                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${post.$id}`} alt={post.userName} className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"/>
                                <div>
                                    <p className="font-bold text-lg text-gray-800">{post.userName}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(post.$createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {isAuthor && (
                                    <>
                                        <Link to={`/edit-post/${post.$id}`} className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                                            <Edit size={16} />
                                            <span>Edit</span>
                                        </Link>
                                        <button onClick={() => setDeleteModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition-all duration-300 transform hover:scale-105">
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </button>
                                        <div className="h-6 w-px bg-gray-200"></div>
                                    </>
                                )}
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"><Twitter size={18} /></button>
                                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"><Facebook size={18} /></button>
                                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"><Linkedin size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {/* --- Post Content --- */}
                        <article className="prose lg:prose-xl max-w-none mt-8 text-gray-700 prose-headings:font-bold prose-h2:text-gray-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-xl prose-img:shadow-lg">
                            {parse(post.content)}
                        </article>
                    </motion.div>
                </div>
            </main>

            {/* --- Confirmation Modal --- */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onConfirm={deletePost}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </div>
        </div>
    );
}

