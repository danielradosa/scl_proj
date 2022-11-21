import React from "react";


export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );


  return (
    <div className="mt-8">
      <div className=" bg-white profile rounded-lg shadow-lg p-6">
        <img
          src={
            user.profilePicture ||
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
          }
          width="60px"
          className="rounded-lg"
        />
        <h5>Username: {user.username}</h5>
        <h5>Email: {user.email}</h5>
        <h5>Handle: {user.handle}</h5>
        <blockquote>
          <h6>Followers: {user.followers}</h6>
          <h6>Followers: {user.following}</h6>
        </blockquote>
      </div>
    </div>
  )
}
