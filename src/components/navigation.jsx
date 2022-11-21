import { Link } from "react-router-dom";
import { ReactComponent as Discover } from "./icons/discover.svg";
import { ReactComponent as Feed } from "./icons/feed.svg";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { ReactComponent as Settings } from "./icons/settings.svg";

const Navigation = () => {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );
  
  const profilePicture = user.profilePicture;
  const userHandle = user.handle;
  const userName = user.username; 

  return (
    <div className="navigation">
      <div className="flex w-72 bg-white p-6 m-8 shadow-lg rounded-lg">
        <img src={profilePicture} alt="user_picture" className="w-14 rounded-lg mr-5" />
        <div>
          <h1 className="text-xl text-slate-700">{userName}</h1>
          <h2 className="text-lg text-slate-400">{userHandle}</h2>
        </div>
      </div>

      <div className="w-72 bg-white p-6 mt-8 shadow-lg rounded-lg relative grid text-left">
        <Link to="/dashboard" className="text-lg text-slate-700 links ml-0"><Feed className="ico" />News feed</Link>
        <Link to="/discover" className="text-lg text-slate-700 links ml-0 mt-2"><Discover className="ico"/> Discover</Link>
        <Link to="/profile" className="text-lg text-slate-700 links ml-0 mt-2"><Profile className="ico" />Profile</Link>
      </div>

      <div className="w-72 bg-white p-6 mt-8 shadow-lg rounded-lg relative grid">
        <Link to="/settings" className="text-lg text-slate-700 links ml-0"><Settings className="ico" />Settings</Link>
      </div>
    </div>
  );
};

export { Navigation };
