import "../styles.css";
import React, { useCallback } from 'react';
import moment from "moment";
import { useMutation, gql } from "@apollo/client";

const ADD_POST = gql`
  mutation createPost($title: String!, $content: String!, $postedBy: String!, $createdAt: String!) {
    createPost(title: $title, content: $content, postedBy: $postedBy, createdAt: $createdAt) {
      id
      title
      content
      postedBy {
        id
      }
      createdAt
    }
  }
`;

export default function NewPost() {
  const [addPost] = useMutation(ADD_POST);
  const profPic = localStorage.getItem("profilePicture") || sessionStorage.getItem("profilePicture");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const content = e.target.content.value;
      const postedBy = localStorage.getItem("handle") || sessionStorage.getItem("handle");
      const createdAt = moment().format('MM-DD-YYYY hh:mm a');
      addPost({ variables: { title, content, postedBy, createdAt } });

      // clear form
      e.target.title.value = "";
      e.target.content.value = "";
    },
    [addPost],
  );

  return (
    <div className="newPost">
      <form onSubmit={handleSubmit}>
        <h2>Create new post</h2>
        <input type="text" placeholder="Title" name="title" maxLength={32} /> <span className="req"> * not required</span> <br />
        <div className="posting">
          <img src={profPic} alt="prof_pic" width="80px" height="80" />
          <textarea name="content" rows="5" cols="33" placeholder="What's happening?" maxLength={280}></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
