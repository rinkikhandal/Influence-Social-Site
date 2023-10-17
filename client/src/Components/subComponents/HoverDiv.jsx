import {} from "react";
import { Link } from "react-router-dom";

const HoverDiv = () => {
  return (
    <ul className="nav-hover invisible">
      <Link to="/dashboard">
        <li className="dash-li">Dashboard</li>
      </Link>
      <p className="h-0 !important w-full border"></p>
      <Link>
        <li className="dash-li">Profile</li>
      </Link>
      <Link>
        <li className="dash-li">Account</li>
      </Link>
      <Link to="/logout">
        <li className="dash-li">Log Out</li>
      </Link>
    </ul>
  );
};

export default HoverDiv;
