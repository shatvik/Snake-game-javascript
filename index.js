//board
var board;
var row = 20;
var col = 20;
var cellSize = 25;
var context;

//snake head
var snakeX = cellSize * 5;
var snakeY = cellSize * 5;

//food
var foodX;
var foodY;

//snake spedd
var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

var gameOver = false;

window.onload = () => {
  board = document.getElementById("board");
  board.width = col * cellSize;
  board.height = row * cellSize;
  context = board.getContext("2d");

  placefood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "lime";
  snakeX += velocityX * cellSize;
  snakeY += velocityY * cellSize;
  context.fillRect(snakeX, snakeY, cellSize, cellSize);

  if (foodX == snakeX && foodY == snakeY) {
    snakeBody.push([foodX, foodY]);
    placefood();
  }

  for (var i = snakeBody.length - 1; i >= 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody) {
    snakeBody[0] = [snakeX, snakeY];
  }

  for (var i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], cellSize, cellSize);
  }

  //gameover

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, cellSize, cellSize);
  if (
    snakeX < 0 ||
    snakeX > col * cellSize ||
    snakeY < 0 ||
    snakeY > row * cellSize
  ) {
    gameOver = true;
    alert("Game Over !");
  }

  for (var i = 1; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over !");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placefood() {
  foodX = Math.floor(Math.random() * col) * cellSize;
  foodY = Math.floor(Math.random() * row) * cellSize;
}
