// Header.js
import { useNavigate } from "react-router-dom";
import backArrowImage from "../Images/icon-back.png";
import logoImage from "../Images/logo-01.png";
import PersonalForm from "./PersonalForm";
import SharedForm from "./SharedForm";

const Header = ({ toggle }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center m-[10px]">
      <img
        src={backArrowImage}
        alt="Back Arrow"
        className="w-20 ml-10"
        onClick={() => navigate("/passwordbook")}
      />
      <img src={logoImage} alt="UltraLock logo" className="w-20" />
      {toggle === false ? <PersonalForm /> : <SharedForm />}
    </div>
  );
};

export default Header;
