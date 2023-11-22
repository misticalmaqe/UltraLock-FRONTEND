//--------------REACT--------------//
import { NavLink, Outlet } from 'react-router-dom';

//--------------COMPONENTS--------------//
import PasswordGenerator from '../Images/icon-passwordGen-no-bg.png';
import PasswordBook from '../Images/icon-passwordBook-no-bg.png';
import Profile from '../Images/icon-profile-no-bg.png';
import PasswordGeneratorOn from '../Images/icon-passwordGen-text.png';
import PasswordBookOn from '../Images/icon-passwordBook-text.png';
import ProfileOn from '../Images/icon-profile-text.png';

export function Navbar() {
  return (
    <div className="fixed bottom-3 z-10 flex w-full flex-row justify-between bg-background px-10 py-3">
      <NavLink to="/">
        {({ isActive }) => {
          return isActive ? (
            <img
              src={PasswordGeneratorOn}
              alt="Password Generator"
              className="w-[130px] "
            />
          ) : (
            <img
              src={PasswordGenerator}
              alt="Password Generator"
              className="w-[130px] "
            />
          );
        }}
      </NavLink>
      <NavLink to="/passwordbook">
        {({ isActive }) => {
          return isActive ? (
            <img
              src={PasswordBookOn}
              alt="Password Book"
              className="w-[130px]"
            />
          ) : (
            <img src={PasswordBook} alt="Password Book" className="w-[130px]" />
          );
        }}
      </NavLink>
      <NavLink to="/profile">
        {({ isActive }) => {
          return isActive ? (
            <img src={ProfileOn} alt="Profile" className="w-[130px]" />
          ) : (
            <img src={Profile} alt="Profile" className="w-[130px]" />
          );
        }}
      </NavLink>
      <Outlet />
    </div>
  );
}
