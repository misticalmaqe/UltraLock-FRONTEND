import React, { createContext, useEffect, useState } from "react";
//import jwt from "jsonwebtoken";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  return (
    <UserContext.Provider
      value={{ authenticated, user, setUser, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
