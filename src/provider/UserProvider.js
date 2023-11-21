import React, { createContext, useEffect, useState } from "react";
//import jwt from "jsonwebtoken";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const validateToken = async () => {
  //     try {
  //       // Make an API call to your backend to validate the token
  //       const response = await fetch("/api/validateToken", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ token }),
  //       });

  //       if (response.ok) {
  //         // Token is valid
  //         const { userId } = await response.json();
  //         setUserId(userId);
  //         setAuthenticated(true);
  //       } else {
  //         // Token is invalid
  //         setAuthenticated(false);
  //         setUserId(null);
  //         localStorage.removeItem("token");
  //       }
  //     } catch (error) {
  //       console.error("Error validating token:", error);
  //       setAuthenticated(false);
  //       setUserId(null);
  //       localStorage.removeItem("token");
  //     }
  //   };

  //   if (token) {
  //     validateToken();
  //   } else {
  //     setAuthenticated(false);
  //     setUserId(null);
  //   }
  // }, []);

  return (
    <UserContext.Provider
      value={{ authenticated, user, setUser, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
