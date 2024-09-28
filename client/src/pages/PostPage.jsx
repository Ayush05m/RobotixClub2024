import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { Spinner} from 'flowbite-react';

import { getAllPosts, getPost } from '../api/postApi';

import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
    const {postId} = useParams();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [post,setPost] = useState(null);
    const [recentPosts,setRecentPost] = useState(null);
    
    
    useEffect(() => {
      getAllPosts()
          .then((response) => setRecentPost(response.data))
          .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
      getPost(postId)
          .then((response) => {
            setPost(response.data);
            setError(false);
            setLoading(false);
          })
          .catch((e) => {
            setError(true);
            setLoading(false);
            console.log(e);
          });
    }, []);

  if(loading) return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner size = 'xl'></Spinner>
    </div>
  )
  
  return (
    <main className="p-4 flex flex-col max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 bg-yellow-500 rounded-lg text-center lg:text-5xl text-gray-900">
        {post && post.title}
      </h1>

      <div className="self-center mt-6">
        <button
          type="button"
          className="text-gray-900 bg-yellow-500 border border-black focus:outline-none hover:bg-yellow-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-6 py-3"
        >
          {post && post.category}
        </button>
      </div>

      <img
        src={post && post.imageUrl}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full max-w-7xl self-center object-cover rounded-lg shadow-md"
      />

      <div className="flex justify-end p-4 border-b border-slate-500 mx-auto w-full max-w-7xl text-xs text-yellow-500">
        <span>
          {post && new Date(post.updatedAt).toLocaleDateString()} -{" "}
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-4 text-lg leading-relaxed text-white"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center my-8">
        <h1 className="text-xl mt-5 text-yellow-500">Recents</h1>
        <div className="flex flex-wrap mt-5 max-w-7xl justify-center">
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
        </div>
      </div>
    </main>
  )
}