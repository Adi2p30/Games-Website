const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10, paddleHeight = 100, paddleSpeed = 6;
const playerPaddle = { x: 0, y: (canvas.height - paddleHeight) / 2, dy: 0 };
const aiPaddle = { x: canvas.width - paddleWidth, y: (canvas.height - paddleHeight) / 2, dy: 0 };

// Ball properties
const ballSize = 10;
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

// Player and AI scores
let playerScore = 0;
let aiScore = 0;

// Event listeners for player paddle movement
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
canvas.addEventListener('touchstart', touchStartHandler);
canvas.addEventListener('touchmove', touchMoveHandler);
canvas.addEventListener('touchend', touchEndHandler);

function keyDownHandler(event) {
    if (event.key === 'ArrowUp') {
        playerPaddle.dy = -paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        playerPaddle.dy = paddleSpeed;
    }
}

function keyUpHandler(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        playerPaddle.dy = 0;
    }
}

function touchStartHandler(event) {
    event.preventDefault();
    const touchY = event.touches[0].clientY;
    if (touchY < playerPaddle.y + paddleHeight / 2) {
        playerPaddle.dy = -paddleSpeed;
    } else {
        playerPaddle.dy = paddleSpeed;
    }
}

function touchMoveHandler(event) {
    event.preventDefault();
    const touchY = event.touches[0].clientY;
    if (touchY < playerPaddle.y + paddleHeight / 2) {
        playerPaddle.dy = -paddleSpeed;
    } else {
        playerPaddle.dy = paddleSpeed;
    }
}

function touchEndHandler(event) {
    event.preventDefault();
    playerPaddle.dy = 0;
}

function movePaddles() {
    playerPaddle.y += playerPaddle.dy;
    aiPaddle.y += aiPaddle.dy;

    // Prevent paddles from going out of bounds
    if (playerPaddle.y < 0) playerPaddle.y = 0;
    if (playerPaddle.y + paddleHeight > canvas.height) playerPaddle.y = canvas.height - paddleHeight;
    if (aiPaddle.y < 0) aiPaddle.y = 0;
    if (aiPaddle.y + paddleHeight > canvas.height) aiPaddle.y = canvas.height - paddleHeight;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y < 0 || ball.y + ballSize > canvas.height) {
        ball.dy *= -1.01;
    }

    // Ball collision with player paddle
    if (ball.x < playerPaddle.x + paddleWidth &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + paddleHeight) {
        ball.dx *= -1.01;
    }

    // Ball collision with AI paddle
    if (ball.x + ballSize > aiPaddle.x &&
        ball.y > aiPaddle.y &&
        ball.y < aiPaddle.y + paddleHeight) {
        ball.dx *= -1;
    }

    // Ball goes out of bounds (player scores)
    if (ball.x < 0) {
        aiScore++;
        resetBall();
    }

    // Ball goes out of bounds (AI scores)
    if (ball.x + ballSize > canvas.width) {
        playerScore++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1; // Change ball direction
}

function drawPaddle(x, y, width, height) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, width, height);
}

function drawBall(x, y, size) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, size, size);
}

function drawScores() {
    context.font = '32px Arial';
    context.fillText(playerScore, canvas.width / 4, 50);
    context.fillText(aiScore, 3 * canvas.width / 4, 50);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight);
    drawPaddle(aiPaddle.x, aiPaddle.y, paddleWidth, paddleHeight);
    drawBall(ball.x, ball.y, ballSize);
    drawScores();
}

function update() {
    movePaddles();
    moveBall();

    // Basic AI movement
    if (ball.y < aiPaddle.y + paddleHeight / 2) {
        aiPaddle.dy = -paddleSpeed;
    } else {
        aiPaddle.dy = paddleSpeed;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    playerScore = 0;
    aiScore = 0;
    resetBall();
    playerPaddle.y = (canvas.height - paddleHeight) / 2;
    aiPaddle.y = (canvas.height - paddleHeight) / 2;
}

gameLoop();
