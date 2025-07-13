import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Pencil } from "lucide-react";
import Lottie  from 'lottie-react'
import RightImage from '../../assets/Loading 40 _ Paperplane.json'
import {useForm} from 'react-hook-form'

export default function PostForm({post}) {
  
    const {handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues:{
            title: post.title || '',
            content: post.content || '',
            status: post.status || '',
            slug: post.slug || 'active',
        }
    })

    const submit = () => {
        if(post){

        }
        else{

        }

    }

  return (
     <div className="max-w-4xl mx-auto mt-10 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-3 border border-gray-200">
    <motion.form
      onSubmit={handleSubmit(submit)}
      className="bg-white shadow-xl p-6 rounded-3xl space-y-6 w-full border border-gray-200 col-span-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Title */}
      <div>
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write an engaging title..."
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 text-gray-600"
          value={slug}
          readOnly
        />
      </div>

      {/* Editor Placeholder */}
      <div>
        <label className="text-sm font-medium text-gray-700">Content</label>
        <div className="mt-2 min-h-[150px] border border-gray-300 rounded-xl p-4 text-gray-600 bg-gray-50">
          {/* Replace with real editor like ReactQuill or TipTap */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story or experience here..."
            rows={6}
            className="w-full bg-transparent resize-none outline-none"
          />
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Image</label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
            <Upload size={20} />
            <span>Select File</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-16 h-16 rounded-xl object-cover border"
            />
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-lg transition
          ${
            isUpdate
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isUpdate ? (
          <>
            <CheckCircle2 className="w-5 h-5" /> Update Post
          </>
        ) : (
          <>
            <Pencil className="w-5 h-5" /> Create Post
          </>
        )}
      </motion.button>
    </motion.form>
    <div className="bg-gray-100 p-6 flex items-center justify-center">
        <div className="w-48">
          <Lottie animationData={RightImage} loop autoplay />
        </div>
      </div>
    </div>
  );
}


