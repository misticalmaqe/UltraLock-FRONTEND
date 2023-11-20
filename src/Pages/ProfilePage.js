// ProfilePage.js
import React, { useState } from "react";
import { Navbar } from "../Components/NavBar";
import HeaderTwo from "../Components/HeaderTwo";

export function ProfilePage() {
  // State to manage the user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  // Function to handle saving the user details
  const saveProfile = () => {
    // Perform the save operation (replace this with your logic, e.g., API call)
    console.log("Saving profile:", { email, password, uploadedImage });
    // You can add your logic to save the data to a backend or database
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  return (
    <>
      <HeaderTwo />
      <div
        className="flex flex-col h-screen"
        style={{ backgroundColor: "#DDF@FD" }}
      >
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-col items-center justify-center flex-grow bg-background">
          <div className="flex flex-col items-center">
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <br />

            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button
              className="bg-accent text-background rounded-full px-4 py-2"
              onClick={saveProfile}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
