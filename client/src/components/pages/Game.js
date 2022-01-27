import React, { useState, useEffect } from "react";
import Board from "../modules/Board.js";
import { Link } from "@reach/router";
import "./Game.css";

const Game = () => {
    return (
      <>
        {/* <Link to="/">return</Link>
        <p>testing</p> */}
        <Board />
      </>
    );
};

export default Game;