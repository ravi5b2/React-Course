import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>This is Home Page</h1>
    <Link to="about" className="btn btn-primary">
      Learn More
    </Link>
  </div>
);

export default HomePage;
