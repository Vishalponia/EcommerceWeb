import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SellerProtectedRoute = ({ children }) => {
  const { seller } = useAuth();

  if (!seller) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;