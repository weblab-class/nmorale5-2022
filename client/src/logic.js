/** game state */
export const gameState = {
    pieces: [], // all piece objects (containing image, site, location, solution)
    rack: [], // indices of currently moveable pieces
    complete: [], // indices of pieces already added to center

    selected: null, // index of selected piece, if any
    offset: null, // offset of selected piece, if any
    original: null, // location of selected piece when first clicked, if any

    solution: null, // { x, y, width, height } of where solution will be displayed
};