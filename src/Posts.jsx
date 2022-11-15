import "./styles.css";
import NewPost from "./components/newPost";
import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { GET_CURRENT_USER, ALL_POSTS } from "./utils/Queries";
import { DELETE_POST, LIKE_POST } from "./utils/Mutations";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: ALL_POSTS }],
  });
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: ALL_POSTS }],
  });

  const {
    data: currentUserData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(ALL_POSTS, { fetchPolicy: "network-only" });

  // return user & post data
  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.getCurrentUser);
      // set current user to local and session storage
      const storage = localStorage && sessionStorage;
      if (storage && !storage.getItem("currentUser")) {
        localStorage.setItem("currentUser", JSON.stringify(currentUserData.getCurrentUser));
        sessionStorage.setItem("currentUser", JSON.stringify(currentUserData.getCurrentUser));
      }
    }
    if (postsData) {
      setPosts(postsData.getAllPosts);
    }
  }, [currentUserData, postsData]);

  if (postsLoading && userLoading)
    return (
      <img
        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
        alt="loading"
        className="loader"
        width={100}
      />
    );
  if (postsError && userError)
    return (
      <h4>
        {postsError.message} | {userError.message}
      </h4>
    );

  // if current user matches post user, show delete button
  const checkUser = (post) => {
    const handleDelete = () => {
      deletePost({ variables: { id: post.id } });
    };

    if (post.postedBy.handle === currentUser.handle) {
      return (
        <button className="delete" onClick={handleDelete}>
          X
        </button>
      );
    }
  };

  // like the post
  const checkLike = (post) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const handleLike = () => {
      likePost({ variables: { id: post.id, token } });
    };

    if (post.likedBy.find((user) => user.handle === currentUser.handle)) {
      return (
        <button className="like" onClick={handleLike}>
           ❤️
        </button>
      );
    } else {
      return (
        <button className="like" onClick={handleLike}>
           🤍
        </button>
      );
    }
  };

  return (
    <div className="Posts">
      <NewPost />

      <div>
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <div className="post" key={post.id}>
              <div className="left">
                <img
                  className="profPic"
                  src={
                    post.postedBy.profilePicture ||
                    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  }
                  width="40px"
                  alt={post.postedBy.username}
                />
              </div>
              <div className="right">
                {checkUser(post)}
                <span className="handle">
                  {post.postedBy.username} |{" "}
                  <span className="handlena">{post.postedBy.handle}</span>
                  &nbsp;*{" "}
                  <span className="date">
                    {new Date(post.createdAt).toLocaleString("fr-FR")}
                  </span>
                </span>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <img
                  src={post.postImage}
                  className="postImage"
                  alt={post.title ? "" : null}
                />
                <br />
                <div className="likes">
                  {post.likedBy.length} {checkLike(post)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
