import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from '../Images/logo-tagline.png';

export const OnboardingPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = () => {
    // Your login logic here
    // For now, navigate to "/passwordbook"
    navigate('/passwordbook');
  };

  const handleForgotPassword = () => {
    // Navigate to "//forgotpassword" when "FORGOT PASSWORD" button is clicked
    navigate('/forgotpassword');
  };

  return (
    <div className="flex flex-col pt-[100px] items-center bg-background h-screen text-text">
      <img src={logoImage} alt="UltraLock logo" className="w-80 mb-[20px]" />
      <form className="flex flex-col w-full max-w-md">
        <div className="flex flex-col mb-10">
          <label className="text-m font-bold mb-2">Email:</label>
          <input
            className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-text shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text mb-[1rem] pl-[5px]"
            type="text"
            name="email"
            value={email}
            placeholder=" Insert your email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
          />
          <label className="text-m font-bold mb-2">Password:</label>
          <input
            className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px]"
            type="password"
            name="password"
            value={password}
            placeholder=" Insert your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="button"
          onClick={handleLogIn}
          value="LOG IN"
          className="py-2 px-4 rounded-md cursor-pointer bg-accent text-background"
        />
        <div className="flex justify-even mt-[30px]">
          {/* Change the button to a Link component */}
          <Link
            to="/signup"
            className="py-2 px-4 rounded-md cursor-pointer mt-2 bg-accent text-background w-full mr-[20px] text-center"
          >
            SIGN UP
          </Link>
          <input
            type="button"
            onClick={handleForgotPassword}
            value="FORGOT PASSWORD"
            className="py-2 px-4 rounded-md cursor-pointer mt-2 bg-accent text-background w-full ml-[20px] text-center"
          />
        </div>
      </form>
    </div>
  );
};
