import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ReactComponent as Location } from "../components/icons/location.svg";
import { ReactComponent as Weblink } from "../components/icons/weblink.svg";
import { ALL_USERS, GET_USER_POSTS, GET_CURRENT_USER } from "../utils/Queries";
import {
  DELETE_POST,
  LIKE_POST,
  TOGGLE_ARTIST,
  FOLLOW_UNFOLOW_USER,
} from "../utils/Mutations";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";

export default function Profile() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );

  // save user bio to variable or set to empty string
  const userBio = currentUser.bio ? currentUser.bio : { website: "", location: "", body: "" };

  const { userHandle } = useParams();
  const userHandleToQuery = userHandle != null ? userHandle : currentUser.handle;
  const allUsers = useQuery(ALL_USERS);
  const userData =
    !allUsers.loading && !allUsers.error
      ? allUsers.data.getAllUsers.find((e) => e.handle === userHandleToQuery)
      : undefined;
  const { loading, error, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: { handle: userData?.handle },
    skip: userData == null,
  });

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [
      { query: GET_USER_POSTS, variables: { handle: userData?.handle } },
    ],
  });
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [
      { query: GET_USER_POSTS, variables: { handle: userData?.handle } },
    ],
  });
  const [toggleArtist] = useMutation(TOGGLE_ARTIST, {
    refetchQueries: [
      { query: GET_CURRENT_USER, variables: { handle: userData?.handle } },
    ],
  });
  const [followUnfollowUser] = useMutation(FOLLOW_UNFOLOW_USER, {
    refetchQueries: [
      { query: GET_CURRENT_USER, variables: { handle: userData?.handle } },
      { query: ALL_USERS },
    ],
  });

  if (allUsers.loading || loading) return <Spinner />;
  if (error) return <p>Error : {error}</p>;

  const posts = data.getAllPostsByUser;

  // if current user matches post user, show delete button
  const checkUser = (post) => {
    if (post.postedBy.handle === currentUser.handle) {
      return (
        <button
          className="delete"
          onClick={() => {
            deletePost({ variables: { id: post.id } });
          }}
        >
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

    if (post.likedBy.find((like) => like.handle === currentUser.handle)) {
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

  // handle artist toggle
  const checkArtist = () => {
    // Toggle should only work if the user is the current user
    if (userData?.handle !== currentUser.handle) return null;

    const handleArtist = () => {
      toggleArtist({ variables: { id: currentUser.id }}, refetch());
    };

    if (currentUser.artist === true && userData?.artist === true) {
      return <input type="checkbox" defaultChecked onClick={handleArtist} />;
    } else {
      return <input type="checkbox" onClick={handleArtist} />;
    }
  };

  // check following
  const checkFollow = () => {
    // Follow/Unfollow should only work if the user is not the current user
    if (userData?.handle === currentUser.handle) return null;

    const handleFollow = () => {
      followUnfollowUser({variables: { id: currentUser.id, handle: userData?.handle }}, refetch());
    };

    // if current user is not the user being viewed
    if (currentUser.handle !== userData?.handle && userData?.handle != null) {
      // if current user is not following user being viewed
      if (currentUser.following.find((user) => user.handle === userData?.handle)) {
        return <button className="mt-8 rounded-lg border-2 pr-4 pl-4 text-white bg-black h-8 ml-12" onClick={handleFollow}>Follow</button>;
      } else {
        return <button className="mt-8 rounded-lg border-2 pr-4 pl-4 text-black border-black h-8 ml-12" onClick={handleFollow} >Unfollow</button>;
      }
    }
  };

  refetch();

  return (
    <div className="mt-8 float-left posts">
      <div className=" bg-white profile rounded-lg shadow-lg p-6">
        <div className="flex">
          <div className="float-left flex">
            <img
              src={userData.profilePicture}
              alt="profile"
              width={96}
              className="rounded-lg"
            />
            <h2 className="text-slate-700 text-xl ml-4">
              {userData.username} <br />
              <span className="text-slate-500 text-lg">{userData.handle}</span>
            </h2>
          </div>
          <div className="float-right flex">
            <h3 className="text-black text-md flex mr-4">
              <Location />
              {userBio.location || "No location"}
            </h3>
            <h3 className="text-black text-md flex">
              <Weblink />
              <a href={userBio.website || "No link"} target={"_blank"}>
                {userBio.website || "No link"}
              </a>
            </h3>
          </div>
        </div>

        <div>
          <p className="text-slate-700 text-xl mt-6 ml-4">{userBio.body || "User has no bio info"}</p>{" "}
          {userData?.handle === currentUser.handle ? (
            <div className="toggle ml-4 text-sm mt-2">
              Want to be discoverable as artist? Flip the switch{" "}
              <label className="switch ml-1">
                {checkArtist()}
                <span className="slider round"></span>
              </label>
            </div>
          ) : null}
        </div>

        <div className="flex">
          <h3 className="text-slate-700 text-md mt-6 ml-4">
            Followers
            <div className="flex font-bold">{userData.followers.length}</div>
          </h3>

          <h3 className="text-slate-700 text-md mt-6 ml-4">
            Following
            <div className="flex font-bold">{userData.following.length}</div>
          </h3>

          {checkFollow()}
        </div>
      </div>

      <div className="mt-4">
        <div className="mt-8">
          {posts
            .slice(0)
            .reverse()
            .map((post) => (
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
                    {userData.username} |{" "}
                    <span className="handlena">{userData.handle}</span>
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
    </div>
  );
}
