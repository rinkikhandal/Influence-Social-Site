import {} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        const res = await axiosInstance.patch(`/auth/reset-password/${token}`, {
          password,
        });
        await toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  return (
    <div className='h-screen grid place-items-center w-full'>
      <div className='border-neutral-300 border w-[370px] px-10 py-4 rounded-lg min-h-[280px]'>
        <h2 className='logo'>Influence</h2>
        <form className='register-form' onSubmit={handleFormSubmit}>
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
          <div className='inp-div'>
            <label htmlFor='confirmPassword' className='label-class'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='inp-class'
              placeholder='••••••••'
              name='confirmPassword'
            />
          </div>
          <button type='submit ' className='btn mt-2'>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
