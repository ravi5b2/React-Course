import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const active = { color: "red" };
  return (
    <nav>
      <NavLink to="/" activeStyle={active} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={active}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={active}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
