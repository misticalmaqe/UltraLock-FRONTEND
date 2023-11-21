import React, { useState } from 'react';
import OpenEye from '../Images/icon-eye-open.png';
import ClosedEye from '../Images/icon-eye-closed.png';

const Eyes = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hidePassword = () => {
    return showPassword ? 'text' : 'password';
  };

  const getPasswordDisplay = () => {
    return showPassword ? password : '*'.repeat(password.length);
  };

  return (
    <div className="flex flex-row items-center pl-[10px]">
      <div>{getPasswordDisplay()}</div>
      <img
        src={showPassword ? OpenEye : ClosedEye}
        alt="eyes"
        className="w-[2em] cursor-pointer pl-[10px] mt-[3px]"
        onClick={togglePasswordVisibility}
      />
    </div>
  );
};

export default Eyes;
