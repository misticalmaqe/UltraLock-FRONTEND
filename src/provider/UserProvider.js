import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  //create useEffect

  return (
    <UserContext.Provider
      value={{ authenticated, setAuthenticated, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
