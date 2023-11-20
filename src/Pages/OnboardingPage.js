import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../provider/UserProvider';
import logoImage from '../Images/logo-tagline.png';
import { jwtDecode } from 'jwt-decode';
const DBPORT = process.env.REACT_APP_DB_PORT;

export const OnboardingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated, setAuthenticated, user, setUser } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
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
          }
        }
      } catch (err) {
        localStorage.removeItem('token');
      }
    };
    checkAuth();
  }, [setAuthenticated]);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DBPORT}/user/jwtSignIn`, {
        email,
        password,
      });
      if (response.data.success) {
        const { token } = response.data;
        // Set authenticated state
        setAuthenticated(true);
        // Store token and payload in localStorage
        localStorage.setItem('token', token);

        // Decode the token and set the user
        const decoded = jwtDecode(token);
        setUser(decoded); // Set the user using the decoded token payload
        navigate('/');
      }
    } catch (error) {
      // Handle login failure
      alert('Login failed. Please check your credentials.');
    }
  };

  if (authenticated) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="flex flex-col pt-[100px] items-center bg-background h-screen text-text">
        <img src={logoImage} alt="UltraLock logo" className="w-80 mb-[20px]" />
        <form className="flex flex-col w-full max-w-md">
          <div className="flex flex-col mb-10">
            <label className="text-m font-bold mb-2">Email:</label>
            <input
              className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-text shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text mb-[1rem] pl-[5px]"
              type="text"
              name="email"
              value={email}
              placeholder=" Insert your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
            />
            <label className="text-m font-bold mb-2">Password:</label>
            <input
              className="w-full h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px]"
              type="password"
              name="password"
              value={password}
              placeholder=" Insert your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="button"
            onClick={handleLogIn}
            value="LOG IN"
            className="py-2 px-4 rounded-md cursor-pointer bg-accent text-background"
          />
          <div className="flex justify-between mt-[30px]">
            {/* Change the button to a Link component */}
            <Link
              to="/signup"
              className="py-2 px-4 rounded-md cursor-pointer mt-2 bg-accent text-background w-full mr-[20px] text-center"
            >
              SIGN UP
            </Link>
            <Link
              to="/forgotpassword"
              className="py-2 px-4 rounded-md cursor-pointer mt-2 bg-accent text-background w-full ml-[20px] text-center"
            >
              FORGOT PASSWORD
            </Link>
          </div>
        </form>
      </div>
    );
  }
};
