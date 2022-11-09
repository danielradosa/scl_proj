import "./styles.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from 'react';
import NewPost from "./components/newPost";

const GET_CURRENT_USER = gql`
 {
    getCurrentUser(token: "${localStorage.getItem('token') || sessionStorage.getItem('token')}") {
      id
      handle
      profilePicture
    }
  }
`;

const ALL_POSTS = gql`
{
    getAllPosts {
      id
      title
      content
      postImage
      postedBy {
        id
        username
        profilePicture
        handle
      }
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePostById($id: ID!) {
    deletePostById(id: $id) {
      id
    }
  }
`;

export default function Posts() {
  const { data: postsData, loading: postsLoading, error: postsError, refetch } = useQuery(ALL_POSTS);
  const { data: currentUserData, loading: userLoading, error: userError } = useQuery(GET_CURRENT_USER);

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deletePost] = useMutation(DELETE_POST);

  // set handle to local and session storage
  useEffect(() => {
    const storage = localStorage && sessionStorage;
    if (currentUser) {
      storage.setItem('user', currentUser);
      storage.setItem('currentUserHandle', currentUser.handle);
    }
  }, [currentUser]);

  // return user data
  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData.getCurrentUser);
    }
    if (postsData) {
      setPosts(postsData.getAllPosts);
    }
  }, [currentUserData, postsData]);

  // refetch posts every second
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (postsLoading && userLoading) return <img src="https://miro.medium.com/max/1400/1*e_Loq49BI4WmN7o9ItTADg.gif" alt="loading" className="loader" />;
  if (postsError && userError) return <h4>{postsError.message} | {userError.message}</h4>;

  // if current user matches post user, show delete button
  const checkUser = (post) => {
    const handleDelete = () => {
      deletePost({ variables: { id: post.id } });
    };

    if (currentUser.handle === post.postedBy?.handle) {
      return (
        <button className="delete" onClick={handleDelete}>X</button>
      )
    }
  };

  return (
    <div className="Posts">
      <NewPost />

      <div>
        {posts.slice(0).reverse().map((post) => (
          <div className="post" key={post.id}>
            <div className="left">
              <img
                className="profPic"
                src={post.postedBy.profilePicture || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                width="40px"
                alt={post.postedBy.username}
              />
            </div>
            <div className="right">
              {checkUser(post)}
              <span className="handle">
                {post.postedBy.username} |{" "}
                <span className="handlena">{post.postedBy.handle}</span>
                &nbsp;* <span className="date">{ new Date(post.createdAt).toLocaleString("fr-FR") }</span>
              </span>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <img
                src={post.postImage}
                className="postImage"
                alt={post.title ? "" : null}
              />
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
