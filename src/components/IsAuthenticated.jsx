import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const user = sessionStorage.getItem("token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const IsAuthenticated = (props) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default IsAuthenticated;
