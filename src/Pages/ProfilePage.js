import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "../Components/NavBar";
import HeaderTwo from "../Components/HeaderTwo";
import axios from "axios";
import { UserContext } from "../provider/UserProvider";

export const ProfilePage = () => {
  // State variables for password, confirmPassword, and change password button click status
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
  // New state variable to track whether data has been fetched
  const [dataFetched, setDataFetched] = useState(false);

  // Destructuring the user and checkAuth function from the UserContext
  const { user, checkAuth } = useContext(UserContext);
  // Accessing the REACT_APP_DB_PORT environment variable
  const DBPORT = process.env.REACT_APP_DB_PORT;

  // useEffect to fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Check if data has not been fetched yet
      if (!dataFetched) {
        // Fetch user data
        await checkAuth();
        console.log(user);
        // Set the state to true after fetching data
        setDataFetched(true);
      }
    };

    fetchData();
  }, [checkAuth, user, dataFetched]); // Include dataFetched in the dependency array

  // Accessing the userEmail with optional chaining to handle null user
  const userEmail = user ? user.email : "";

  // Function to handle the change password logic
  const changePassword = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    try {
      // Get the userid from the user object
      const userid = user.id;
      console.log(userid);

      // Make a PUT request to change the password
      const response = await axios.put(
        `${DBPORT}/user/changePassword/${userid}`,
        { password }
      );

      console.log("Change password response:", response.data);

      if (response.data.success) {
        alert("Password changed successfully!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      console.log("Error response data:", error.response?.data);
      alert("Error changing password. Please try again.");
    }
  };

  // JSX to render the profile page
  return (
    <div>
      {/* Header component */}
      <HeaderTwo style={{ marginBottom: "20px" }} />

      {/* Main content */}
      <div className="flex flex-col items-center bg-background h-screen text-text ">
        <div
          className="flex flex-col items-center p-4"
          style={{ marginTop: "200px" }}
        >
          {/* Display user email if user is not null */}
          {user && (
            <>
              <label>Email:</label>
              <input type="text" value={userEmail} readOnly />
            </>
          )}

          {/* Change password section */}
          {isChangePasswordClicked && (
            <>
              <label>New Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Button to trigger password change */}
              <button
                className="bg-accent text-background rounded-full px-4 py-2 ml-2"
                onClick={changePassword}
              >
                Change Password
              </button>
            </>
          )}

          {/* Button to toggle change password section visibility */}
          {!isChangePasswordClicked && (
            <button
              className="bg-accent text-background rounded-full px-4 py-2 ml-2"
              onClick={() => setIsChangePasswordClicked(true)}
            >
              Change Password
            </button>
          )}
        </div>
      </div>

      {/* Navbar component */}
      <Navbar />
    </div>
  );
};
