import React, { useState, useEffect } from "react";
import Board from "../modules/Board.js";
import { Link } from "@reach/router";

const Game = () => {
    return (
      <>
        <Link to="/">return</Link> 
        <p>this is just a test.</p>
        <Board />
      </>
    );
};

export default Game;