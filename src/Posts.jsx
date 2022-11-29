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
    refetch: userRefetch,
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "network-only" });
  // posts query with limit offset and refetch
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    refetch: postsRefetch,
    fetchMore,
  } = useQuery(ALL_POSTS, {
    fetchPolicy: "network-only",
    variables: { limit: 5 },
  });

  
  // refetch user and posts every second
  useEffect(() => {
    const interval = setInterval(() => {
      userRefetch();
      postsRefetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [userRefetch, postsRefetch]);

  // return user & post data
  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.getCurrentUser);
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
          Remove
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
          🧡
        </button>
      );
    } else {
      return (
        <button className="like" onClick={handleLike}>
          🖤
        </button>
      );
    }
  };

  // load more older posts
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMore({
        variables: {
          offset: posts.length,
        },
      }).then((res) => {
        setPosts([...posts, ...res.data.getAllPosts]);
      });
    }
  };

  return (
    <div className="posts mt-0">
      <NewPost />

      <div className="mt-2">
        {posts.map((post) => (
          <div
            className="bg-white p-6 rounded-lg shadow-lg mt-8 mb-4"
            key={post.id}
          >
            <div>
              <img
                className="rounded-lg left-0 ml-0"
                src={
                  post.postedBy.profilePicture ||
                  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }
                width="40px"
                alt={post.postedBy.username}
              />
            </div>
            <div className="mt-4">
              {checkUser(post)}
              <span className="text-slate-400">
                {post.postedBy.username} |{" "}
                <span className="handlena">
                  <a href={`/profile/${post.postedBy.handle}`} className="text-gray-800">{post.postedBy.handle}</a>
                </span>
                &nbsp;*{" "}
                <span className="date">
                  {new Date(post.createdAt).toLocaleString("fr-FR")}
                </span>
              </span>
              <h4 className="mt-2 font-bold text-xl">{post.title}</h4>
              <p className="text-slate-700 pb-4">{post.content}</p>
              <img
                src={post.postImage}
                className="rounded-lg"
                alt={post.title ? "" : null}
              />
              <br />
              <div className="text-slate-500">
                {post.likedBy.length} {checkLike(post)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
