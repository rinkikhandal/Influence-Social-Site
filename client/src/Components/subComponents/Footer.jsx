import {} from "react";
import { BsPlusSquare } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePlusClick = () => navigate("/create-post");
  const handleProfileClick = () => navigate("/profile");
  const handleHomeClick = () => navigate("/dashboard");

  return (
    <footer className="dash-footer">
      {/* =======for dashboard=====  */}
      <ImHome
        className=" justify-self-end dash-icons"
        onClick={handleHomeClick}
      />
      {/* =======for creating post====== */}
      <BsPlusSquare
        className=" justify-self-center dash-icons"
        onClick={handlePlusClick}
      />
      {/* for profile */}
      <h1 className="profile" onClick={handleProfileClick}>
        {user?.initials}
      </h1>
    </footer>
  );
};

export default Footer;
