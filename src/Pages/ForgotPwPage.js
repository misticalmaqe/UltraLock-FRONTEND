import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrowImage from "../Images/icon-back.png";
import logoImage from "../Images/logo-tagline.png";

export const ForgotPwPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const value = ev.target.value;
    setEmail(value);
  };

  const handleSendResetLink = () => {
    // Perform logic to send reset link
    console.log("Reset link sent to:", email);
    // You can add logic to handle the reset link and navigate accordingly
  };

  return (
    <div className="flex flex-row justify-center bg-background h-screen">
      <div className="relative flex flex-col justify-start p-8 pt-20 min-w-[30%] rounded-md">
        <button
          className="absolute top-4 left-4 z-10 w-20 h-20"
          onClick={() => navigate("/onboarding")}
        >
          <img
            src={backArrowImage}
            alt="Back Arrow"
            className="w-full h-full"
          />
        </button>
        <div className="relative flex flex-col items-center justify-start p-4">
          <div className="flex flex-row justify-center pb-4 lg:pb-6">
            <div className="w-80 h-80">
              <img src={logoImage} alt="UltraLock logo" />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold mb-1">Email:</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder=" Insert your email address"
              className="w-full h-10 rounded-md border border-gray-300 px-3"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSendResetLink}
              className="py-2 px-4 rounded-md bg-blue-500 text-white cursor-pointer"
              style={{ backgroundColor: "#427D9D", color: "#DDF2FD" }}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
