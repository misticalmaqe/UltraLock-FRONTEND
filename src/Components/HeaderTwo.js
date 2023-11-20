// HeaderTwo.js
import React from "react";
import logoImage from "../Images/logo-01.png";

const HeaderTwo = () => {
  return (
    <div
      className="flex items-center justify-between w-full mt-0 ml-0 bg-background p-0"
      style={{ padding: 0, margin: 0 }}
    >
      <div className="flex items-center mx-auto">
        {/* Apply styles to the logo image */}
        <img
          src={logoImage}
          alt="UltraLock logo"
          className="w-20 h-20 mt-0 mb-0 p-0 m-0"
          style={{ padding: 0, margin: 0 }}
        />
      </div>
    </div>
  );
};

export default HeaderTwo;
