import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  CREATE_UPDATE_PROFILE_PICTURE,
  CREATE_UPDATE_BIO
} from "../utils/Mutations";
import { GET_CURRENT_USER } from "../utils/Queries";

export default function Profile() {
  const { refetch, data: uData } = useQuery(GET_CURRENT_USER, {
    refetchQueries: [GET_CURRENT_USER],
  });

  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );

  const userBio = uData?.getCurrentUser?.bio;

  const [activeEditField, setActiveEditField] = React.useState("");

  const [username, setUsername] = React.useState(user.username || "");
  const [userEmail, setUserEmail] = React.useState(user.email || "");
  const [userWebsite, setUserWebsite] = React.useState(userBio?.website || "");
  const [userLocation, setUserLocation] = React.useState(userBio?.location || "");
  const [userBioBody, setUserBioBody] = React.useState(userBio?.body || "");

  const [updateBio] = useMutation(CREATE_UPDATE_BIO, { refetchQueries: [GET_CURRENT_USER]});
  const [updateUsername] = useMutation(UPDATE_USERNAME, { refetchQueries: [GET_CURRENT_USER]});
  const [updateEmail] = useMutation(UPDATE_EMAIL, { refetchQueries: [GET_CURRENT_USER]});

  const [createUpdateProfilePicture] = useMutation(CREATE_UPDATE_PROFILE_PICTURE, { refetchQueries: [GET_CURRENT_USER]});

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (activeEditField === "username") {
        await updateUsername({
          variables: {
            id: user.id,
            username,
            token:
              localStorage.getItem("token") || sessionStorage.getItem("token"),
          },
          refetchQueries: [GET_CURRENT_USER],
        });
      } else if (activeEditField === "email") {
        await updateEmail({
          variables: {
            id: user.id,
            email: userEmail,
            token:
              localStorage.getItem("token") || sessionStorage.getItem("token"),
          },
          refetchQueries: [GET_CURRENT_USER],
        });
      } 
      setActiveEditField("");
      window.location.reload();
    },
    [ activeEditField, username, userEmail,
      updateUsername, updateEmail,
      refetch(),
    ]
  );

  const handleImageUpload = useCallback(
    async (e) => {
      e.preventDefault();
      const file = e.target.elements.image.files[0];
      console.log(file);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dggdcatjy");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dggdcatjy/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const fileData = await res.json();
      const image = fileData.secure_url;

      await createUpdateProfilePicture({
        variables: {
          id: user.id,
          profilePicture: image,
        },
      });
      refetch();
      window.location.reload();
    },
    [createUpdateProfilePicture, refetch()]
  );

  const handleBioSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (activeEditField === "userWebsite") {
      await updateBio({ variables: { bioBy: user.id, website: userWebsite } });
    } else if (activeEditField === "userLocation") {
      await updateBio({ variables: { bioBy: user.id, location: userLocation } });
    } else if (activeEditField === "userBioBody") {
      await updateBio({ variables: { bioBy: user.id, body: userBioBody } });
    }
    setActiveEditField("");
    refetch();
  }, 
  [activeEditField, userWebsite, userLocation, userBioBody, updateBio]);

  // rewrite user data in local and sesstion storage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser"));

    if (activeEditField === "username") {
      currentUser.username = username;
    } else if (activeEditField === "email") {
      currentUser.email = userEmail;
    } else if (activeEditField === "website") {
      currentUser.bio.website = userWebsite;
    } else if (activeEditField === "location") {
      currentUser.bio.location = userLocation;
    } else if (activeEditField === "body") {
      currentUser.bio.body = userBioBody;
    }

    currentUser.profilePicture = uData?.getCurrentUser?.profilePicture;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [activeEditField, username, userEmail, refetch()]);

  return (
    <div className="overflow-hidden bg-white shadow-lg mt-8 w-1/3 float-left sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          <div className="text-sm mt-2">
            <form onSubmit={handleImageUpload} className="flex text-center">
              <label htmlFor="image" className="font-bold">Upload or change profile picture: </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="rounded-lg bg-white text-slate-400 outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
              />
              <button
                className="bg-slate-400 text-white rounded-lg px-2 py-1 ml-2"
                type="submit"
              >
                Upload
              </button>
            </form>
          </div>
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {activeEditField == "username" ? (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <form action="" className="flex">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-2 py-1 text-center"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-orange-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditField("")}
                  className="text-slate-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              onClick={() => setActiveEditField("username")}
            >
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                {username}
              </dd>
              <button
                className="sm:col-span-1 text-right"
                onClick={() => setActiveEditField("username")}
              >
                Edit
              </button>
            </div>
          )}

          {activeEditField == "email" ? (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">E-mail</dt>
              <form action="" className="flex">
                <input
                  type="email"
                  className="border border-gray-300 rounded-lg px-2 py-1 text-center"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-orange-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditField("")}
                  className="text-slate-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              onClick={() => setActiveEditField("email")}
            >
              <dt className="text-sm font-medium text-gray-500">E-mail</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                {userEmail}
              </dd>
              <button
                className="sm:col-span-1 text-right"
                onClick={() => setActiveEditField("email")}
              >
                Edit
              </button>
            </div>
          )}
        </dl>
      </div>

      {/* THE BIO PART *********************************************************************************************/}

      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          <div className="text-sm mt-2">
            <h3 className="font-bold ml-32">Edit your bio information</h3>
          </div>
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {activeEditField == "website" ? (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <form action="" className="flex">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-2 py-1 text-center"
                  value={userWebsite}
                  onChange={(e) => setUserWebsite(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleBioSubmit}
                  className="text-orange-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditField("")}
                  className="text-slate-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              onClick={() => setActiveEditField("website")}
            >
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                {userWebsite}
              </dd>
              <button
                className="sm:col-span-1 text-right"
                onClick={() => setActiveEditField("website")}
              >
                Edit
              </button>
            </div>
          )}

          {activeEditField == "location" ? (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <form action="" className="flex">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-2 py-1 text-center"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleBioSubmit}
                  className="text-orange-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditField("")}
                  className="text-slate-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              onClick={() => setActiveEditField("location")}
            >
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                {userLocation}
              </dd>
              <button
                className="sm:col-span-1 text-right"
                onClick={() => setActiveEditField("location")}
              >
                Edit
              </button>
            </div>
          )}

          {activeEditField == "bio" ? (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <form action="" className="flex">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-2 py-1 text-center"
                  value={userBioText}
                  onChange={(e) => setUserBioBody(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleBioSubmit}
                  className="text-orange-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditField("")}
                  className="text-slate-400 border-2 pl-2 pr-2 ml-2 rounded-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              onClick={() => setActiveEditField("bio")}
            >
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                {userBioBody}
              </dd>
              <button
                className="sm:col-span-1 text-right"
                onClick={() => setActiveEditField("bio")}
              >
                Edit
              </button>
            </div>
          )}
        </dl>
      </div>

    </div>
  );
}
