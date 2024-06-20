import { getUser, isAuth } from "../core/authenication";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ role, auth = true }) => {
  if (auth)
    return (
      <>
        {isAuth() && getUser().type == role ? (
          <Outlet />
        ) : (
          <Navigate to={"/"} />
        )}
      </>
    );
  return <>{!isAuth() ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default AuthGuard;
