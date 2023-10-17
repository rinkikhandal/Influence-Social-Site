import {} from "react";
import { BsPlusSquare } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePlusClick = () => navigate("/create-post");

  return (
    <footer className='dash-footer'>
      <ImHome className=' justify-self-end dash-icons' />
      <BsPlusSquare
        className=' justify-self-center dash-icons'
        onClick={handlePlusClick}
      />
      <h1 className='profile'>{user?.initials}</h1>
    </footer>
  );
};

export default Footer;
