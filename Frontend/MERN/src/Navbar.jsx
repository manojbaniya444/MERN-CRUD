import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h3>Workout</h3>
        </Link>
        <Link to="/new-workout">
          <h3>Add New</h3>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
