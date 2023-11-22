import { useEffect, useContext } from 'react';
import { UserContext } from '../provider/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Components/NavBar';
import personal from '../Images/icon-personal.png';
import share from '../Images/icon-shared.png';
import HeaderTwo from '../Components/HeaderTwo';

export function PwBookPage() {
  const { personalFetchData, sharedFetchData } = useContext(UserContext);
  const navigate = useNavigate();

  //useEffect for setting up session storage in Personal Page
  useEffect(() => {
    personalFetchData();
    sharedFetchData();
  });

  return (
    <div className="flex items-center justify-center bg-background h-screen p-8">
      <HeaderTwo />
      <button
        className="cursor-pointer p-5 m-5 bg-window shadow-lg shadow-accent"
        onClick={() => navigate('/passwordbook/personal')}
      >
        <img src={personal} alt="Personal Icon" className="w-40" />
      </button>
      <button
        className="cursor-pointer p-5 m-5 bg-window shadow-lg shadow-accent"
        onClick={() => navigate('/passwordbook/shared')}
      >
        <img src={share} alt="Share Icon" className="w-40" />
      </button>
      <Navbar />
    </div>
  );
}
