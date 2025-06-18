
import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (token && userInfo?.role === "admin") {
    return <Navigate to="/admin" />;
  } else if (token) {
    return <Navigate to="/" />;
  }

  return children;
}
