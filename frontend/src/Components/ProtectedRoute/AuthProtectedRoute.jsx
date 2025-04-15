import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const AuthProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default AuthProtectedRoute;
