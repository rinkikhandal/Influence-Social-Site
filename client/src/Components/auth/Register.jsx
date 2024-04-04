import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/actions/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";

const Register = ({ setComponent }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    setComponent("LogIn");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    dispatch(signInUser(data));
    // navigate("/dashboard");
  };

  const handlePassword = async () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-container">
      <h2 className="logo">Influence</h2>
      <form className="register-form" onSubmit={handleFormSubmit}>
        <div className="inp-div">
          <label htmlFor="firstName" className="label-class">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="inp-class"
            placeholder="John"
            name="firstName"
          />
        </div>

        <div className="inp-div">
          <label htmlFor="lastName" className="label-class">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="inp-class"
            placeholder="Doe"
            name="lastName"
          />
        </div>

        <div className="inp-div">
          <label htmlFor="email" className="label-class">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="inp-class"
            placeholder="johnDoe12@gmail.com"
            name="email"
          />
        </div>
        <div className="inp-div">
          <label htmlFor="password" className="label-class">
            Password
          </label>
          <div className="inp-class flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="  bg-neutral-100 outline-none"
              placeholder="••••••••"
              name="password"
            />
            <FaEye
              className={showPassword ? "hidden" : "eye"}
              onClick={handlePassword}
            />
            <FaEyeSlash
              className={showPassword ? "eye" : "hidden"}
              onClick={handlePassword}
            />
          </div>
        </div>
        <button type="submit " className="btn">
          Sign Up
        </button>
      </form>
      <p className="login-text">
        Already have an account?{" "}
        <span
          className="text-sm text-primary-green-2 underline cursor-pointer hover:text-primary-green-1"
          onClick={handleLoginClick}
        >
          Log In
        </span>
      </p>
    </div>
  );
};

Register.propTypes = {
  setComponent: PropTypes.func.isRequired,
};

export default Register;
