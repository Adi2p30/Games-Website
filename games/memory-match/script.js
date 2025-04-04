const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let incorrectAttempts = 0;

function initializeBoard() {
    cards = shuffle(cards);
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    // Reset incorrect attempts counter
    incorrectAttempts = 0;
    document.getElementById('incorrect-attempts').textContent = incorrectAttempts;
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matches++;
        resetBoard();
        if (matches === symbols.length) {
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        incorrectAttempts++;
        document.getElementById('incorrect-attempts').textContent = incorrectAttempts;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function restartGame() {
    initializeBoard();
    matches = 0;
}

document.addEventListener('DOMContentLoaded', initializeBoard);
