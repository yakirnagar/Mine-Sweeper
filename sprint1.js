'use strict'
const EMPTY = ''
const FLAG = '🚩'
const SAD = '🤕'
const HAPPY = '😊'
const MINE = '💣'
const lives = '💗'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    numOfLives: 3
}
var gTimerInterval
var gBoard
var gIsFirstClick = true
var gLevel = {
    size: 4,
    mines: 2
}

function initGame() {
    // switch (gLevel) {
    //     case mediumBtnClicked(): { gLevel.size = 8, gLevel.mines = 14 }
    //         break
    //     case hardBtnClicked(): { gLevel.size = 12, gLevel.mines = 32 }
    //         break
    //     default: gLevel
    //     break
    // }
    gBoard = createMat(gLevel.size)
    createMines(gLevel.mines)
    renderBoard(gBoard)
    resetGame()
}

function easyBtnClicked() {
    console.log('hey')
    return gLevel = { size: 4, mines: 2 }
}
function mediumBtnClicked() {
    console.log('bey')
    return gLevel = { size: 8, mines: 14 }
}
function hardBtnClicked() {
    console.log('hey')
    return gLevel = { size: 12, mines: 32 }
}

function createMat(rows) {

    var mat = []
    for (var i = 0; i < rows; i++) {
        mat[i] = []
        for (var j = 0; j < rows; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            mat[i][j] = cell
        }
    }
    console.table(mat);
    return mat
}

function renderBoard(board) {
    // console.log(elBoard);
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '\n<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            // console.log(numOfNeg);

            var cellClass = getClassName(i, j)
            // console.log(cellClass);

            strHTML += `<td class="cell ${cellClass}" onclick="cellClicked(this, ${i},${j})">${EMPTY}</td>\n`
            // console.log(strHTML);

        } strHTML += '\n</tr>'

        var elBoard = document.querySelector('.gameBoard')
        elBoard.innerHTML = strHTML
    }
}

function getClassName(numOfRow, numOfCol) {
    var cellClass = 'cell-' + numOfRow + '-' + numOfCol
    return cellClass
}

// randomly puts mines in cells on the board
function createMines(numOfMines) {
    var randomRow
    var randomCol
    for (var i = 0; i < numOfMines; i++) {
        randomRow = getRandomIntInclusive(0, gLevel.size - 1)
        randomCol = getRandomIntInclusive(0, gLevel.size - 1)

        gBoard[randomRow][randomCol].isMine = true
    }
}

function setMinesNegsCount(cellI, cellJ) {
    var mineNegCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue
            if (i === cellI && j === cellJ) continue

            if (gBoard[i][j].isMine) mineNegCount++
        }
    }
    // console.log(mineNegCount);
    return mineNegCount
}
// first click - the game starts, revealing the number of cells around the selected cell 
function cellClicked(elCell, cellI, cellJ) {
    if (gIsFirstClick) {//settime
        gGame.isOn = true
        gIsFirstClick === false
    }
    elCell.classList.add('selected')

    if (gBoard[cellI][cellJ].isMine) {
        elCell.classList.add('mine')
        console.log('elCell:', elCell)
        elCell.innerText = MINE
        gGame.numOfLives--
        var elSpan = document.querySelector('.lives')
        // console.log(elSpan);
        elSpan.innerText = gGame.numOfLives

    }
    else {
        var cell = gBoard[cellI][cellJ]
        cell.isMarked = false
        cell.isShown = true
        cell.minesAroundCount = setMinesNegsCount(cellI, cellJ)
        elCell.innerText = cell.minesAroundCount
    }

    if (gGame.numOfLives === 0) {
        gameOver()
    }
}

// function setTimer() {
//     var timer = document.querySelector('.timer')
//     var start = Date.now()
//     console.log(start);
// }

// supposed to add a flag on each cell the user selects
function addMarkFlag(elCell) {
    document.addEventListener('onmousedown', (event) => {
        if (event.button === 2) elCell.innerText = FLAG
    })
}
    

function gameOver() {
    gGame.isOn = false
    // console.log('game over');
    var elSpan = document.querySelector('span')
    // console.log(elSpan)
    elSpan.innerText = SAD
    var eldiv = document.querySelector('.gameOver')
    eldiv.style.display = 'block'
}

function resetGame() {
    var restart = document.querySelector('.restart')
    restart.innerText = HAPPY

    var eldiv = document.querySelector('.gameOver')
    eldiv.style.display = 'none'

    var elSpan = document.querySelector('.lives')
    elSpan.innerText = gGame.numOfLives = 3
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}