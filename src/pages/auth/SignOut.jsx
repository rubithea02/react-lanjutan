import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus data login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");

    // Redirect ke login
    navigate("/login");
  }, [navigate]);

  return null; // Tidak perlu render apapun
};

export default SignOut;
