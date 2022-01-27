import { gameState } from "./logic.js";

let CANVAS;
let CONTEXT;

/** mouse listeners */
export const setupCanvas = () => {
    CANVAS = document.getElementById('main-canvas');
    CONTEXT = CANVAS.getContext('2d');
    CANVAS.addEventListener("mousedown",onMouseDown);
    CANVAS.addEventListener("mousemove",onMouseMove);
    CANVAS.addEventListener("mouseup",onMouseUp);
}

const getSelectedPiece = (loc) => {
    let p;
    for (let i=gameState.rack.length-1; i>=0; i--) {
        p = gameState.pieces[gameState.rack[i]];
        if (loc.x > p.location.x && loc.x < p.location.x + p.image.width &&
            loc.y > p.location.y && loc.y < p.location.y + p.image.height) {
                gameState.selected = gameState.rack[i];
                gameState.rack.splice(i, 1);
                return;
        }
    }
    gameState.selected = null;
};

const onMouseDown = (e) => {
    getSelectedPiece(e);
    if (gameState.selected !== null) {
        gameState.offset = { 
            x:e.x-gameState.pieces[gameState.selected].location.x,
            y:e.y-gameState.pieces[gameState.selected].location.y,
        }
        gameState.original = {...gameState.offset};
    }
};

const onMouseMove = (e) => {
    if (gameState.selected !== null) {
        gameState.pieces[gameState.selected].location.x
            = e.x - gameState.offset.x;
        gameState.pieces[gameState.selected].location.y
            = e.y - gameState.offset.y;
    }
};

const onMouseUp = () => {
    if (gameState.selected === null) return;
    let p = gameState.pieces[gameState.selected];
    let dist = Math.abs(p.location.x - (p.solution.x + gameState.solution.x)) +
        Math.abs(p.location.y - (p.solution.y + gameState.solution.y));
    if (dist < 20) {
        p.location.x = p.solution.x + gameState.solution.x;
        p.location.y = p.solution.y + gameState.solution.y;
        gameState.complete.push(gameState.selected);
    } else {
        gameState.rack.push(gameState.selected);
    }
    gameState.selected = null;
};

/** main draw */
export const drawCanvas = (drawState) => {
    if (!CANVAS) return;
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    /** canvas background */
    CONTEXT.fillStyle = 'black';
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

    /** solution background */
    if (drawState.solution) {
        CONTEXT.fillStyle = 'grey';
        let s = drawState.solution;
        CONTEXT.fillRect(s.x, s.y, s.width, s.height);
    }

    /** display solved pieces */
    let p;
    for (let i of drawState.complete) {
        p = drawState.pieces[i];
        CONTEXT.drawImage(p.image, p.location.x, p.location.y);
    }

    /** display rack pieces */
    for (let i of drawState.rack) {
        p = drawState.pieces[i];
        CONTEXT.drawImage(p.image, p.location.x, p.location.y);
    }

    /** display selected piece */
    if (drawState.selected !== null) {
        p = drawState.pieces[drawState.selected];
        CONTEXT.drawImage(p.image, p.location.x, p.location.y);
    }
}