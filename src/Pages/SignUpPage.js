import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrowImage from "../Images/icon-back.png";
import logoImage from "../Images/logo-tagline.png";

export const SignUpPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSignUp = () => {
    // Perform Auth here
    console.log("User signed up:", user);

    // After successful sign-up, navigate to the login page
    navigate("/onboarding");
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-background h-screen"
      style={{ backgroundColor: "#DDF2FD", margin: 0, padding: 0 }}
    >
      <div className="relative flex flex-col justify-start p-8 pt-20 min-w-[30%] rounded-md">
        <button
          className="absolute top-4 left-4 z-100 w-20 h-20"
          onClick={() => navigate("/onboarding")}
        >
          <img
            src={backArrowImage}
            alt="Back Arrow"
            className="w-full h-full"
          />
        </button>
        <div className="relative flex flex-col items-center justify-start p-[2rem] pt-[5rem] min-w-[30%]">
          <div className="flex flex-row justify-center pb-[2rem] lg:pb-[3rem]">
            <div className="w-80 h-80">
              <img src={logoImage} alt="UltraLock logo" />
            </div>
          </div>
          <div className="flex flex-col mb-4"></div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold lg:text-base leading-6 mb-1">
              Email:
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={user.email}
              autoComplete="off"
              placeholder=" Insert your email address"
              className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border border-slate-400 bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-pink-500 text-[1rem] mb-[1rem] "
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold lg:text-base leading-6 mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              autoComplete="off"
              placeholder=" Insert your password"
              className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border border-slate-400 bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-pink-500 text-[1rem] "
            />
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              onClick={handleSignUp}
              value="SIGN UP"
              style={{ backgroundColor: "#427D9D", color: "#DDF2FD" }}
              className="py-2 px-4 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
