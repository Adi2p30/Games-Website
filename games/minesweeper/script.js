document.addEventListener('DOMContentLoaded', () => {
    const minesweeperContainer = document.getElementById('minesweeper');
    const playAgainButton = document.getElementById('play-again');
    const gridSize = 9;
    const mineCount = 12;
    let grid = [];
    let minePositions = [];
    let gameOver = false;

    playAgainButton.addEventListener('click', initGame);

    function initGame() {
        minesweeperContainer.innerHTML = '';
        grid = [];
        minePositions = [];
        gameOver = false;
        generateGrid();
        placeMines();
        addNumbers();
    }

    function generateGrid() {
        for (let row = 0; row < gridSize; row++) {
            const rowArray = [];
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                cell.addEventListener('click', revealCell);
                cell.addEventListener('contextmenu', flagCell);
                minesweeperContainer.appendChild(cell);
                rowArray.push({ revealed: false, mine: false, number: 0, flagged: false });
            }
            grid.push(rowArray);
        }
    }

    function placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            if (!grid[row][col].mine) {
                grid[row][col].mine = true;
                minePositions.push([row, col]);
                minesPlaced++;
            }
        }
    }

    function addNumbers() {
        for (let [row, col] of minePositions) {
            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r >= 0 && r < gridSize && c >= 0 && c < gridSize && !grid[r][c].mine) {
                        grid[r][c].number++;
                    }
                }
            }
        }
    }

    function revealCell(event) {
        if (gameOver) return;
        const row = parseInt(event.target.getAttribute('data-row'));
        const col = parseInt(event.target.getAttribute('data-col'));
        if (grid[row][col].flagged || grid[row][col].revealed) return;

        grid[row][col].revealed = true;
        event.target.classList.add('revealed');

        if (grid[row][col].mine) {
            event.target.innerHTML = '💣';
            gameOver = true;
            alert('Game Over!');
            return;
        }

        if (grid[row][col].number > 0) {
            event.target.innerHTML = grid[row][col].number;
        } else {
            revealAdjacentCells(row, col);
        }
    }

    function flagCell(event) {
        event.preventDefault();
        if (gameOver) return;
        const row = parseInt(event.target.getAttribute('data-row'));
        const col = parseInt(event.target.getAttribute('data-col'));
        if (grid[row][col].revealed) return;

        grid[row][col].flagged = !grid[row][col].flagged;
        event.target.classList.toggle('flagged');
        event.target.innerHTML = grid[row][col].flagged ? '🚩' : '';
    }

    function revealAdjacentCells(row, col) {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < gridSize && c >= 0 && c < gridSize && !grid[r][c].revealed && !grid[r][c].mine) {
                    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                    revealCell({ target: cell });
                }
            }
        }
    }

    initGame();
});
