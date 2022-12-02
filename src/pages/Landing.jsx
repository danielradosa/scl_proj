import React from "react";

export default function Landing() {
  return (
    <div className="bg-white p-4 pb-24 w-1/2 grid rounded-3xl mt-24">
      <div>
        <h1 className="text-6xl font-bold p-8 text-center mt-4 sm:text-4xl">SOCIAL<span className="text-black">ink</span></h1>
        <h2 className="text-4xl text-center text-black mt-20">Connect with tattoo enthusiasts and artist alike. <br />
        Free to use and fun to keep using.</h2>
      </div>

      <div className="flex justify-center mt-32">
        <div>
        <a className="bg-black text-white pl-4 pr-4 pt-2 pb-2 rounded-lg text-2xl transition duration-500 ease-in-out" href="/signup">Get Started</a>
        <span className="text-black text-xl bg-white rounded-lg m-4">or if you already have an account: </span>
        <a className="border-2 border-black text-black pl-4 pr-4 pt-2 pb-2 rounded-lg text-2xl transition duration-500 ease-in-out" href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
