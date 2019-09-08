console.log('Loaded');
let currentPlayerFlag = '1';
let ticTocMoves = {}
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
        makeMove(boxId);
        isGameEnd = checkWinner(boxId);
        if (!isGameEnd) {
            changeCurrentPlayer();
        } else {
            showResults();
        }
    }
}

function changeCurrentPlayer() {
    if (currentPlayerFlag === '1') {
        document.getElementById('current-player').textContent = 'Player 2'
        currentPlayerFlag = '2';
    } else {
        document.getElementById('current-player').textContent = 'Player 1'
        currentPlayerFlag = '1';
    }
}

function makeMove(boxId) {
    ticTocMoves[boxId] = currentPlayerFlag;
    if (currentPlayerFlag === '1') {
        document.getElementById(boxId).textContent = 'X';
        document.getElementById(boxId).style.color = 'red';
    } else {
        document.getElementById(boxId).textContent = 'O';
        document.getElementById(boxId).style.color = 'blue';
    }
    document.getElementById(boxId).style.fontWeight = "900";
    document.getElementById(boxId).style.fontSize = "30";
}

function checkWinner(boxId) {
    let digits = boxId.toString().split('');
    let isWinner = [true, true, true, true]; // Flags to check all cases : [Row, Col, Diag1, Diag2]
    let maxCol = 2 // Extra variable to check diagonal 2

    for (i = 0; i < 3; i++) { // Checking winner in single for loop
        // Row checker :
        if (isWinner[0]) {
            if (ticTocMoves[digits[0] + '' + i] !== currentPlayerFlag) {
                isWinner[0] = false
            }
        }
        // Col checker :
        if (isWinner[1]) {
            if (ticTocMoves[i + '' + digits[1]] !== currentPlayerFlag) {
                isWinner[1] = false
            }
        }
        // Diagonal 1 checker :
        if (isWinner[2]) {
            if (ticTocMoves[i + '' + i] !== currentPlayerFlag) {
                isWinner[2] = false
            }
        }
        // Diagonal 2 checker :
        if (isWinner[3]) {
            if (ticTocMoves[i + '' + maxCol] !== currentPlayerFlag) {
                isWinner[3] = false
            }
            maxCol -= 1;
        }
    }
    return isWinner.includes(true);
}

function showResults() {
    document.getElementById('results').textContent = 'Congratulations Player ' + currentPlayerFlag + '!!!'
    document.getElementById('result-container').style.display = "block";
}

window.onload = initliazeGame;