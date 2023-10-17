// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HoverDiv from "./HoverDiv";
// import { BsPlusLg } from "react-icons/bs";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // const [showNavDiv, setShowNavDiv] = useState(false);

  // const handleNavHover = () => setShowNavDiv(!showNavDiv);

  const handlePlusClick = () => navigate("/create-post");

  return (
    <header>
      <div className="justify-self-start flex items-center relative ">
        {/* <img src='/images/logo.png' alt='logo' className='h-11 w-11 ' /> */}
        <h1 className="logo text-custom text-5xl">Influence</h1>
      </div>
      <nav>
        <div className="grid-class ">
          <div className="create-btn" onClick={handlePlusClick}>
            Create
            {/* <BsPlusLg className='text-white ml-1 dash-icons h-5 w-5 hover:text-white' /> */}
          </div>
        </div>
        {/* <div className='grid-class'>
          <div className='border w-0 h-10 border-neutral-300 justify-self-end -mr-8'></div>
        </div> */}
        <div className="relative  grid-class [&:hover>ul]:visible ">
          <p className="profile  h-12 w-12 text-lg bg-neutral-600 hover:bg-primary-green-2  justify-self-end">
            {user?.initials.toUpperCase()}
          </p>
          {<HoverDiv />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
