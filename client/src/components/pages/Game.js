import React, { useState, useEffect } from "react";
import Board from "../modules/Board.js";
import { Link } from "@reach/router";

const Game = () => {
    return (
      <>
        <Link to="/">return</Link>
        <p>the best game of all time</p>
        <Board />
      </>
    );
};

export default Game;