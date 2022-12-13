import React from "react";
import { useQuery } from "@apollo/client";
import { MOST_FOLLOWED_USERS } from "../../utils/Queries";

const PeopleDiscovery = () => {
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

  const { loading, error, data, refetch } = useQuery(MOST_FOLLOWED_USERS, {
    variables: { limit: limit, offset: offset },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  refetch();

  return (
    <>
      {data.getMostFollowedUsers.map((user) => {
        return (
          <div
            key={user.id}
            className="flex flex-row items-center bg-black w-1/2 h-40 text-white mb-6 rounded-lg shadow-lg"
          >
            <img
              className="w-16 h-16 rounded-full"
              src={user.profilePicture}
              alt="Profile Picture"
            />
            <div>Followers: {user.followers.length}</div>
            <div className="ml-4">
              <div className="text-2xl text-white">{user.username}</div>
              <div className="text-lg text-white">{user.handle}</div>
              <div>
                <button className="text-white border-2 pl-2 pr-2 mt-4 rounded-lg bg-black">
                  <a href={`/profile/` + user.handle}>View profile</a>
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

export { PeopleDiscovery };
