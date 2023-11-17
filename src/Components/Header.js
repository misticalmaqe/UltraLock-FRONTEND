// Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import backArrowImage from "../Images/icon-back.png";
import logoImage from "../Images/logo-01.png";
import addIconImage from "../Images/icon-add.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full mt-4 ml-4">
      <div>
        <button onClick={() => navigate("/passwordbook")}>
          <img src={backArrowImage} alt="Back Arrow" className="w-20 h-20" />
        </button>
      </div>
      <div className="flex items-center">
        <img src={logoImage} alt="UltraLock logo" className="w-20 h-20" />
      </div>
      <div>
        <button onClick={() => console.log("Add icon clicked")}>
          <img src={addIconImage} alt="Add Icon" className="w-20 h-20" />
        </button>
      </div>
    </div>
  );
};

export default Header;
