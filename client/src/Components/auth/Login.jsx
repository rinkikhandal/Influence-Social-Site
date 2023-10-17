import {} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/auth";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const Login = ({ setComponent }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignClick = () => {
    setComponent("SignIn");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    dispatch(loginUser(data));
  };

  return (
    <div className='form-container h-[380px]'>
      <h2 className='logo'>Influence</h2>
      <form className='register-form' onSubmit={handleFormSubmit}>
        <div className='inp-div'>
          <label htmlFor='email' className='label-class'>
            Email
          </label>
          <input
            type='email'
            id='email'
            className='inp-class'
            name='email'
            placeholder='johnDoe12@gmail.com'
          />
        </div>
        <div className='inp-div'>
          <label htmlFor='password' className='label-class'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='inp-class'
            placeholder='••••••••'
            name='password'
          />
        </div>
        <Link
          to='/forgot-password'
          className='text-xs mt-5 text-secondary-green-1'
        >
          forgot password ?
        </Link>
        <button type='submit ' className='btn mt-2'>
          Log In
        </button>
      </form>
      <p className='login-text'>
        Don`t have an account?{" "}
        <span
          className='text-sm text-primary-green-2 underline cursor-pointer hover:text-primary-green-1'
          onClick={handleSignClick}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

Login.propTypes = {
  setComponent: PropTypes.func.isRequired,
};

export default Login;
