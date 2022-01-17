import React, { useState, useEffect } from "react";
import "./Board.css"

const Board = (props) => {
  useEffect(() => {
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg';
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        img.style.display = 'none';
    };
  }, []);


  return (
      <>
        <p>hello</p>
        <canvas id="canvas" width="843" height="561"/>
      </>
   );
};

export default Board;