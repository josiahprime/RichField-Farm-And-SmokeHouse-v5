import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const RoleProtectedRoute = ({ allowedRoles = [], children }) => {
  const { authUser, isCheckingAuth, getRole } = useAuthStore();
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

  const role = getRole();
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default RoleProtectedRoute;
