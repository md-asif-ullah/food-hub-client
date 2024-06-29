import useUser from "@/pages/hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default ProtectedRoutes;
