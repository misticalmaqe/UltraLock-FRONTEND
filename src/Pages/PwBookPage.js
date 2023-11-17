import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/NavBar";
import personal from "../Images/icon-personal.png";
import share from "../Images/icon-shared.png";

export function PwBookPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-background h-screen">
      <button
        className="cursor-pointer"
        onClick={() => navigate("/passwordbook/personal")}
      >
        <img src={personal} alt="Personal Icon" />
      </button>
      <button
        className="cursor-pointer"
        onClick={() => navigate("/passwordbook/shared")}
      >
        <img src={share} alt="Share Icon" />
      </button>
      <Navbar />
    </div>
  );
}
