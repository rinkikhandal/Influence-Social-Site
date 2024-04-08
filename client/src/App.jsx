import { Route, Routes } from "react-router-dom";
import Home from "./Components/auth/Home";
import ForgotPassword from "./Components/auth/ForgotPassword";
import Dashboard from "./Components/main/Dashboard";
import { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/actions/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./Components/auth/ResetPassword";
import PageNotFound from "./Components/auth/PageNotFound";
import Spinner from "./Components/subComponents/Spinner";
import CreatePost from "./Components/main/CreatePost";
import Logout from "./Components/auth/Logout";
import UserProfile from "./Components/main/UserProfile";
import OwnerAccount from "./Components/main/ownerAccount";
// import UpdatePost from "./Components/main/UpdatePost";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* {console.log("hi")} */}
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            {/* <Route path="/edit-post" element={<UpdatePost />} /> */}
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<OwnerAccount />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
