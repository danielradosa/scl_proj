import "../styles.css";
import NewPost from "../components/newPost";
import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { GET_CURRENT_USER, ALL_POSTS } from "../utils/Queries";
import { DELETE_POST, LIKE_POST } from "../utils/Mutations";
import { Spinner } from "../components/Spinner";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [ALL_POSTS],
    fetchPolicy: "network-only",
  });
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [ALL_POSTS],
    fetchPolicy: "network-only",
  });

  const {
    data: currentUserData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_CURRENT_USER);
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore,
  } = useQuery(ALL_POSTS, {
    variables: { limit: 5 },
  });

  // return user & post data and refetch functions to parent component
  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.getCurrentUser);
    }
    if (postsData) {
      setPosts(postsData.getAllPosts);
    }
  }, [currentUserData, postsData]);

  if (postsLoading || userLoading) return <Spinner width={100} />;
  if (postsError || userError)
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

  // show button to refetch posts
  const refetchPosts = () => {
    fetchMore({
      variables: {
        offset: 0,
      },
    }).then((res) => {
      setPosts(res.data.getAllPosts);
    });
  };

  return (
    <div className="posts mt-0 ml-[350px]">
      <NewPost />

      <button
        className="border-2 pl-4 pr-4 mt-8 rounded-lg text-black pt-1 pb-1 bg-white hover:bg-black/10 hover:border-white"
        onClick={refetchPosts}
      >
        Show latest
      </button>
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
                  <a
                    href={`/profile/${post.postedBy.handle}`}
                    className="text-gray-800"
                  >
                    {post.postedBy.handle}
                  </a>
                </span>
                &nbsp;*{" "}
                <span className="date">
                  {new Date(post.createdAt).toLocaleString()}
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
