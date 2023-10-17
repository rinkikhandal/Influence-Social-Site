import {} from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const divStyle = {
    backgroundImage: "url('images/galaxy.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };
  return (
    <div className='page-not-class' style={divStyle}>
      <h1 className='md:text-[190px] text-9xl first-letter:text-[150px] md:first-letter:text-[220px] font-geologica  capitalize font-black mix-blend-screen h-screen w-full place-self-center text-center items text-black bg-white md:pt-52 pt-64'>
        OOps!
      </h1>
      <div className='absolute  md:mt-[270px] mt-[240px] w-full  text-center'>
        <h2 className='uppercase   text-center font-semibold font-roboto-slab tracking-wide text-xl'>
          404 - Page not found
        </h2>
        <p className='text-center mt-2 mb-7 mx-auto text-primary-dark text-sm text-poppins w-[350px]'>
          The page you are looking for might have been removed had it`s name
          changed or is temporarily unavailable
        </p>
        <Link
          to='/dashboard'
          className='text-poppins  mx-auto w-full text-white rounded-3xl uppercase text-[13px] tracking-[1.5px] font-medium  py-3 px-6  link-shadow'
        >
          Go To HomePage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
