import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { addPost } from './postSlice';
import { useDispatch } from 'react-redux';
import { PostsList } from './PostsList';

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch =  useDispatch();

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const createNewPost = () => {
    if (title && content){
        dispatch(
            addPost({
                id: nanoid(),
                title,
                content
            })
        )
        setTitle("")
        setContent("")
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={createNewPost}>Save Post</button>
      </form>
      <PostsList/>
    </section>
  )
}