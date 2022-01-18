import React, { useState, useEffect } from "react";
import Board from "../modules/Board.js";
import { Link } from "@reach/router";

const Game = () => {
    return (
      <>
        <Link to="/">return</Link> 
        <p>If nothing appears, just keep refreshing the page :)</p>
        <Board />
      </>
    );
};

export default Game;