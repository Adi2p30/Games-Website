const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
const player = 'X';
const ai = 'O';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');
    
    if (cell.textContent !== '' || !isGameActive()) return;

    makeMove(cellIndex, player);
    if (isGameActive()) {
        makeMove(getBestMove(), ai);
    }
}

function makeMove(index, player) {
    cells[index].textContent = player;
    cells[index].classList.add(player);
}

function getBestMove() {
    return minimax(cells.map(cell => cell.textContent), ai).index;
}

function minimax(newBoard, player) {
    const availSpots = newBoard.reduce((acc, el, idx) => el === '' ? acc.concat(idx) : acc, []);

    if (checkWin(newBoard, player)) {
        return { score: player === ai ? 10 : -10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === ai) {
            const result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newBoard, 'O');
            move.score = result.score;
        }

        newBoard[availSpots[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === ai) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWin(board, player) {
    const plays = board.reduce((acc, el, idx) => el === player ? acc.concat(idx) : acc, []);
    let gameWon = null;
    for (let [index, win] of winningCombinations.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function isGameActive() {
    return !checkWin(cells.map(cell => cell.textContent), player) && !checkWin(cells.map(cell => cell.textContent), ai) && cells.some(cell => cell.textContent === '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(player);
        cell.classList.remove(ai);
    });
    currentPlayer = player;
}
