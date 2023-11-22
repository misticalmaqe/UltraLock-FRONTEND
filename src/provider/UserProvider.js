import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const UserContext = createContext();

// Define the UserContextProvider component
const UserContextProvider = ({ children }) => {
  // State variables for authentication and user data
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Accessing the REACT_APP_DB_PORT environment variable
  const DBPORT = process.env.REACT_APP_DB_PORT;

  // Set initial timer duration to 10 minutes (in milliseconds)
  const sessionTimeout = 10 * 60 * 1000;

  // Ref to store the logout timer ID
  const logoutTimerRef = useRef(null);

  // Function to reset the logout timer
  const resetTimeout = useCallback(() => {
    // Clear any existing timeout
    clearTimeout(logoutTimerRef.current);

    // Set a new timeout to log out after the specified duration
    logoutTimerRef.current = setTimeout(() => {
      // Redirect to onboarding page and clear user data
      setAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
      window.location.href = "/onboarding";
      alert("Session has expired. Please log in again.");
    }, sessionTimeout);

    return logoutTimerRef.current; // Return the timer ID for cleanup
  }, [setAuthenticated, setUser, sessionTimeout]);

  // Function to check authentication using the token's expiration time
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const tokenAuth = `Bearer ${token}`;
        const response = await axios.get(`${DBPORT}/user/jwtTest`, {
          headers: {
            Authorization: tokenAuth,
          },
        });

        if (response.data.success) {
          // If the token is valid, set authentication and user data
          setAuthenticated(true);
          const decoded = jwtDecode(token);
          setUser(decoded);
          return true;
        } else {
          // If the token is not valid, remove it from localStorage
          localStorage.removeItem("token");
        }
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      localStorage.removeItem("token");
    }

    // If token is missing or invalid, set authentication to false
    setAuthenticated(false);
    setUser(null);
    return false;
  }, [setAuthenticated, setUser, DBPORT]);

  // Effect hook to run on component mount
  useEffect(() => {
    // Check authentication on page load
    checkAuth();

    // Start the session timeout timer
    const timerId = resetTimeout();

    // Cleanup function to clear the timer on component unmount
    return () => {
      clearTimeout(timerId);
    };
  }, [checkAuth, resetTimeout]); // Dependencies for the effect hook

  // Provide the user context to the component tree
  return (
    <UserContext.Provider
      value={{ authenticated, user, setUser, setAuthenticated, checkAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Export the UserContextProvider component as the default export
export default UserContextProvider;
