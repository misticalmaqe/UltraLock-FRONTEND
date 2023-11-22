// HeaderTwo.js
import React, { useContext } from "react";
import logoImage from "../Images/logo-01.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../provider/UserProvider";
const HeaderTwo = () => {
  const { setAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/onboarding");
  };

  return (
    <div className="flex w-full bg-background justify-center absolute top-5">
      {/* Logo at the top center */}
      <div></div>

      <img
        src={logoImage}
        alt="UltraLock logo"
        className="flex justify-center w-20 "
      />

      {/* Logout button at the top left */}

      <button
        className="bg-accent text-background shadow-md shadow-window r-10 absolute"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default HeaderTwo;
