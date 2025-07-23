import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Pencil } from "lucide-react";
import Lottie from 'lottie-react'
import RightImage from '../../assets/Loading 40 _ Paperplane.json'
import { useForm } from 'react-hook-form'
import Input from "../utils/Input";
import { RTE, Select } from '../index'
import postService from "../../appwrite/PostService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState('');

  const { handleSubmit, watch, control, setValue, getValues, reset, register } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'publish',
      slug: post?.slug || '',
    }
  })

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        content: post.content || "",
        slug: post.slug || "",
        status: post.status || "publish",
      });
      if (post.featuredImage) {
        setImagePreview(post.featuredImage);
      }
    }
  }, [post, reset]);


  const submit = async (data) => {
    console.log('Post form ::', data);
    if (post) {
      const file = data.file[0] ? await postService.uploadFile(data.file[0]) : null;

      if (file) {
        await postService.deletePost(post.featuredImage);
      }
      else {
        data.featuredImage = post.featuredImage;
      }

      const dbpost = await postService.updatePost({
        ...data,
        featuredImage: file ? file.$id : undefined,
        slug: post.$id
      });
      if (post) {
        navigate(`/post/${dbpost.$id}`)
      }
    }
    else {
      const file = data?.file[0];
      const fileId = await postService.uploadFile(file);
      console.log("fileId:", fileId);
      if (fileId) {
        data.featuredImage = fileId.$id;
        data.userName = userData.name;
        data.userId = userData.$id;
        console.log("post form final data ::", data);
        setImagePreview(fileId)
        const post = await postService.createPost(data);
        if (post) {
          navigate(`/post/${data.slug}`)
        }
      }
    }

  }

  const slugTransform = useCallback((slug) => {
    if (slug && typeof slug === 'string') {
      return slug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    return "";
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])

  return (
    <div className="max-w-full mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-3 border border-gray-200">
      <motion.form
        onSubmit={handleSubmit(submit)}
        className="bg-white shadow-xl p-6 rounded-2xl space-y-6 w-full border border-gray-200 col-span-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <Input
            type="text"
            // className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="title..."
            {...register('title', {
              required: true
            })}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <Input
            type="text"
            // className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 text-gray-600"
            {...register('slug', {
              required: !post
            })}
          />
        </div>

        {/* Editor Placeholder */}
        <div>
          <label className="text-sm font-medium text-gray-700">Content</label>
          <div className="mt-2 min-h-[150px] border border-gray-300 rounded-xl overflow-hidden text-gray-600 bg-gray-50">
            <RTE
              name='content'
              control={control}
              defaultValues={getValues('content')}
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Image</label>
          <div className="flex flex-col justify-self-start gap-4">
            <label className="cursor-pointer flex max-w-xs text-center justify-self-start gap-2 text-blue-600 hover:text-blue-800 transition">
              <Upload size={30} />
              <span>Select File</span>
              <Input
                type="file"
                accept="image/*"
                {...register('file', {
                  required: !post
                })}
              />
            </label>
            {imagePreview && (
              <img
                src={postService.getFile(imagePreview)}
                alt="preview"
                className="max-w-full max-h-screen rounded-xl object-cover border"
              />
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mb-10">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <Select
            // className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
            // value={status}
            label='Status'
            options={["draft", 'publish']}
            defaultV='publish'
            {...register('status', {
              required: true
            })}
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-lg transition
          ${post
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {post ? (
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


