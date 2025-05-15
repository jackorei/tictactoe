const spots = document.querySelectorAll('.spot')
const play = document.querySelector('#playbutton')
const welcome = document.querySelector('.welcome')
const intro = document.querySelector('.intro')
const boardcontainer = document.querySelector("#boardcontainer")

play.addEventListener('click', () => {
    welcome.style.opacity = '0'
    play.style.opacity = '0'
    intro.style.opacity = '0'
    boardcontainer.style.opacity = '1'
})


spots.forEach(spot => {
    spot.addEventListener('click', (e) => {
        let index = e.target.dataset.index
        console.log(`You clicked ${index}!`)
    })
});

const gameBoard = (function () {
    let board = ['', '', '', '', '', '', '', '', '']
    function reset() {
        board = ['', '', '', '', '', '', '', '', '']
    }
    function placeMark(index, marker) {
        board[index] = marker
    }
    return { board, reset, placeMark }
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
    if (playerOneMarker === 'O') {
        currentPlayer = playerTwo
    }
    else {
        currentPlayer = playerOne
    }
    function playRound(index) {
        if (gameBoard.board[index] !== '') {
            console.log("Please choose an empty spot!")
            return
        }
        gameBoard.placeMark(index, currentPlayer.marker)
        console.log(gameBoard.board)
        checkWin()
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo
        }
        else {
            currentPlayer = playerOne
        }

        function checkWin() {
            const winningCombos = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [3,4,5], [6,7,8], [2,4,6]]
            for (combo of winningCombos) {
                const [a, b, c] = combo
                if (gameBoard.board[a] !== '' && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[a] === gameBoard.board[c]) {
                    console.log(`${currentPlayer.name} wins the game!`)
                }
            }
        }
    }    

    return { playRound }
}
