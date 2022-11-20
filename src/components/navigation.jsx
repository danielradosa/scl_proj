import { Link } from "react-router-dom";

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

      <div className="grid w-72 bg-white p-6 mt-8 shadow-lg rounded-lg">
        <Link to="/dashboard" className="text-lg text-slate-500">News feed</Link>
        {/* <Link to={`/${userHandle.slice(1)}`}>My profile</Link> */}
        <Link to="/discover" className="text-lg text-slate-500">Discover</Link>
        <Link to="/profile" className="text-lg text-slate-500">Profile</Link>
      </div>

      <div className="grid w-72 bg-white p-6 mt-8 shadow-lg rounded-lg">
        <Link to="/settings" className="text-lg text-slate-500">Settings</Link>
      </div>
    </div>
  );
};

export { Navigation };
