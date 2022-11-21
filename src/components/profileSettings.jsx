import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../utils/Mutations";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser"));

  const [activeEditField, setActiveEditField] = React.useState(''); //Push the field user wants to edit

  const [username, setUsername] = React.useState(user.username || '');
  const [userEmail, setUserEmail] = React.useState(user.email || '');
  const [userBio, setUserBio] = React.useState(user.bio || '');//bio does not exist in the local/session storage
  const [userHandle, setUserHandle] = React.useState(user.handle || '');
  const [userProfilePicture, setUserProfilePicture] = React.useState('something' || '');

  const [editUser] = useMutation(UPDATE_PROFILE);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const bio = {
        bioBy: 'this is string',
        body: 'this is string',
        website: 'this is string',
        location: 'this is string',
      }
      editUser({
        variables: { username, email: userEmail, handle: userHandle, profilePicture: 'nope', bio: bio },
      }).then(x => { console.log('update', x) }).catch(error => { console.log('updateeerror', error) });

    },
    [username, userEmail, userHandle,]
  )

  return (
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Placeholder for picture</h3>
      </div>
      <div class="border-t border-gray-200">
        <dl>

          {activeEditField == 'username' ? (
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Username</dt>
              <form action="">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit} >
                  Save
                </button>
                <button onClick={() => setActiveEditField("")}>
                  Cancel
                </button>
              </form>
            </div>
          ) :
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" onClick={() => setActiveEditField("username")}>
              <dt class="text-sm font-medium text-gray-500">Username</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{username}</dd>
              <button class="sm:col-span-1 text-right" onClick={() => setActiveEditField("username")} >Edit</button>
            </div>
          }

          {activeEditField == 'userEmail' ? (
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email Address</dt>
              <form action="">
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button type="submit" >
                  Save
                </button>
                <button onClick={() => setActiveEditField("")}>
                  Cancel
                </button>
              </form>

            </div>
          ) :
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" onClick={() => setActiveEditField("userEmail")}>
              <dt class="text-sm font-medium text-gray-500">Email Address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{userEmail}</dd>
              <button class="sm:col-span-1 text-right" onClick={() => setActiveEditField("userEmail")} >Edit</button>
            </div>
          }

          {activeEditField == 'userHandle' ? (
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Handle</dt>
              <form action="">
                <input
                  type="text"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                />
                <button type="submit" >
                  Save
                </button>
                <button onClick={() => setActiveEditField("")}>
                  Cancel
                </button>
              </form>

            </div>
          ) :
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" onClick={() => setActiveEditField("userHandle")}>
              <dt class="text-sm font-medium text-gray-500">Handle</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{userHandle}</dd>
              <button class="sm:col-span-1 text-right" onClick={() => setActiveEditField("userHandle")} >Edit</button>
            </div>
          }

          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Bio</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{user.bio}</dd>
            <button class="sm:col-span-1 text-right">Edit</button>
          </div>

        </dl>
      </div>
    </div>
  )
}