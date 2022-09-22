'use strict'
const EMPTY = ''
const FLAG = '🚩'
const HAPPY = '😊'
const SAD = '🤕'
const MINE = '💣'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    numOfLives: 3
}

var gBoard
var gIsFirstClick = true
var gLevel = {
    size: 4, 
    mines: 2
}


function easyBtnClicked() {
    return gLevel = { size: 4, mines: 2 } 
}
function mediumBtnClicked() {
    return gLevel = { size: 8, mines: 14 }
}
function hardBtnClicked() {
    return gLevel = { size: 12, mines: 32 }
}


function initGame() {
    gBoard = createMat(gLevel.size)
    renderBoard(gBoard)
    
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
            var currCell = board[i][j]


            var cellClass = getClassName({ i, j })

            strHTML += `<td class="cell ${cellClass}`

            if (currCell.isMine === true) strHTML += ` mine" onclick="cellClicked(this, ${i},${j})">${MINE}</td>\n`
            else strHTML += `" onclick="cellClicked(this, ${i},${j})">${EMPTY}</td>\n`
        }
    } strHTML += '\n</tr>'

    // console.log(strHTML);

    var elBoard = document.querySelector('.gameBoard')
    elBoard.innerHTML = strHTML

}

// function renderCell(location, value) {
//     var cellSelector = '.' + getClassName(location)
//     console.log(cellSelector);
//     var elCell = document.querySelector(cellSelector)
//     elCell.innerHTML = value
// }

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j + ' hidden'
    return cellClass
}

function cellClicked(elCell, cellI, cellJ) {
    console.log(elCell);
    elCell.classList.add('selected')
    elCell.classList.remove('hidden')

    var randomRow
    var randomCol

    if (gIsFirstClick) {
        gGame.isOn = true
        for (var i = 0; i < 2; i++) {
            randomRow = getRandomIntInclusive(0, gLevel.size - 1)
            randomCol = getRandomIntInclusive(0, gLevel.size - 1)

            gBoard[randomRow][randomCol].isMine = true
        }
        gIsFirstClick = false
    }


    var cell = gBoard[cellI][cellJ]
    cell.isMarked = true
    cell.isShown = true
    cell.minesAroundCount = setMinesNegsCount(cellI, cellJ)


    if (cell.isMine) gGame.numOfLives--
    console.log(gGame.numOfLives);
    if (gGame.numOfLives === 0) gameOver()

    return renderBoard(gBoard)

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
    return mineNegCount
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}