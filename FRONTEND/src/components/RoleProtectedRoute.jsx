import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { authenticatedUser } = useAuth();

  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(authenticatedUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
