import React, { useState, useEffect } from "react";
import Board from "../modules/Board.js";
import { Link } from "@reach/router";

const Game = () => {
    return (
      <>
        <Link to="/">return</Link> 
        <Board />
      </>
    );
};

export default Game;