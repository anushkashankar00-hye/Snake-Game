const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const box = 20;
const canvasSize = 400;

let snake;
let direction;
let food;
let score;
let game;

// ================= START GAME =================
startGame();

// ================= KEYBOARD CONTROL =================
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  }

  else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  }

  else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  }

  else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

// ================= START / RESTART FUNCTION =================
function startGame() {

  // Snake Start Position
  snake = [
    { x: 200, y: 200 }
  ];

  // Starting Direction
  direction = "RIGHT";

  // Random Food Position
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };

  // Reset Score
  score = 0;
  scoreText.innerText = score;

  // Remove Old Game Loop
  clearInterval(game);

  // Start New Game Loop
  game = setInterval(drawGame, 300);
}

// ================= MAIN GAME FUNCTION =================
function drawGame() {

  // Background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // ================= DRAW SNAKE =================
  for (let i = 0; i < snake.length; i++) {

    ctx.fillStyle = (i === 0) ? "lime" : "green";

    ctx.fillRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );

    ctx.strokeStyle = "#111";

    ctx.strokeRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );
  }

  // ================= DRAW FOOD =================
  ctx.fillStyle = "red";

  ctx.fillRect(
    food.x,
    food.y,
    box,
    box
  );

  // ================= SNAKE HEAD POSITION =================
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // ================= MOVE SNAKE =================
  if (direction === "UP") {
    snakeY -= box;
  }

  if (direction === "DOWN") {
    snakeY += box;
  }

  if (direction === "LEFT") {
    snakeX -= box;
  }

  if (direction === "RIGHT") {
    snakeX += box;
  }

  // ================= FOOD EAT =================
  if (snakeX === food.x && snakeY === food.y) {

    score++;
    scoreText.innerText = score;

    // New Food Position
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

  } else {

    // Remove Tail
    snake.pop();
  }

  // ================= NEW HEAD =================
  const newHead = {
    x: snakeX,
    y: snakeY
  };

  // ================= GAME OVER =================
  if (

    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize ||
    collision(newHead, snake)

  ) {

    clearInterval(game);

    // Restart Popup
    const restart = confirm(
      "Game Over 😢\n\nYour Score: " +
      score +
      "\n\nRestart Game?"
    );

    if (restart) {
      startGame();
    }

    return;
  }

  // Add New Head
  snake.unshift(newHead);
}

// ================= COLLISION FUNCTION =================
function collision(head, array) {

  for (let i = 0; i < array.length; i++) {

    if (
      head.x === array[i].x &&
      head.y === array[i].y
    ) {
      return true;
    }
  }

  return false;
}