import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrowImage from '../Images/icon-back.png';
import logoImage from '../Images/logo-tagline.png';

export const SignUpPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Perform Auth here
    console.log('User signed up:');

    // After successful sign-up, navigate to the login page
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col pt-[100px] items-center bg-background h-screen text-text">
      <img
        className="w-20 cursor-pointer absolute top-5 left-10 z-10"
        src={backArrowImage}
        alt="Back Arrow"
        onClick={() => navigate('/onboarding')}
      />
      <img className="w-80" src={logoImage} alt="UltraLock logo" />
      <div className="flex flex-col mb-10">
        <label className="text-m font-bold mb-2">Email:</label>
        <input
          className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-text shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text mb-[1rem] pl-[5px]"
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
          className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px]"
          type="password"
          name="password"
          value={password}
          placeholder=" Insert your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center">
        <input
          className="py-2 px-4 rounded-md cursor-pointer bg-accent text-background"
          type="button"
          onClick={handleSignUp}
          value="SIGN UP"
        />
      </div>
    </div>
  );
};
