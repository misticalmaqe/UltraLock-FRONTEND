import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const DBPORT = process.env.REACT_APP_DB_PORT;

  // Set initial timer duration to 10 minutes (in milliseconds)
  const sessionTimeout = 4 * 60 * 1000;
  const logoutTimerRef = useRef(null);

  // Function to reset the timer
  const resetTimeout = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      // Redirect to "/onboarding" when the timer expires
      setAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');
      window.location.href = '/onboarding';
      alert('Session has expired. Please log in again.');
    }, sessionTimeout);
  }, [setAuthenticated, setUser, sessionTimeout]); // Include sessionTimeout in the dependency array

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const tokenAuth = `Bearer ${token}`;
        const response = await axios.get(`${DBPORT}/user/jwtTest`, {
          headers: {
            Authorization: tokenAuth,
          },
        });
        if (response.data.success) {
          setAuthenticated(true);
          const decoded = jwtDecode(token);
          setUser(decoded); // Set the user using the decoded token payload
        }
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    checkAuth();
    resetTimeout();
  }, [resetTimeout]);

  return (
    <UserContext.Provider
      value={{ authenticated, user, setUser, setAuthenticated, checkAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
