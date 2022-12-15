import React from "react";

export default function Landing() {
  return (
    <>
      <img
        src="https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2017/07/nyhavn-17-tato-jack-tatoverer--tato-egon-sidder-yderst-til-venstre-ole-hansen-sidder-med-den-hvide-kasket-og-er-lige-blevet-tatoveret-af-jack.jpg"
        alt="bg"
        className="w-full h-screen object-cover fixed z-1"
      />
      <div className="bg-white/80 p-4 pb-24 w-1/2 grid ml-[630px] xs:ml-[420px] rounded-3xl mt-24 absolute shadow-lg backdrop-blur-md">
        <div>
          <h1 className="text-6xl font-bold p-8 text-center mt-4 sm:text-4xl">
            SOCIAL<span className="text-black">ink</span>
          </h1>
          <h2 className="text-4xl text-center text-black mt-20">
            Connect with tattoo enthusiasts and artist alike. <br />
            Free to use and fun to keep using.
          </h2>
        </div>

        <div className="flex justify-center mt-32">
          <div>
            <a
              className="bg-black text-white pl-4 pr-4 pt-2 pb-2 rounded-lg text-2xl transition duration-500 ease-in-out"
              href="/signup"
            >
              Get Started
            </a>
            <span className="text-black text-xl rounded-lg m-4">
              or if you already have an account:{" "}
            </span>
            <a
              className="border-2 border-black text-black pl-4 pr-4 pt-2 pb-2 rounded-lg text-2xl transition duration-500 ease-in-out"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      </div>
      <div id="popup" className="relative w-full text-center">
        <h4 className="z-12 text-white bg-white/20 backdrop-blur-lg p-2 text-sm">
          This website uses cookies to ensure you get the best experience, read more here:{" "}
          <a href="/cookies" className="underline">Cookies & Terms</a>
        </h4>
      </div>
      <div className="fixed bottom-0 w-full bg-black/20 backdrop-blur-lg">
        <div className="flex justify-center">
          <h3 className="text-white text-sm p-2">SOCIALink © 2060</h3>
        </div>
      </div>
    </>
  );
}
