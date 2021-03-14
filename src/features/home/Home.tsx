import React from "react";
import { Link } from "react-router-dom";
import { PAGE_TODO_ADD } from "utils/constants";

const Home = () => {
  return (
    <>
      <div>I am home This is testing.</div>
      <Link to={PAGE_TODO_ADD.path}>New Todo</Link>
    </>
  );
};

export default Home;
