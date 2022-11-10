import "../styles.css";
import React, { useCallback } from 'react';
import moment from "moment";
import { useMutation, gql } from "@apollo/client";

const ADD_POST = gql`
  mutation createPost($title: String!, $content: String!, $postedBy: String!, $createdAt: String!, $postImage: String!) {
    createPost(title: $title, content: $content, postedBy: $postedBy, createdAt: $createdAt, postImage: $postImage) {
      id
      title
      content
      postImage
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

  const createPost = useCallback(async (e) => {
    e.preventDefault();

    // post image to cloudinary
    const file = e.target.elements.image.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dggdcatjy");

    const res = await fetch("https://api.cloudinary.com/v1_1/dggdcatjy/image/upload", {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    const image = (fileData.secure_url);

    // create post
    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;
    const postedBy = localStorage.getItem("currentUserHandle") || sessionStorage.getItem("currentUserHandle");
    const createdAt = moment().format("MM-DD-YYYY hh:mm a");
    const postImage = image;

    // add post without image if no image is selected
    if (!file || !image) {
      addPost({
        variables: {
          title,
          content,
          postedBy,
          createdAt,
          postImage: "",
        },
      });
    } else {
      await addPost({
        variables: {
          title,
          content,
          postedBy,
          createdAt,
          postImage
        },
      });
    }

    // clear form
    e.target.elements.title.value = "";
    e.target.elements.content.value = "";
    e.target.elements.image.value = "";
  }, [addPost]);

  return (
    <div className="newPost">
      <form onSubmit={createPost}>
        <h2>Create new post</h2>
        <input type="text" placeholder="Title" name="title" maxLength={32} /> <span className="req"> * not required</span> <br />
        <div className="posting">
          <img src={profPic} alt="prof_pic" width="80px" height="80" />
          <textarea name="content" rows="5" cols="33" placeholder="What's happening?" maxLength={280}></textarea>
        </div>
        <div className="uploadImage">
          <input type="file" name="image" id="image" accept="image/*" />
          <label htmlFor="image">Upload image</label>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
