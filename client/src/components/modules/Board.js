import React, { useState, useEffect, Component } from "react";
import "./Board.css";
import { setupCanvas, drawCanvas } from "../../canvasManager.js";
import { gameState } from "../../logic.js";

const Board = (props) => {
  const [imageID, setImageID] = useState("");
  const [level, setLevel] = useState(0);

  const generateSites = (n, width, height) => {
    /**
     * Returns n random sites for voronoi construction {x, y}
     */
    let sites = []
    for (let i=0; i<n; i++) {
      sites.push({x: Math.random()*width, y:Math.random()*height});
    } 
    // sites.map((site) => console.log(site));

    return sites;
  };

  const distance = (pointA, pointB) => {
    return Math.hypot(pointA.x-pointB.x, pointA.y-pointB.y);
  };

  const isClosest = (point, site, sites) => {
    /**
     * Returns whether a point is closest to a given site
     */
    let index, dist, minDist = Infinity;
    for (let i=0;i<sites.length;i++) {
      dist = distance(point, sites[i]);
      if (dist < minDist) {
        minDist = dist;
        index = i
      }
    }
    return site === index;
  };

  const toPoint = (index, width) => {
    /**
     * Converts pixel index to point object {x, y}
     */
    let pixel = Math.floor(index/4);
    return {x: pixel % width, y: Math.floor(pixel/width)};
  };

  ///////////////////////////////////////////
  //  https://gist.github.com/remy/784508  //
  ///////////////////////////////////////////

  const trim = (c) => {
    var ctx = c.getContext('2d'),
      copy = document.createElement('canvas').getContext('2d'),
      pixels = ctx.getImageData(0, 0, c.width, c.height),
      l = pixels.data.length,
      i,
      bound = {
        top: null,
        left: null,
        right: null,
        bottom: null
      },
      x, y;

      
  
    for (i = 0; i < l; i += 4) {
      if (pixels.data[i+3] !== 0) {
        x = (i / 4) % c.width;
        y = ~~((i / 4) / c.width);
    
        if (bound.top === null) {
          bound.top = y;
        }
        
        if (bound.left === null) {
          bound.left = x; 
        } else if (x < bound.left) {
          bound.left = x;
        }
        
        if (bound.right === null) {
          bound.right = x; 
        } else if (bound.right < x) {
          bound.right = x;
        }
        
        if (bound.bottom === null) {
          bound.bottom = y;
        } else if (bound.bottom < y) {
          bound.bottom = y;
        }
      }
    }
      
    var trimHeight = bound.bottom - bound.top;
    var trimWidth = bound.right - bound.left;
    //console.log(bound.left, bound.top, trimWidth, trimHeight);
    var trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    
    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);
    
    // open new window with trimmed image:
    return copy.canvas;
  };

  const makePieces = (url, sites, width, height) => {
    /**
     * Returns list of URLs representing each puzzle piece
     */
    let canvas, pixels;
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = function() {
      let images = [];
      for (let s=0; s<sites.length; s++) {
        canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
    
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
        let imageData = ctx.getImageData(0, 0, width, height);
        pixels = imageData.data;
        for (let i=0;i<pixels.length;i+=4) {
          if (!isClosest(toPoint(i, width), s, sites)) {
            pixels[i+3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        let newImg = new Image();
        newImg.crossOrigin = 'anonymous';
        newImg.src = trim(canvas).toDataURL('image/png');
        newImg.onload = function() {
          gameState.pieces.push({image: newImg, site: sites[s], location: null});
        }
        console.log('progress');
      }
      console.log('done making pieces');
    }
  };

  useEffect(() => {
    setupCanvas();
    let pageNum = Math.ceil(Math.random()*50);
    let item = Math.floor(Math.random()*100);
    console.log('fetching image');
    fetch("https://api.artic.edu/api/v1/artworks?limit=100&page=" + pageNum)
    .then(res => res.json())
    .then(json => {
      console.log('got image');
      setImageID(json.data[item].image_id);
      let height = Math.floor(json.data[item].thumbnail.height/json.data[item].thumbnail.width * 400);
      let numPieces = Math.floor(Math.random()*6+6);
      let sites = generateSites(numPieces, 400, height);
      console.log('generated sites');
      makePieces('https://www.artic.edu/iiif/2/' + json.data[item].image_id + '/full/400,/0/default.jpg', sites, 400, height);
      setInterval(() => {
        if (gameState.pieces.length === numPieces && level !== 1) {
          setLevel(1);
        }
        drawCanvas(gameState);
      }, 1000/60);
      });
    // let URL = 'https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/400,/0/default.jpg';
  }, []);

  useEffect(() => {
    /** set up level */
    if (level === 0) return;
    console.log('new level');
    gameState.rack = [0, 1, 2, 3];
    for (let i=0; i<gameState.pieces.length; i++) {
      gameState.pieces[i].location = {
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight,
      }
    }
  }, [level]);
    
  return (
    <>
      <canvas id="main-canvas" />
    </>
  );
}

export default Board;