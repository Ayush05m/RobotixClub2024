import React from 'react'
import { useState, useEffect } from 'react'
import { createPost, getPost, updatePost, deletePost, getAllPosts } from '../../api/postApi';
import PostForm from '../Posts/PostForm';
import PostList from "../Posts/PostList"

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);

    useEffect(() => {
        getAllPosts()
            .then((response) => setPosts(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleCreatePost = (postData) => {
        createPost(postData)
            .then((response) => setPosts([response.data, ...posts]))
            .catch((error) => console.log(error));
    };

    const handleUpdatePost = (postId, updatedPost) => {
        updatePost(postId, updatedPost)
            .then((response) => setPosts(posts.map((post) => post.id === postId ? response.data : post)))
            .catch((error) => console.log(error));
    };

    const handleDeletePost = (postId) => {
        deletePost(postId)
            .then(() => setPosts(posts.filter((post) => post.id !== postId)))
            .catch((error) => console.log(error));
    };

    const handleCreatePostClick = () => {
        setShowPostForm(true);
    }

    return (
        <div className='blogs'>
            <h1>Blog Application</h1>
            {posts.map((d) => {
                console.log(d)
            })}

            <div className="postBlog"></div>
            { !showPostForm && <button onClick = {handleCreatePostClick}>CREATE YOUR BLOG</button>}
            { showPostForm &&  <PostForm createPost={handleCreatePost} /> }
            <PostList posts={posts} updatePost={handleUpdatePost} deletePost={handleDeletePost} />
        </div>
    );
}
