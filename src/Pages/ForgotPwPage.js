import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//----------------IMAGES----------------//
import backArrowImage from '../Images/icon-back.png';
import logoImage from '../Images/logo-tagline.png';

export const ForgotPwPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const value = ev.target.value;
    setEmail(value);
  };

  const handleSendResetLink = () => {
    // Perform logic to send reset link
    console.log('Reset link sent to:', email);
    // You can add logic to handle the reset link and navigate accordingly
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
      <div className="flex flex-col mb-4">
        <label className="text-m font-bold mb-2">Email:</label>
        <input
          className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-text shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text mb-[1rem] pl-[5px]"
          type="text"
          name="email"
          onChange={handleChange}
          value={email}
          placeholder=" Insert your email address"
        />
      </div>
      <button
        type="button"
        onClick={handleSendResetLink}
        className="w-60 py-2 px-4 rounded-md bg-accent text-background cursor-pointer"
      >
        Reset Password
      </button>
    </div>
  );
};
