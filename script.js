const spots = document.querySelectorAll('.spot')
const play = document.querySelector('#playbutton')
const welcome = document.querySelector('.welcome')
const intro = document.querySelector('.intro')
const boardcontainer = document.querySelector("#boardcontainer")
const selectmark = document.querySelector('.selectmark')
const xselect = document.querySelector('#xlabel')
const oselect = document.querySelector('#olabel')
const xselect1 = document.querySelector('#xselect')
const oselect1 = document.querySelector('#oselect')
const currentplabel = document.querySelector('#currentplayer')
const endarea = document.querySelector(".endarea")
const endofgame = document.querySelector("#endofgame")
const playagain = document.querySelector("#playagain")
const winlabel = document.querySelector(".winlabel")

play.addEventListener('click', () => {
    welcome.style.display = 'none'
    play.style.display = 'none'
    intro.style.display = 'none'
    selectmark.style.opacity = '1'
})

spots.forEach(spot => {
    spot.disabled = true
});

let playerOneSelect
let playerTwoSelect
let playerOneUser
let playerTwoUser
let gameControl

xselect.addEventListener('click', () => {
    xselect.style.display = 'none'
    oselect.style.display = 'none'
    playerOneSelect = '×'
    playerOneUser = 'Player 1'
    playerTwoSelect = '○'
    playerTwoUser = 'Player 2'
    gameControl = playGame(playerOneUser, playerTwoUser, playerOneSelect, playerTwoSelect)
    currentplabel.style.opacity = '1'
    boardcontainer.style.display = 'grid'
    currentplabel.textContent = `${gameControl.getCurrentPlayerName()} (${gameControl.getCurrentPlayerMarker()})`
    spots.forEach(spot => {
        spot.disabled = false 
    });
})

oselect.addEventListener('click', () => {
    xselect.style.display = 'none'
    oselect.style.display = 'none'
    playerOneSelect = '○'
    playerOneUser = 'Player 1'
    playerTwoSelect = '×'
    playerTwoUser = 'Player 2'
    gameControl = playGame(playerOneUser, playerTwoUser, playerOneSelect, playerTwoSelect)
    currentplabel.style.opacity = '1'
    boardcontainer.style.display = 'grid'
    currentplabel.textContent = `${gameControl.getCurrentPlayerName()} (${gameControl.getCurrentPlayerMarker()})`
    spots.forEach(spot => {
        spot.disabled = false 
    });
})

spots.forEach((spot, index) => {
    spot.addEventListener('click', () => {
        if (gameControl) {
            const someoneWon = gameControl.playRound(index)
            spot.textContent = gameBoard.getBoard()[index]
            if (!someoneWon) {
                currentplabel.textContent = `${gameControl.getCurrentPlayerName()} (${gameControl.getCurrentPlayerMarker()})`
            }
        }
    })
});

playagain.addEventListener('click', () => {
    gameBoard.reset()
    spots.forEach(spot => {
        spot.textContent = ''
        spot.disabled = true
    })
    currentplabel.textContent = ''
    endofgame.style.opacity = ''
    endarea.style.opacity = ''
    endofgame.style.pointerEvents = ''
    xselect.style.display = 'flex'
    oselect.style.display = 'flex'
    currentplabel.style.opacity = '0'
    boardcontainer.style.display = ''
    winlabel.textContent = ``
    playerOneSelect = null
    playerOneUser = null
    playerTwoSelect = null
    playerTwoUser = null
    gameControl = null
})

const gameBoard = (function () {
    let board = ['', '', '', '', '', '', '', '', '']
    function reset() {
        for (let i = 0; i < board.length; i++) {
            board[i] = ''
        }
    }
    function placeMark(index, marker) {
        board[index] = marker
    }
    function getBoard() {
        return board
    }
    return { board, reset, placeMark, getBoard }
})()

function newPlayer(name, marker) {
    name = name[0].toUpperCase() + name.toLowerCase().slice(1)
    marker = marker
    function getName() {
        return name
    }
    function getMarker() {
        return marker
    }
    return { name, marker, getName, getMarker }
}


const playGame = function (playerOneName, playerTwoName, playerOneMarker, playerTwoMarker) {
    const playerOne = newPlayer(playerOneName, playerOneMarker)
    const playerTwo = newPlayer(playerTwoName, playerTwoMarker)

    let currentPlayer;
    if (playerOneMarker === '○') {
        currentPlayer = playerTwo
    }
    else {
        currentPlayer = playerOne
    }

    function getCurrentPlayerName() {
        return currentPlayer.name
    }

    function getCurrentPlayerMarker() {
        return currentPlayer.marker
    }

    function playRound(index) {
        if (gameBoard.board[index] !== '') {
            return
        }
        gameBoard.placeMark(index, currentPlayer.marker)
        const someoneWon = checkWin()
        if (!someoneWon) {
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne
        }
        return someoneWon

        function checkWin() {
            const winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [3,4,5], [6,7,8], [2,4,6]]
            for (const combo of winningCombos) {
                const [a, b, c] = combo
                if (gameBoard.board[a] !== '' && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[a] === gameBoard.board[c]) {
                    spots.forEach(spot => {
                        spot.disabled = true
                    });
                    currentplabel.textContent = 'Game over'
                    endofgame.style.opacity = '1'
                    endarea.style.opacity = '1'
                    endofgame.style.pointerEvents = 'auto'
                    winlabel.textContent = `${currentPlayer.name} has won!`
                    return true
                }
            }
            const isTie = gameBoard.board.every(cell => cell !== '')
            if (isTie) {
                currentplabel.textContent = 'Game over'
                endofgame.style.opacity = '1'
                endarea.style.opacity = '1'
                endofgame.style.pointerEvents = 'auto'
                winlabel.textContent = `It's a tie!`
                return true
            }
            return false
        }
    }    
    return { playRound, getCurrentPlayerName, getCurrentPlayerMarker }
}
