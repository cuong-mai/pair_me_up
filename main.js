var valueList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"
                 , "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
var matchedCellCount = 0;
var guessCount = 0;
var gameOver = false;
var cellOn = null;
var allCellsLocked = false;

var notificationElem = document.getElementById("notification");

var board = new Board(4, 4, valueList);

function getRandom(number_) {
    return Math.round(Math.random() * number_);
}

function check() {
    thisCell = this;
    if (!thisCell.locked && !gameOver) {
        guessCount++;
        notificationElem.innerHTML = "Guesses: " + guessCount;
        thisCell.on();
        if (cellOn == null) {
            cellOn = thisCell;
            thisCell.lock();
        } else {
            if (thisCell.value == cellOn.value) {
                thisCell.lock();
                cellOn.lock();
                matchedCellCount = matchedCellCount + 2;
                var color = "rgb(" + getRandom(255) + ", " + getRandom(255) + ", " + 
                    getRandom(255) + ")"; 
                thisCell.setColor(color);
                cellOn.setColor(color);
                cellOn = null;
                if (matchedCellCount == board.cellCount) {
                    gameOver = true;
                    notificationElem.innerHTML = "Congratulations! You have finished the game with " +
                        guessCount + " guesses!";
                }
            } else {
                setTimeout(function () {
                    cellOn.unlock();
                    thisCell.off();
                    cellOn.off();    
                    cellOn = null;
                }, 500);
            }
        }
    }
}