import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  //create useEffect

  return (
    <UserContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
