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
  const sessionTimeout = 10 * 60 * 1000;
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

  //fetch data for personal groups and pwbooks
  const personalFetchData = async () => {
    try {
      const pwBooksResponse = await axios.get(
        `${DBPORT}/pwbookentry/allpw/${user.id}`
      );
      const pwBooksData = pwBooksResponse.data;
      sessionStorage.setItem('personalPwBooks', JSON.stringify(pwBooksData));

      const groupAccountIds = pwBooksData.map((book) => book.groupAccountId);

      const groupPromises = groupAccountIds.map(async (groupId) => {
        try {
          const groupResponse = await axios.get(
            `${DBPORT}/groupaccount/personal/${groupId}`
          );
          return groupResponse.data;
        } catch (error) {
          console.error('Error fetching group data:', error);
          return null;
        }
      });

      const groupsData = await Promise.all(groupPromises);
      const modifiedGroupsData = groupsData.flatMap(
        ({ groupAccounts }) => groupAccounts
      );

      const uniqueGroupsData = modifiedGroupsData.reduce((acc, current) => {
        const existing = acc.find((item) => item.id === current.id);
        if (!existing) {
          return acc.concat(current);
        }
        return acc;
      }, []);

      sessionStorage.setItem(
        'personalGroups',
        JSON.stringify(uniqueGroupsData)
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetch data for shared groups and pwbooks
  const sharedFetchData = async () => {
    try {
      const sharedAccounts = await axios.get(
        `${DBPORT}/user/shared/${user.id}`
      );
      const groupAccounts = sharedAccounts.data[0].groupAccounts;
      sessionStorage.setItem('sharedGroups', JSON.stringify(groupAccounts));

      const groupIds = groupAccounts.map((group) => group.id);
      const pwBooksData = await axios.post(
        `${DBPORT}/pwbookentry/allpwbgidSA/${groupIds}`,
        { userId: user.id }
      );
      sessionStorage.setItem('sharedPwBooks', JSON.stringify(pwBooksData.data));
    } catch (error) {
      console.error('TotalFail:', error);
    }
  };

  useEffect(() => {
    checkAuth();
    resetTimeout();
  }, [resetTimeout]);

  return (
    <UserContext.Provider
      value={{
        authenticated,
        user,
        setUser,
        setAuthenticated,
        checkAuth,
        personalFetchData,
        sharedFetchData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
