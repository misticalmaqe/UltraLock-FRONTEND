import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../Images/logo-tagline.png";

export const OnboardingPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLogIn = () => {
    // Your login logic here
    // For now, navigate to "/passwordbook"
    navigate("/passwordbook");
  };

  const handleNewUser = () => {
    // Navigate to "/signup" when "NEW USER" button is clicked
    navigate("/signup");
  };

  const handleSignUp = () => {
    // Perform Auth here
    console.log("User signed up:", user);
  };

  const handleForgotPassword = () => {
    // Navigate to "//forgotpassword" when "FORGOT PASSWORD" button is clicked
    navigate("/forgotpassword");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-fill-bg"
      style={{ backgroundColor: "#DDF2FD", margin: 0, padding: 0 }}
    >
      <div className="relative flex flex-col items-center justify-start p-8 pt-20 min-w-[30%] rounded-md">
        <div className="flex flex-row justify-center pb-4 lg:pb-6">
          <div className="w-80 h-80">
            <img
              src={logoImage}
              alt="UltraLock logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <form className="flex flex-col w-full max-w-md">
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
              className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border border-slate-400 bg-white/5 text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-indigo-500 text-[1rem] mb-[1rem] "
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
              className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border border-slate-400 bg-white/5 text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-indigo-500 text-[1rem] "
            />
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              onClick={handleLogIn}
              value="LOG IN"
              className="py-2 px-4 rounded-md cursor-pointer"
              style={{ backgroundColor: "#427D9D", color: "#ffffff" }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              onClick={handleSignUp}
              value="SIGN UP"
              className="py-2 px-4 rounded-md cursor-pointer mt-2"
              style={{ backgroundColor: "#427D9D", color: "#ffffff" }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              onClick={handleForgotPassword}
              value="FORGOT PASSWORD"
              className="py-2 px-4 rounded-md cursor-pointer mt-2"
              style={{ backgroundColor: "#427D9D", color: "#ffffff" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
