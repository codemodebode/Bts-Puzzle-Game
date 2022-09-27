
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;
let imageNum = -1;
const characterFolderPaths = new Array("./jk", "./v", "./jimin", "./rm", "./jhope", "./suga", "./jin");

function randImg() {
    // console.log(imgOrder);
    imageNum++;
    if (imageNum === characterFolderPaths.length)
        imageNum = 0;
    document.getElementById("board").innerHTML = '';
    console.log(characterFolderPaths[imageNum]);
    createPuzzle(characterFolderPaths[imageNum])
    console.log("in randImg");
    // console.log(imgOrder)
}

// window.onload = randImg();
function createPuzzle(characterFolderPath) {
    let imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
    console.log(imgOrder)
    console.log("Chara Folder: " + characterFolderPath);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = characterFolderPath + '/' + imgOrder.shift() + ".jpg";
            console.log('src: ' + tile.src);

            //DRAG FUNCTIONALITY
            let isTouchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
            if (isTouchDevice) {

                console.log(isTouchDevice)
                console.log("Tile id: " + '#' + tile.id);
                $('#' + tile.id).draggable({ scroll: false });
                console.log(tile);
                document.getElementById("board").append(tile);
                continue;
            }

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
            console.log("Tile id: " + '#' + tile.id);


            console.log(tile);
            document.getElementById("board").append(tile);

        }
    }
}
window.onload = createPuzzle(characterFolderPaths[0]);

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }


}

// window.onload = function () {
//     // find the element that you want to drag.

//     /* listen to the touchMove event,
//     every time it fires, grab the location
//     of touch and assign it to box */

//     // box

// }

