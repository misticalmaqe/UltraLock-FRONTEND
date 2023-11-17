// PwBookPersonalPage.js
import React from "react";
import { Navbar } from "../Components/NavBar";
import Header from "../Components/Header";

export function PwBookPersonalPage() {
  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-fill-bg"
      style={{ backgroundColor: "#DDF2FD", margin: 0, padding: 0 }}
    >
      <Header />
      <Navbar />
    </div>
  );
}
