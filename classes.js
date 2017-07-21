/*
WEB222 - SCC - Lab 10
Phu Cuong Mai - 136504164
*/

class Board {
    constructor(rowCount_, colCount_, valueList_) {
        this.elem = document.createElement("div");
        this.elem.setAttribute("class", "board");
        this.cell = new Array();
        this.cellCount = 0;
        var newValueList = new Array();
        var newValueListLen = (rowCount_ * colCount_) / 2;
        for (var i = 0; i < newValueListLen; i++) {
            var randIndex = this.getRandom(valueList_.length - 1);
            newValueList.push(valueList_[randIndex]);
            newValueList.push(valueList_[randIndex]);
        }
        
        this.shuffleValueList(newValueList, 20);
        
        for (var r = 0; r < rowCount_; r++) {
            var rowElem = document.createElement("div");
            rowElem.setAttribute("class", "row");
            this.cell[r] = new Array();
            
            for (var c = 0; c < colCount_; c++) {
                this.cell[r][c] = new Cell(r, c, newValueList[r * (colCount_) + c]);
                rowElem.appendChild(this.cell[r][c].elem);
                this.cellCount++;
            }
            this.elem.appendChild(rowElem);
        }
        var boardContainer = document.getElementById("board-container");
        boardContainer.appendChild(this.elem);
    }
    
    getRandom(number_) {
        return Math.round(Math.random() * number_);
    }

    shuffleValueList(valueList_, times_) {
        for (var t = 0; t < times_; t++) {
            var i = this.getRandom(valueList_.length - 1);
            var j = this.getRandom(valueList_.length - 1);
            var valueTmp = valueList_[i];
            valueList_[i] = valueList_[j];
            valueList_[j] = valueTmp;
        }
    }
}

class Cell {
    constructor(row_, col_, text_) {
        this.row = row_;
        this.col = col_;
        this.value = text_;
        this.visible = false;
        this.locked = false;
        
        this.textElem = document.createElement("span");
        this.textElem.innerHTML = text_;
        this.textElem.style.display = "none";
        
        this.elem = document.createElement("div");
        this.elem.setAttribute("class", "cell");
        this.elem.appendChild(this.textElem);
        
        var thisCell = this;
        this.elem.addEventListener("click", function () {
            check.call(thisCell);
        });
    }
    
    on() {
        this.visible = true;
        this.textElem.style.display = "inline";
    }
    
    off() {
        this.visible = false;
        this.textElem.style.display = "none";
    }
    
    toggle() {
        if (this.visible) {
            this.off();
        } else {
            this.on();
        }
    }
    
    lock() {
        this.locked = true;
        this.elem.style.cursor = "default";
    }
    
    unlock() {
        this.locked = false;
        this.elem.style.cursor = "pointer";
    }
    
    setColor(color_) {
        this.textElem.style.color = color_;
    }
}