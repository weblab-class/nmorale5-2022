import React, { useState, useEffect, Component } from "react";
import Piece from "./Piece.js";
import "./Board.css";

class Board extends Component {
  constructor(props) {
    super(props);
  }

  generateSites = (n, width, height) => {
    /**
     * Returns n random sites for voronoi construction {x, y}
     */
    let sites = []
    for (let i=0; i<n; i++) {
      sites.push({x:Math.random()*width, y:Math.random()*height})
    } return sites;
  }

  distance = (pointA, pointB) => {
    return Math.hypot(pointA.x-pointB.x, pointA.y-pointB.y);
  }

  isClosest = (point, site, sites) => {
    /**
     * Returns whether a point is closest to a given site
     */
    let index, dist, minDist = Infinity;
    for (let i=0;i<sites.length;i++) {
      dist = this.distance(point, sites[i]);
      if (dist < minDist) {
        minDist = dist;
        index = i
      }
    }
    return site === index;
  }

  toPoint = (index, width) => {
    /**
     * Converts pixel index to point object {x, y}
     */
    let pixel = Math.floor(index/4);
    return {x: pixel % width, y: Math.floor(pixel/width)};
  }

  getPieces = (url, sites, width, height) => {
    /**
     * Returns list of URLs representing each puzzle piece
     */
    let ctx, canvas, imageData, pixels, img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    let canvases = [];
    let contexts = [];
    let urls = [];
    for (let s=0; s<sites.length; s++) {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      imageData = ctx.getImageData(0, 0, width, height);
      pixels = imageData.data;
      for (let i=0;i<pixels.length;i+=4) {
        if (!this.isClosest(this.toPoint(i, width), s, sites)) {
          pixels[i] = pixels[i+1] = pixels[i+2] = pixels[i+3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      urls.push(canvas.toDataURL('image/png'));
      canvases.push(canvas);
      contexts.push(ctx);
    }
    return urls;
  }

  render() {
    let URL = 'https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/400,/0/default.jpg';
    let sites = this.generateSites(8, 400, 266);
    let pieces = this.getPieces(URL, sites, 400, 266);
    return (
      <>
        <p>hello</p>
        {pieces.map((url, index) => {
            return(<img key={index} src={ url }/>)
        })}
      </>
    );
  }
}

export default Board;