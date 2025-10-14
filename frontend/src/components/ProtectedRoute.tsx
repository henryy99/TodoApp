import { Navigate } from "react-router";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useUser();

  // Show loading while checking auth
  if (state.isLoading) return <p className="text-5xl">Loading...</p>;

  // Render children if authorized, otherwise redirect to login
  return state.authorized ? <>{children}</> : <Navigate to="/login" replace />;
}
