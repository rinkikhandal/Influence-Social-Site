import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const res = await axiosInstance.post("auth/forgot-password", { email });

      const { token } = res.data;

      setMessage(
        "Please check your mail for the reset password or try again !"
      );
      // temporarily navigating to reset password
      navigate(`/reset-password/${token}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-screen grid place-items-center w-full'>
      <div className=' border-neutral-300 border w-[370px] px-10 py-4 rounded-lg min-h-[280px]'>
        <h2 className='logo'>Influence</h2>
        {message ? <p className='message-class'>{message}</p> : ""}
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

          <button type='submit ' className='btn mt-2'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
