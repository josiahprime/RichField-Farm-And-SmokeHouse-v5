import { Outlet } from "react-router-dom";
import RoleProtectedRoute from "../Components/ProtectedRoute/RoleProtectedRoute";

const DashboardLayout = () => {
  return (
    <RoleProtectedRoute allowedRoles={["admin", "customer"]}>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </RoleProtectedRoute>
  );
};

export default DashboardLayout;
