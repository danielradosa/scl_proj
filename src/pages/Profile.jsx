import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ReactComponent as Location } from "../components/icons/location.svg";
import { ReactComponent as Weblink } from "../components/icons/weblink.svg";
import { GET_USER_POSTS, GET_CURRENT_USER } from "../utils/Queries";
import { DELETE_POST, LIKE_POST, TOGGLE_ARTIST } from "../utils/Mutations";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );

  const { userHandle } = useParams();


  useEffect(() => {
    console.log(userHandle)
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: { handle: user.handle },
  });
  const { data: userData, refetch: userDataRefetch } = useQuery(GET_CURRENT_USER);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [
      { query: GET_USER_POSTS, variables: { handle: user.handle } },
    ],
  });
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [
      { query: GET_USER_POSTS, variables: { handle: user.handle } },
    ],
  });
  const [toggleArtist] = useMutation(TOGGLE_ARTIST, {
    refetchQueries: [
      { query: GET_CURRENT_USER, variables: { handle: user.handle } },
    ],
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;

  const posts = data.getAllPostsByUser;
  refetch();

  // if current user matches post user, show delete button
  const checkUser = (post) => {
    if (post.postedBy.handle === user.handle) {
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

    if (post.likedBy.find((user) => user.handle === user.handle)) {
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
    const handleArtist = () => {
      toggleArtist({ variables: { id: user.id } }, refetch());
    };

    if (user.artist === true && userData.getCurrentUser.artist === true) {
      return (
        <input type="checkbox" defaultChecked onClick={handleArtist} />
      );
    } else {
      return <input type="checkbox" onClick={handleArtist} />;
    }
  };

  return (
    <div className="mt-8 float-left">
      <div className=" bg-white profile rounded-lg shadow-lg p-6">
        <div className="flex">
          <div className="float-left flex">
            <img
              src={user.profilePicture}
              alt="profile"
              width={96}
              className="rounded-lg"
            />
            <h2 className="text-slate-700 text-xl ml-4">
              {user.username} <br />
              <span className="text-slate-500 text-lg">{user.handle}</span>
            </h2>
          </div>
          <div className="float-right flex">
            <h3 className="text-black text-md flex mr-4">
              <Location />{/*  {user.bio.location} */}
            </h3>
            <h3 className="text-black text-md flex">
              <Weblink />
              {/*               <a href={user.bio.website} target={"_blank"}>
                {user.bio.website.slice(8)}
              </a> */}
            </h3>
          </div>
        </div>

        <div>
          {/*           <p className="text-slate-700 text-xl mt-6 ml-4">{user.bio.body}</p>
 */}          <div className="toggle ml-4 text-sm mt-2">
            Want to be discoverable as artist? Flip the switch{" "}
            <label className="switch ml-1">
              {checkArtist()}
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="flex">
          <h3 className="text-slate-700 text-md mt-6 ml-4">
            Followers
            <div className="flex font-bold">{user.followers.length}</div>
          </h3>

          <h3 className="text-slate-700 text-md mt-6 ml-4">
            Following
            <div className="flex font-bold">{user.following.length}</div>
          </h3>
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
                    {user.username} |{" "}
                    <span className="handlena">{user.handle}</span>
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
