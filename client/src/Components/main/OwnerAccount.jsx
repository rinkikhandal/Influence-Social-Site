import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Posts from "../subComponents/Posts";
import {
  unFollowUser,
  followUser,
  getFollowers,
  getFollowings,
} from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import Header from "../subComponents/Header";
import Footer from "../subComponents/Footer";
import Follow from "../subComponents/Follow";

const OwnerAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const { allPosts } = useSelector((state) => state.post);
  const { otherUserFollowers, otherUserFollowings } = useSelector(
    (state) => state.otherUser
  );

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);

  const [show, setShow] = useState(null);

  const dispatch = useDispatch();

  const getUserFollowers = (user) => {
    dispatch(getFollowers(user._id));
  };

  const getUserFollowings = (user) => {
    dispatch(getFollowings(user._id));
  };

  useEffect(() => {
    getUserFollowers(user);
    getUserFollowings(user);
  }, [user.followers, user.followings, user]);

  useEffect(() => {
    if (otherUserFollowers) {
      setFollowers(otherUserFollowers);
    }
  }, [otherUserFollowers]);

  useEffect(() => {
    if (otherUserFollowings) {
      setFollowings(otherUserFollowings);
    }
  }, [otherUserFollowings]);

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component is unmounted or when the overlay is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOverlayOpen]);

  const handleFollowUser = (id) => {
    if (user.following.includes(id)) {
      dispatch(unFollowUser(id));
    } else {
      dispatch(followUser(id));
    }
  };

  const showFollowers = () => {
    console.log(followers);
    setShow(["followers", followers]);
    setIsOverlayOpen(true);
  };

  const showFollowings = () => {
    console.log(followings);
    setShow(["followings", followings]);
    setIsOverlayOpen(true);
  };

  const handleShowClose = () => {
    setIsOverlayOpen(false);
    setShow(null);
  };

  return (
    <>
      <Header />

      {!user ? (
        // loading small
        <div className="h-screen w-full grid place-items-center ">
          <div className="grid place-items-center ">
            <div className="h-10 w-10 border-t-2 border-b-2 animate-spin border-t-primary-green-2 rounded-full border-b-primary-green-2 mb-5"></div>
            <h1 className="text-primary-green-1"> Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="pt-[90px] px-5  w-full pb-20 max-w-[1240px] mx-auto">
          {/* <h1 className="heading mb-5 md:text-start">User Profile</h1> */}
          <div className="flex items-center mb-4 ">
            <span className="profile md:h-10 md:w-10 md:text-lg text-md cursor-default hover:bg-primary-green-1 ">
              {user.initials}
            </span>
            <p className="ml-2 capitalize text-lg text-primary-green-2 font-semibold">
              {user.fullName}
            </p>
          </div>
          <div className="flex mb-8 ml-2 text-sm">
            <button
              className="mr-3 hover:text-primary-green-2"
              onClick={showFollowers}
            >
              {user.followers.length}
              <span className="ml-1 hover:underline ">followers</span>
            </button>
            <button
              className=" hover:text-primary-green-2"
              onClick={showFollowings}
            >
              {user.following.length}
              <span className="ml-1 hover:underline  ">following</span>
            </button>
          </div>
          <div className="main-body-dash w-full columns-1 xl:columns-4 lg:columns-3  sm:columns-2 gap-y-4 gap-x-4  mb-20">
            <Posts
              posts={allPosts.filter((post) => post.user._id === user._id)}
            />
          </div>
        </div>
      )}

      <Footer />
      <Outlet />
      <Follow
        show={show}
        handleFollowUser={handleFollowUser}
        user={user}
        handleShowClose={handleShowClose}
      />
    </>
  );
};

export default OwnerAccount;
