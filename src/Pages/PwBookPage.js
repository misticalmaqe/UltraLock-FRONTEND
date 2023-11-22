import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Components/NavBar';
import { UserContext } from '../provider/UserProvider';
import personal from '../Images/icon-personal.png';
import share from '../Images/icon-shared.png';
import logo from '../Images/logo-01.png';

export function PwBookPage() {
  const { personalFetchData, sharedFetchData } = useContext(UserContext);
  const navigate = useNavigate();

  //useEffect for setting up session storage in Personal Page
  useEffect(() => {
    personalFetchData();
    sharedFetchData();
  });

  return (
    <div className="flex flex-col items-center h-screen bg-background">
      <img src={logo} alt="UltraLock logo" className="w-20 pt-[20px]" />
      <div className="flex items-center justify-center h-screen p-8">
        <button
          className="cursor-pointer p-6 m-5 w-2/5 bg-window shadow-lg shadow-accent"
          onClick={() => navigate('/passwordbook/personal')}
        >
          <img src={personal} alt="Personal Icon" className="w-40" />
        </button>
        <button
          className="cursor-pointer p-6 m-5 w-2/5 bg-window shadow-lg shadow-accent"
          onClick={() => navigate('/passwordbook/shared')}
        >
          <img src={share} alt="Share Icon" className="w-40" />
        </button>
        <Navbar />
      </div>
    </div>
  );
}
