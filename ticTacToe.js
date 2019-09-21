const totalBoxes = 9;
const centerBoxId = '11'
let isDraw = false;
let ticTocMoves = { totalNoOfMoves: 0, movesRemaining: ['00', '01', '02', '10', '11', '12', '20', '21', '22'], firstMove: null }
let isGameEnd = false;
let computerFlag = '2'
let player1Flag = '1'
let currentPlayerFlag = '1';

function initliazeGame() {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            ticTocMoves[i + '' + j] = null
        }
    }
}

function tableOnClickListerner(event) {
    const boxId = event.target.id;
    if (!ticTocMoves[boxId] && !isGameEnd) {
        makeMove(boxId, currentPlayerFlag);
        isGameEnd = checkWinner(boxId, currentPlayerFlag);
        if (!isGameEnd) {
            changeCurrentPlayer();
        } else {
            showResults();
        }
    }
}

function makeComputerMove(boxId) {
    setTimeout(function () {
        ticTocMoves[boxId] = computerFlag
        makeMove(boxId, computerFlag);
        changeCurrentPlayer();
    }, 500)
}

function computerMove() {
    console.log('Computer thinking...');
    const remaining = { 'edges': ['01', '10', '12', '21'], 'corners': ['00', '02', '20', '22'] }
    const moves = ticTocMoves.movesRemaining;
    // Check if computer can win
    for (m in moves) {
        ticTocMoves[moves[m]] = computerFlag
        if (checkWinner(moves[m], computerFlag)) {
            ticTocMoves[moves[m]] = computerFlag
            makeMove(moves[m], computerFlag);
            isGameEnd = true;
            showResults();
            // changeCurrentPlayer();
            return;
        }
        ticTocMoves[moves[m]] = null;
    }

    // Check if Player 1 can win
    for (m in moves) {
        ticTocMoves[moves[m]] = player1Flag
        if (checkWinner(moves[m], player1Flag)) {
            makeComputerMove(moves[m])
            return;
        }

        ticTocMoves[moves[m]] = null;
    }

    // Check if Center box is filled

    if (moves.includes(centerBoxId)) {
        makeComputerMove(centerBoxId)
        return;
    }

    // Check remaining corners or edges based on users first move
    if (ticTocMoves.firstMove === centerBoxId) {
        let remainingCorners = moves.filter(x => remaining['corners'].includes(x));
        if (remainingCorners.length) {
            const randomCorner = Math.floor(Math.random() * remainingCorners.length);
            makeComputerMove(remainingCorners[randomCorner])
            return;
        }

        let remainingEdges = moves.filter(x => remaining['edges'].includes(x));
        if (remainingEdges.length) {
            const randomEgde = Math.floor(Math.random() * remainingEdges.length);
            makeComputerMove(remainingEdges[randomEgde])
            return;
        }
    } else {
        let remainingEdges = moves.filter(x => remaining['edges'].includes(x));
        if (remainingEdges.length) {
            const randomEgde = Math.floor(Math.random() * remainingEdges.length);
            makeComputerMove(remainingEdges[randomEgde])
            return;
        }

        let remainingCorners = moves.filter(x => remaining['corners'].includes(x));
        if (remainingCorners.length) {
            const randomCorner = Math.floor(Math.random() * remainingCorners.length);
            makeComputerMove(remainingCorners[randomCorner])
            return;
        }
    }
    console.log('No player can win outside for');
}


function changeCurrentPlayer() {
    if (currentPlayerFlag === '1') {
        document.getElementById('current-player').textContent = 'Player 2'
        currentPlayerFlag = '2';
        computerMove();
    } else {
        document.getElementById('current-player').textContent = 'Player 1'
        currentPlayerFlag = '1';
    }
}

function makeMove(boxId, player) {
    const indexOfMove = ticTocMoves.movesRemaining.indexOf(boxId);
    ticTocMoves.movesRemaining.splice(indexOfMove, 1)
    ticTocMoves[boxId] = currentPlayerFlag;
    ticTocMoves.totalNoOfMoves += 1;
    if (ticTocMoves.firstMove === null) {
        ticTocMoves.firstMove = boxId
    }
    if (player === '1') {
        document.getElementById(boxId).textContent = 'X';
        document.getElementById(boxId).style.color = 'red';
    } else {
        document.getElementById(boxId).textContent = 'O';
        document.getElementById(boxId).style.color = 'blue';
    }
    document.getElementById(boxId).style.fontWeight = "700";
    document.getElementById(boxId).style.fontSize = "30";
}

function checkWinner(boxId, player) {
    let digits = boxId.toString().split('');
    let isWinner = [true, true, true, true]; // Flags to check all cases : [Row, Col, Diag1, Diag2]
    let maxCol = 2 // Extra variable to check diagonal 2

    for (i = 0; i < 3; i++) { // Checking winner in single for loop
        // Row checker :
        if (isWinner[0]) {
            if (ticTocMoves[digits[0] + '' + i] !== player) {
                isWinner[0] = false
            }
        }
        // Col checker :
        if (isWinner[1]) {
            if (ticTocMoves[i + '' + digits[1]] !== player) {
                isWinner[1] = false
            }
        }
        // Diagonal 1 checker :
        if (isWinner[2]) {
            if (ticTocMoves[i + '' + i] !== player) {
                isWinner[2] = false
            }
        }
        // Diagonal 2 checker :
        if (isWinner[3]) {
            if (ticTocMoves[i + '' + maxCol] !== player) {
                isWinner[3] = false
            }
            maxCol -= 1;
        }
    }
    if (!isWinner.includes(true) && ticTocMoves.totalNoOfMoves === totalBoxes) {
        isDraw = true;
        return true;
    }
    return isWinner.includes(true);
}

function showResults() {
    let resultMessage;
    if (isDraw) {
        resultMessage = 'Its A Draw';
    } else {
        if (currentPlayerFlag === '1') {
            resultMessage = 'Congratulations Player ' + currentPlayerFlag + '!!!';
        } else {
            resultMessage = 'Hard Luck!! Try one more time. You cant beat me anyway :D';
        }

    }
    document.getElementById('results').textContent = resultMessage
    document.getElementById('result-container').style.display = "block";
}

window.onload = initliazeGame;