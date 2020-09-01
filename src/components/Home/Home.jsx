import React from "react";
import Navbar from "../Navbar/Navbar";
import Board from "../Board/Board";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Board />
    </div>
  );
};

export default Home;
