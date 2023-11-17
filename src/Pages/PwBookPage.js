import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/NavBar";
import personal from "../Images/icon-personal.png";
import share from "../Images/icon-shared.png";

export function PwBookPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-background h-screen p-8">
      <button
        className="cursor-pointer border border-accent border-8 p-6 m-4 w-2/5 h-48 flex items-center justify-center bg-accent text-background" // Adjusted width, height, and added flex
        onClick={() => navigate("/passwordbook/personal")}
      >
        <img src={personal} alt="Personal Icon" className="w-40 h-40" />{" "}
        {/* Adjusted width and height */}
      </button>
      <button
        className="cursor-pointer border border-accent border-8 p-6 m-4 w-2/5 h-48 flex items-center justify-center bg-accent text-background" // Adjusted width, height, and added flex
        onClick={() => navigate("/passwordbook/shared")}
      >
        <img src={share} alt="Share Icon" className="w-40 h-40" />{" "}
        {/* Adjusted width and height */}
      </button>
      <Navbar />
    </div>
  );
}
