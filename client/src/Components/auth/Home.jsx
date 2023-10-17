import { useEffect, useState } from "react";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [component, setComponent] = useState("LogIn");
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <div className="front-page-container">
        <div className="for-width">
          <div className="side-pics">
            <img src="images/food.jpg" alt="foodPic" className="pic-1 pic" />
            <img src="images/code.jpg" alt="codePic" className="pic-2 pic" />
            <img src="images/decor.jpg" alt="decorPic" className="pic-3 pic" />
            <h1 className="moto tracking-wide">Influence Insight</h1>
          </div>

          {component === "SignIn" ? (
            <Register setComponent={setComponent} />
          ) : (
            <Login setComponent={setComponent} />
          )}
        </div>
        <footer className="footer">
          <p className="copy-right">
            &copy; copyright 2023{" "}
            <span className="font-medium tracking-wider text-primary-green-1">
              Influence
            </span>
          </p>
          <div className="icons">
            <p className="mr-2 text-neutral-900 ">Contact us</p>
            <FaFacebookSquare className="size scale-[1.4]" />
            <BsLinkedin className="size" />
            <BsInstagram className="size" />
          </div>
        </footer>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
