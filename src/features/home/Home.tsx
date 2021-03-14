import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>I am home This is testing.</div>
      <Link to="/todos/newtodo">New Todo</Link>
    </>
  );
};

export default Home;
