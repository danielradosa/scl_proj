import React from "react";
import { ReactComponent as Location } from "../components/icons/location.svg";
import { ReactComponent as Weblink } from "../components/icons/weblink.svg";

export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );

  const posts = user.posts;

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
              <Location /> {user.bio.location}
            </h3>
            <h3 className="text-black text-md flex">
              <Weblink />
              <a href={user.bio.website} target={"_blank"}>
                {user.bio.website.slice(8)}
              </a>
            </h3>
          </div>
        </div>

        <div>
          <p className="text-slate-700 text-xl mt-6 ml-4">{user.bio.body}</p>
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
        <div className="mt-8 ml-10">
          {"All user posts here"}
        </div>
      </div>
    </div>
  );
}
