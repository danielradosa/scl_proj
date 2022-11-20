import React from "react";

export default function Landing() {
  return (
    <div>
      <h1 className="text-center mt-12 text-4xl">This is a landing page</h1>

      <div className="mt-12 flex w-96">
        <a
          href="/login"
          className="text-center text-black bg-white pr-4 pl-4 pt-2 pb-2 rounded-lg"
        >
          <button>Sign in</button>
        </a>
        <span>or</span>
        <a
          href="/signup"
          className="text-center text-black bg-white pr-4 pl-4 pt-2 pb-2 rounded-lg"
        >
          <button>Sign up</button>
        </a>
      </div>
    </div>
  );
}
