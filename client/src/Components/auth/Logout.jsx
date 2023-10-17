import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../redux/actions/auth";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/");
  }, []);
  return <div></div>;
};

export default Logout;
