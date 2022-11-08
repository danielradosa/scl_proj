import "./styles.css";
import Posts from "./Posts";
import Login from "./Login";
import LogoutButton from "./components/logoutButton";
import Signup from "./Signup";

export default function App() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  const checkLoggedIn = () => {
    if (token) {
      return (
        <LogoutButton />
      )
    }
  };

  const conditionCheck = () => {    
    if (token) {
      return (
        <Posts />
      )
    } 
    else {
      return (
        <div>
          <Login />
          <Signup />
        </div>
      )
    }
  }

  return (
    <div className="App">
      <h1>Social.INK</h1> <br /> <br />

      <div className="logout">
        {checkLoggedIn()}
      </div>
      
      {conditionCheck()}
    </div>
  );
}
