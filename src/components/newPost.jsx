import "../styles.css";
import React, { useCallback } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/Mutations";
import { ALL_POSTS } from "../utils/Queries";

export default function NewPost() {
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [ALL_POSTS],
  });

  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );

  const profilePicture =
    user.profilePicture ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  const userHandle = user.handle;

  const createPost = useCallback(
    async (e) => {
      e.preventDefault();
      // post image to cloudinary
      const file = e.target.elements.image.files[0];
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

      // save input to variables
      const title = e.target.elements.title.value;
      const content = e.target.elements.content.value;
      const postedBy = userHandle;
      const createdAt = moment().format("MM-DD-YYYY hh:mm a");
      const postImage = image;

      // add post without image if no image is selected
      if (!file || !image) {
        addPost({
          variables: {
            title,
            content,
            postedBy,
            createdAt,
            postImage: "",
          },
        });
      } else {
        await addPost({
          variables: {
            title,
            content,
            postedBy,
            createdAt,
            postImage,
          },
        });
      }

      // clear form
      e.target.title.value = "";
      e.target.content.value = "";
      e.target.image.value = "";
    },
    [addPost]
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-8">
      <form onSubmit={createPost}>
        <h2 className="text-2xl p-2">Create new post</h2>
        <input
          className="p-2 rounded-lg text-slate-700 border-2 border-slate-200 ml-2 mt-2"
          type="text"
          placeholder="Title"
          name="title"
          maxLength={32}
        />{" "}
        <span className="font-thin"> * not required</span> <br />
        <div className="flex ml-2 ">
          <img
            src={profilePicture}
            alt="prof_pic"
            className="rounded-lg mt-4 ml-0 prof"
          />
          <textarea
            className="w-full p-4 text-xl border-2 m-4 rounded-lg"
            name="content"
            required
            minLength={6}
            rows="5"
            cols="33"
            placeholder="What's happening?"
            maxLength={420}
          ></textarea>
        </div>
        <div className="text-sm mt-2">
          <label htmlFor="image">Upload image (if you want): </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="rounded-lg bg-white text-slate-400 outline-none"
          />
        </div>
        <button
          type="submit"
          className="text-slate-700 pl-2 pr-2 mt-4 rounded-lg border-2 pt-2 pb-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
