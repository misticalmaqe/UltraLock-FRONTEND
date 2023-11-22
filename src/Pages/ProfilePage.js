import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

//--------------COMPONENTS--------------//
import { Navbar } from '../Components/NavBar';
import HeaderTwo from '../Components/HeaderTwo';
import { UserContext } from '../provider/UserProvider';

export const ProfilePage = () => {
  // Accessing the REACT_APP_DB_PORT environment variable
  const DBPORT = process.env.REACT_APP_DB_PORT;
  // State variables for password, confirmPassword, and change password button click status
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);
  // New state variable to track whether data has been fetched
  const [dataFetched, setDataFetched] = useState(false);

  // Destructuring the user and checkAuth function from the UserContext
  const { user, checkAuth } = useContext(UserContext);

  // useEffect to fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Check if data has not been fetched yet
      if (!dataFetched) {
        // Fetch user data
        await checkAuth();
        // Set the state to true after fetching data
        setDataFetched(true);
      }
    };

    fetchData();
  }, [checkAuth, user, dataFetched]); // Include dataFetched in the dependency array

  // Accessing the userEmail with optional chaining to handle null user
  const userEmail = user ? user.email : '';

  // Function to handle the change password logic
  const changePassword = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    try {
      // Get the userid from the user object
      const userid = user.id;

      // Make a PUT request to change the password
      const response = await axios.put(
        `${DBPORT}/user/changePassword/${userid}`,
        { password }
      );

      if (response.data.success) {
        alert('Password changed successfully!');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please try again.');
    }
  };

  // JSX to render the profile page
  return (
    <div>
      {/* Header component */}
      <HeaderTwo />

      {/* Main content */}
      <div className="flex flex-col justify-center bg-background h-screen text-text ">
        <div className="flex flex-col items-center p-4">
          {/* Display user email if user is not null */}
          {user && (
            <div className="m-10 flex flex-col items-center">
              <label className="text-m font-bold mb-2 mr-5">Email:</label>
              <input
                className="text-center h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px]"
                type="text"
                value={userEmail}
                placeholder=" Insert yor password"
                readOnly
              />
            </div>
          )}

          {/* Change password section */}
          {isChangePasswordClicked && (
            <>
              <div className="flex flex-col justify-center items-start p-4">
                <label className="text-m font-bold mr-5">New Password:</label>
                <input
                  className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] my-3"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-center items-start p-4">
                <label className="text-m font-bold mr-5">
                  Confirm Password:
                </label>
                <input
                  className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] my-3"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* Button to trigger password change */}
              <button
                className="p-[10px] mt-5 bg-accent text-background shadow-md shadow-text"
                onClick={changePassword}
              >
                Change Password
              </button>
            </>
          )}

          {/* Button to toggle change password section visibility */}
          {!isChangePasswordClicked && (
            <button
              className="p-[10px] bg-accent text-background shadow-md shadow-text"
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
