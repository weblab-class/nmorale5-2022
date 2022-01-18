import React, { useState, useEffect } from "react";

const Piece = (props) => {
    if (props.show) return(
        <p><canvas id="canvas" width="843" height="561"/></p>
    ); else return null;
}

export default Piece;