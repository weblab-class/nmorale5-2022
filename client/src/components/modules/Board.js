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

  /////////////////////////////////////////
  // https://gist.github.com/remy/784508 //
  /////////////////////////////////////////

  trim(c) {
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
      
    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
    
    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);
    
    // open new window with trimmed image:
    return copy.canvas;
  }

  getPieces = (url, sites, width, height) => {
    /**
     * Returns list of URLs representing each puzzle piece
     */
    let ctx, canvas, imageData, pixels, img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
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
          // pixels[i] = pixels[i+1] = pixels[i+2] = 
          pixels[i+3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      urls.push(this.trim(canvas).toDataURL('image/png'));

      //urls.push(canvas.toDataURL('image/png'));
    }
    return urls;
  }

  ///////////////////////////////////////////////////
  //                                               //
  //        BELOW IS LITERALLY TAKEN FROM:         //
  //  https://en.js.cx/task/drag-heroes/solution/  //
  //                                               //
  ///////////////////////////////////////////////////

  dragNDrop = () => {
    let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // on drag start:
  //   remember the initial shift
  //   move the element position:fixed and a direct child of body
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // switch to absolute coordinates at the end, to fix the element in the document
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // new window-relative coordinates
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // check if the new coordinates are below the bottom window edge
    let newBottom = newY + dragElement.offsetHeight; // new bottom

    // below the window? let's scroll the page
    if (newBottom > document.documentElement.clientHeight) {
      // window-relative coordinate of document end
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // scroll the document down by 10px has a problem
      // it can scroll beyond the end of the document
      // Math.min(how much left to the end, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // calculations are imprecise, there may be rounding errors that lead to scrolling up
      // that should be impossible, fix that here
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // a swift mouse move make put the cursor beyond the document end
      // if that happens -
      // limit the new Y by the maximally possible (right at the bottom of the document)
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // check if the new coordinates are above the top window edge (similar logic)
    if (newY < 0) {
      // scroll up
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // check precision errors

      window.scrollBy(0, -scrollY);
      // a swift mouse move can put the cursor beyond the document start
      newY = Math.max(newY, 0); // newY may not be below 0
    }


    // limit the new X within the window boundaries
    // there's no scroll here so it's simple
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});

  }

  ///////////////////////////////////////////////////
  //                                               //
  //        ABOVE IS LITERALLY TAKEN FROM:         //
  //  https://en.js.cx/task/drag-heroes/solution/  //
  //                                               //
  ///////////////////////////////////////////////////

  render() {
    let URL = 'https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/400,/0/default.jpg';
    let sites = this.generateSites(Math.random()*6+6, 400, 266);
    let pieces = this.getPieces(URL, sites, 400, 266);
    this.dragNDrop();
    
    return (
      <>
        {pieces.map((url, index) => {
            return(<img key={index} src={ url } className="draggable"/>)
        })}
      </>
    );
  }
}

export default Board;