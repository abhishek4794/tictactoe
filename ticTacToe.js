let currentPlayerFlag = '1';
const totalBoxes = 9;
let isDraw = false;
let ticTocMoves = { totalNoOfMoves: 0, movesRemaining: ['00', '01', '02', '10', '11', '12', '20', '21', '22'], firstMove: null }
let isGameEnd = false;

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

function computerMove() {
    console.log('Computer thinking...');
    const remaining = { 'edges': ['01', '10', '12', '21'], 'corners': ['00', '02', '20', '22'] }
    const moves = ticTocMoves.movesRemaining;
    for (m in moves) {
        ticTocMoves[moves[m]] = '2'
        if (checkWinner(moves[m], '2')) {
            console.log(moves[m] + 'Player 2 can win');
            ticTocMoves[moves[m]] = '2'
            makeMove(moves[m], '2');
            isGameEnd = true;
            showResults();
            // changeCurrentPlayer();
            return;
        }
        ticTocMoves[moves[m]] = null;
    }

    for (m in moves) {

        ticTocMoves[moves[m]] = '1'
        if (checkWinner(moves[m], '1')) {
            console.log(moves[m] + 'Player 1 can win');
            ticTocMoves[moves[m]] = '2'
            makeMove(moves[m], '2');
            changeCurrentPlayer();
            return;
        }

        ticTocMoves[moves[m]] = null;
        console.log('No player can win');
    }

    const center = '11'
    if (moves.includes(center)) {
        ticTocMoves[center] = '2'
        makeMove(center, '2');
        changeCurrentPlayer();
        return;
    }

    if (ticTocMoves.firstMove === '11') {
        let remainingCorners = moves.filter(x => remaining['corners'].includes(x));
        console.log(remainingCorners);
        if (remainingCorners.length) {
            const randomCorner = Math.floor(Math.random() * remainingCorners.length);

            ticTocMoves[remainingCorners[randomCorner]] = '2'
            makeMove(remainingCorners[randomCorner], '2');
            changeCurrentPlayer();
            return;
        }

        let remainingEdges = moves.filter(x => remaining['edges'].includes(x));
        console.log(remainingEdges);
        if (remainingEdges.length) {
            const randomEgde = Math.floor(Math.random() * remainingEdges.length);

            ticTocMoves[remainingEdges[randomEgde]] = '2'
            makeMove(remainingEdges[randomEgde], '2');
            changeCurrentPlayer();
            return;
        }
    } else {
        let remainingEdges = moves.filter(x => remaining['edges'].includes(x));
        console.log(remainingEdges);
        if (remainingEdges.length) {
            const randomEgde = Math.floor(Math.random() * remainingEdges.length);

            ticTocMoves[remainingEdges[randomEgde]] = '2'
            makeMove(remainingEdges[randomEgde], '2');
            changeCurrentPlayer();
            return;
        }

        let remainingCorners = moves.filter(x => remaining['corners'].includes(x));
        console.log(remainingCorners);
        if (remainingCorners.length) {
            const randomCorner = Math.floor(Math.random() * remainingCorners.length);

            ticTocMoves[remainingCorners[randomCorner]] = '2'
            makeMove(remainingCorners[randomCorner], '2');
            changeCurrentPlayer();
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