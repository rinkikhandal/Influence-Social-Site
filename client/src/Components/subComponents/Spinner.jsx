import {} from "react";

const Spinner = () => {
  return (
    <div className='flex w-full h-screen items-center justify-center  bg-white'>
      <div className='relative rounded-full h-36 w-36 border-solid border-2 border-neutral-400 before:w-full  '>
        <div className='absolute -top-[2px] -left-[2px] animate-spin  h-36 w-36 border-t-2 border-green-600 border-solid  rounded-full '></div>
        <h1 className='absolute h-36 w-36 text-center top-14 text-neutral-400 font-thin font-poppins text-xl tracking-wider'>
          {" "}
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default Spinner;
