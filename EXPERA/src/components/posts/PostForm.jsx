import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Pencil } from "lucide-react";
import Lottie  from 'lottie-react'
import RightImage from '../../assets/Loading 40 _ Paperplane.json'
import {useForm} from 'react-hook-form'
import Input from "../utils/Input";
import RTE from '../index'
import Select from "../index";
import postService from "../../appwrite/PostService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({post}) {
  
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState('');

    const {handleSubmit, watch, control, setValue, getValues, register} = useForm({
        defaultValues:{
            title: post.title || '',
            content: post.content || '',
            status: post.status || '',
            slug: post.slug || 'active',
        }
    })

    const submit = async(data) => {
      console.log('Post form ::', data);
        if(post){
          const file = data?.file[0];

          if(file){
            const fileId = await postService.uploadFile(file);
            
            if(fileId){
              data.featuredImage = fileId;
              setImagePreview(fileId)
              const post = await postService.updatePost(data)
              if(post){
                navigate(`/post/${slug}`)
              }
            }
          }
        }
        else{
            const file = data?.file[0];
            const fileId = await postService.uploadFile(file);

            if(fileId){
              data.featuredImage = fileId;
              data.userName = userData.Name
              setImagePreview(fileId)
              const post = await postService.createPost(data);
              if(post){
                navigate(`/post/${slug}`)
              }
            }
        }

    }

    const slugTransform = (slug) => {
        if(slug){
          return slug
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')            
          .replace(/-+/g, '-')              
          .replace(/^-+|-+$/g, '');           
        }
        return "";
    }

    useEffect(() => {
        const subscription = watch((value, {name}) => {
              if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
              }
        })

        return () => {
          subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

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
        <Input
          type="text"
          // className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={title}
          placeholder="title..."
          {...required('title',{
            required:true
          })}
        />
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm font-medium text-gray-700">Slug</label>
        <Input
          type="text"
          // className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 text-gray-600"
          value={slug}
          {...register('slug',{
            required:true
          })}
        />
      </div>

      {/* Editor Placeholder */}
      <div>
        <label className="text-sm font-medium text-gray-700">Content</label>
        <div className="mt-2 min-h-[150px] border border-gray-300 rounded-xl p-4 text-gray-600 bg-gray-50">
          {/* Replace with real editor like ReactQuill or TipTap */}
          <RTE
          name = 'content'
          label = 'Content'
          control = {control}
          defaultValues = {getValues('content')}
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
            <Input
              type="file"
              accept="image/*"
              {...register('file', {
                required:!post
              })}
            />
          </label>
          {imagePreview && (
            <img
              src={postService.getFile(imagePreview)}
              alt="preview"
              className="w-16 h-16 rounded-xl object-cover border"
            />
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-gray-700">Status</label>
        <Select
          // className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
          // value={status}
          label = 'Status'
          options = {["draft", 'published']}
          default = 'published'
          {...register('status',{
            required:true
          })}
        />
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


