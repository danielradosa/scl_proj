import React, { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USERNAME, UPDATE_EMAIL } from "../utils/Mutations";
import { GET_CURRENT_USER } from "../utils/Queries";

export default function Profile() {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );

  const userData = data.getCurrentUser;

  const [activeEditField, setActiveEditField] = React.useState("");

  const [username, setUsername] = React.useState(userData.username || "");
  const [userEmail, setUserEmail] = React.useState(userData.email || "");

  const [updateUsername] = useMutation(
    UPDATE_USERNAME, { refetchQueries: ["getCurrentUser"] } 
  );
  const [updateEmail] = useMutation(
    UPDATE_EMAIL, { refetchQueries: ["getCurrentUser"] }
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (activeEditField === "username") {
        await updateUsername({ variables: { id: userData.id, username, token: localStorage.getItem('token') || sessionStorage.getItem('token') } });
      } else if (activeEditField === "email") {
        await updateEmail({ variables: { id: userData.id, email: userEmail, token: localStorage.getItem('token') || sessionStorage.getItem('token') } });
      }
      setActiveEditField("");
    },
    [activeEditField, username, userEmail, updateUsername, updateEmail]
  );

  return (
    <div className="overflow-hidden bg-white shadow-lg mt-8 w-1/3 float-left sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Placeholder for picture
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {activeEditField == "username" ? (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <form action="">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>
                  Save
                </button>
                <button onClick={() => setActiveEditField("")}>Cancel</button>
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
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <form action="">
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>
                  Save
                </button>
                <button onClick={() => setActiveEditField("")}>Cancel</button>
              </form>
            </div>
          ) : (
            <div
              className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              onClick={() => setActiveEditField("email")}
            >
              <dt className="text-sm font-medium text-gray-500">Email</dt>
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
          

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Bio</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
              {user.bio}
            </dd>
            <button className="sm:col-span-1 text-right">Edit</button>
          </div>
        </dl>
      </div>
    </div>
  );
}
