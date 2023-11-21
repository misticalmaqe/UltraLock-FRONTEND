import React, { useState, useEffect } from "react";
import { Navbar } from "../Components/NavBar";
import HeaderTwo from "../Components/HeaderTwo";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function ProfilePage() {
  const location = useLocation();

  // State to manage the user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    // Retrieve email from the location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]); // Include location.state as a dependency

  // Function to handle saving the user details
  const saveProfile = async () => {
    try {
      // Perform the save operation (replace this with your logic, e.g., API call)
      const response = await axios.post(
        `http://localhost:8080/user/saveProfile`,
        {
          email,
          password,
          uploadedImage,
        }
      );
      console.log("Save profile response:", response.data);
      // You can add your logic to handle the response
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  // Function to handle changing the password
  const changePassword = async () => {
    // Check if the new password matches the confirmation
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    try {
      // Perform the change password operation (replace this with your logic, e.g., API call)
      const response = await axios.post(
        `http://localhost:8080/user/changePassword`,
        {
          email,
          newPassword,
        }
      );

      console.log("Change password response:", response.data);

      // Check if the password change was successful
      if (response.data.success) {
        // Password change was successful, show an alert
        alert("Password changed successfully!");
      }

      // You can add your logic to handle the response
    } catch (error) {
      console.error("Error changing password:", error);

      // Log the response data if available
      console.log("Error response data:", error.response?.data);

      // Show an alert for the error
      alert("Error changing password. Please try again.");
    }
  };

  return (
    <>
      <HeaderTwo />
      <div
        className="flex flex-col min-h-screen items-center justify-center"
        style={{ backgroundColor: "#DDF2FD" }}
      >
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-col items-center bg-background overflow-hidden">
          <div className="flex flex-col items-center p-4">
            {/* Image Upload */}
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploadedImage && (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Preview"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
            <br />

            {/* Email */}
            <label>Email:</label>
            <input
              type="text"
              value={email}
              readOnly // Use readOnly instead of disabled
              className="mb-2"
            />
            <br />

            {/* New Password */}
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-2"
            />
            <br />

            {/* Confirm Password */}
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-2"
            />
            <br />

            {/* Save and Change Password buttons */}
            <button
              className="bg-accent text-background rounded-full px-4 py-2"
              onClick={saveProfile}
            >
              Save
            </button>
            <button
              className="bg-accent text-background rounded-full px-4 py-2 ml-2"
              onClick={changePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
