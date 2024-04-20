import { RxCross2 } from "react-icons/rx";
import { BsCheck2 } from "react-icons/bs";

import PropTypes from "prop-types";

const Follow = ({ show, user, handleFollowUser, handleShowClose }) => {
  return (
    <div>
      {show && show[1].length > 0 && (
        <div className="overlay ">
          <div className="bg-neutral-200 max-w-md w-[90%] px-4 pt-4 rounded-lg relative h-fit ">
            <h1 className="mb-8 capitalize font-semibold text-primary-dark text-xl">
              {show[0]}
            </h1>
            {show[1].map((person) => {
              return (
                <div key={person._id}>
                  <button className="absolute top-2 right-4 bg-tertiary-green-1 rounded-full p-2 cursor-pointer">
                    <RxCross2 onClick={handleShowClose} className="h-5 w-5 " />
                  </button>
                  <div className="flex items-center mb-4 justify-between ">
                    <div className="flex items-center">
                      <span className="profile md:h-10 md:w-10 text-md cursor-default hover:bg-primary-green-1 ">
                        {person.initials}
                      </span>
                      <p className="ml-2 capitalize text-lg  font-medium">
                        {person._id === user._id ? "You" : person.fullName}
                      </p>
                    </div>
                    {person._id !== user._id && (
                      <button
                        className="edit"
                        onClick={() => handleFollowUser(person._id)}
                      >
                        {user.following.includes(person._id) ? (
                          <>
                            <BsCheck2 /> <span className="ml-1">following</span>
                          </>
                        ) : (
                          "follow"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Follow.propTypes = {
  show: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleFollowUser: PropTypes.func.isRequired,
  handleShowClose: PropTypes.func.isRequired,
};

export default Follow;
