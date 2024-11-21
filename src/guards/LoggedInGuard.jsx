import { getUser, isAuth } from "../core/authenication";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInGuard = () => {
  return <>{isAuth() && getUser().type ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default LoggedInGuard;
