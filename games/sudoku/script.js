let sudokuBoard = [];

// Function to create a Sudoku board
function createBoard() {
    const board = document.getElementById('sudoku-board');
    board.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            if (sudokuBoard[row][col] !== 0) {
                input.value = sudokuBoard[row][col];
                input.classList.add('fixed');
            }
            board.appendChild(input);
        }
    }
}

// Function to check if a number can be placed in the given position
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num || 
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
            return false;
        }
    }
    return true;
}

// Function to solve the Sudoku puzzle using backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to generate a new Sudoku puzzle
function generatePuzzle() {
    // Initialize an empty board
    sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Fill diagonal boxes to ensure a solvable puzzle
    for (let i = 0; i < 9; i += 3) {
        fillDiagonalBox(i, i);
    }

    // Solve the board completely
    solveSudoku(sudokuBoard);

    // Remove random elements to create a puzzle
    removeElements(sudokuBoard, 50);

    // Create the board in the HTML
    createBoard();
}

// Function to fill the diagonal 3x3 boxes
function fillDiagonalBox(row, col) {
    let num;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            do {
                num = Math.floor(Math.random() * 9) + 1;
            } while (!isSafeInBox(sudokuBoard, row, col, num));
            sudokuBoard[row + i][col + j] = num;
        }
    }
}

// Function to check if a number is safe to place in the diagonal box
function isSafeInBox(board, row, col, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[row + i][col + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Function to remove elements from the board to create a puzzle
function removeElements(board, count) {
    let attempts = count;
    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            attempts--;
        }
    }
}

// Function to solve the current Sudoku puzzle
function solveSudokuPuzzle() {
    const inputs = document.querySelectorAll('.sudoku-board input');
    for (let i = 0; i < inputs.length; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        if (!inputs[i].classList.contains('fixed')) {
            inputs[i].value = sudokuBoard[row][col];
        }
    }
}

// Function to check the solution
function checkSolution() {
    const inputs = document.querySelectorAll('.sudoku-board input');
    let isCorrect = true;

    for (let i = 0; i < inputs.length; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const value = parseInt(inputs[i].value);

        if (value !== sudokuBoard[row][col] && sudokuBoard[row][col] !== 0) {
            inputs[i].style.backgroundColor = 'red';
            isCorrect = false;
        } else {
            inputs[i].style.backgroundColor = 'white';
        }
    }

    if (isCorrect) {
        alert('Congratulations! You solved the Sudoku.');
    } else {
        alert('There are some mistakes in your solution.');
    }
}

// Function to reset the board
function resetBoard() {
    createBoard();
}

// Initialize the game board when the page loads
window.onload = generatePuzzle;
