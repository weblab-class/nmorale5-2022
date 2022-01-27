/** game state */
export const gameState = {
    pieces: [], // all piece objects (containing image, site, location)
    rack: [], // indices of currently moveable pieces
    complete: [], // indices of pieces already added to center
    selected: null, // index of selected piece, if any
    offset: null, // offset of selected piece, if any
};