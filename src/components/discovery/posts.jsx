import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { MOST_LIKED_POSTS } from "../../utils/Queries";

const PostsDiscovery = () => {
  const limit = 1;
  const [offset, setOffset] = React.useState(0);

  const nextPage = () => {
    setOffset(offset + limit);
  };

  const previousPage = () => {
    if (offset - limit < 0) {
      return;
    }
    setOffset(offset - limit);
  };

  const { loading, error, data, refetch } = useQuery(MOST_LIKED_POSTS, {
    variables: { limit: limit, offset: offset },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  refetch();

  return (
    <>
      {data.getMostLikedPosts.map((post) => {
        return (
          <div
            key={post.id}
            className="flex flex-row items-center bg-black w-1/2 h-40 text-white mb-6 rounded-lg shadow-lg p-4"
          >
            <img
              className="w-[44px] h-16 rounded-full"
              src={post.postedBy.profilePicture}
              alt="Profile Picture"
            />
            <div>
              <span className="text-orange-400">{post.title}</span>
              <br />
              <span className="text-white">{post.content}</span>
              <img src={post.postImage || ""} alt={""} />
            </div>
            <div>Likes: {post.likedBy.length}</div>
            <div className="ml-4">
              <div className="text-2xl text-white">
                {post.postedBy.username}
              </div>
              <div className="text-lg text-white">{post.postedBy.handle}</div>
              <div>
                <button className="text-white border-2 pl-2 pr-2 mt-4 rounded-lg bg-black">
                  <a href={`/profile/` + post.postedBy.handle}>View profile</a>
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => nextPage()}
        className="text-black border-2 rounded-lg h-10"
      >
        Next
      </button>
      <button
        onClick={() => previousPage()}
        className="text-black border-2 rounded-lg mt-4 h-10"
      >
        Previous
      </button>
    </>
  );
};

export { PostsDiscovery };
