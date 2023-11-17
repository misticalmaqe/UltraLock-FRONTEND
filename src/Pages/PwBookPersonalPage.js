// PwBookPersonalPage.js
import React from "react";
import { Navbar } from "../Components/NavBar";
import Header from "../Components/Header";

export function PwBookPersonalPage() {
  return (
    <div className="flex flex-col items-center bg-background h-screen">
      <Header />
      <Navbar />

      {/* Search bar */}
      <div className="flex items-center justify-center mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-md"
          // You can add additional styles if needed
        />
        {/* You can add a search button or any other search-related components here */}
      </div>
    </div>
  );
}
