import { Link } from "react-router-dom";

const Navigation = () => {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser")
  );
  
  const profilePicture = user.profilePicture;
  const userHandle = user.handle;
  const userName = user.username;

  return (
    <div className="nav-container">
      <div className="topNav">
        <img src={profilePicture} alt="user_picture" />
        <div className="right">
          <h1>{userName}</h1>
          <h2>{userHandle}</h2>
        </div>
      </div>

      <div className="middleNav">
        <Link to="/dashboard">News feed</Link>
        <Link to={`/${userHandle.slice(1)}`}>My profile</Link>
        <Link to="/discover">Discover</Link>
      </div>

      <div className="bottomNav">
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
};

export { Navigation };
