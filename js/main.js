'use strict';
// console.log('hallo');
var EMPTY = '';
var MINE = '💣';
var FLAG = '🚩'

var gInterval;
var gGame;
var gBoard = [];
var gCell;
var gSize;
var gFirstClick = false;
// var gLevels = { size: 4, mines: 2 };
var gLevels = [
    { size: 4, mines: 2 },
    { size: 8, mines: 10 },
    { size: 12, mines: 30 }
];


function init() {
    var restartBtn = document.querySelector('button');
    restartBtn.innerHTML = '😊'
    console.log('starter');

    gBoard = createBoard();
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isFirstClick: false,
    }
    renderBoard(gBoard);
}


function createBoard() {
    var board = [];
    var size = 4;
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            // var currCell = board[i][j]
            // neighborsAroundCount: [],
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                position: {
                    i: i,
                    j: j
                }
            }
        }
    }
    gBoard = randomMines(board);
    console.log('any budy?')

    // randomMines(2);
    // console.log('!!');

    // board[1][1].isShown = true;
    board[1][1].isMine = true;
    // board[2][2].isShown = true;
    board[2][3].isMine = true;
    console.table(board);

    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var minesNegsCount = setMinesNegsCount(i, j);
            if (minesNegsCount) {
                currCell.minesAroundCount = minesNegsCount;
            }
            // board[i][j] = 'cell cell' + i + '-' + j;
            var className = 'cell';
            var posI = board[i][j].position.i;
            var posJ = board[i][j].position.j;

            strHtml +=
                `<td onclick="cellClicked(this, ${posI}, ${posJ})"
                class="${className}"></td>`;
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;

}

function randomMines(board) {
    var minesCount = 0
    while (minesCount < gLevels.mines) {
        var num1 = getRandomInteger(0, board.length - 1)
        var num2 = getRandomInteger(0, board.length - 1)
        board[num1][num2].isMine = true
        minesCount++
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cellClicked(elCell, i, j) {
    if (gGame.isOn === false) return;
    if (gFirstClick === false) {
        // startTimer();
        gFirstClick = true;
    }
    gBoard[i][j].isShown = true;
    var negsCount = gBoard[i][j].minesAroundCount;
    if (gBoard[i][j].minesAroundCount === 0) {
        // openMinesNegs()
        elCell.innerText = gBoard[i][j].minesAroundCount;
    }
    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE;
        gameOver();
    } else {
        elCell.innerText = negsCount;
    }
}
// expandShown(board, elCell, i, j) {


// }


function setMinesNegsCount(posI, posJ) {
    var count = 0
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === posI && j === posJ) continue;
            if (gBoard[i][j].isMine) count++
        }
    }
    return count;
}


function gameOver() {
    var restartBtn = document.querySelector('button');
    restartBtn.innerHTML = '😈';
    gGame.isOn = false;
}

function restart() {
    init();

}

function changeDifficult(idx) {
    gLevels.push(idx);
    console.log('!');
    
    // renderBoard();
}

