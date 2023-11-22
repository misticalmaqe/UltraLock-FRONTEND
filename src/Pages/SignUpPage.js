import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

//--------------COMPONENTS--------------//
import { UserContext } from '../provider/UserProvider';

//----------------Images----------------//
import backArrowImage from '../Images/icon-back.png';
import logoImage from '../Images/logo-tagline.png';

export const SignUpPage = () => {
  const DBPORT = process.env.REACT_APP_DB_PORT;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthenticated, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  //useEffect to check if authenticated
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

  //signup button
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DBPORT}/user/jwtsignup`, {
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
        // Navigate after successful signup
        navigate('/onboarding');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle email already in use
        alert('Email already in use. Please use a different email address.');
      } else {
        // Handle other signup failures
        alert('Signup failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="flex flex-col pt-[100px] items-center bg-background h-screen text-text">
      <img
        className="w-20 cursor-pointer absolute top-5 left-10 z-10"
        src={backArrowImage}
        alt="Back Arrow"
        onClick={() => navigate('/onboarding')}
      />
      <img className="w-80" src={logoImage} alt="UltraLock logo" />
      <div className="flex flex-col mb-10">
        <label className="text-m font-bold mb-2">Email:</label>
        <input
          className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-text shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text mb-[1rem] pl-[5px]"
          type="text"
          name="email"
          value={email}
          placeholder=" Insert your email address"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label className="text-m font-bold mb-2">Password:</label>
        <input
          className="w-80 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px]"
          type="password"
          name="password"
          value={password}
          placeholder=" Insert your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <input
          className="py-2 px-4 rounded-md cursor-pointer bg-accent text-background"
          type="button"
          onClick={handleSignUp}
          value="SIGN UP"
        />
      </div>
    </div>
  );
};
