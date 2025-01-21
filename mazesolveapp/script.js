const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40; // Size of each cell in the maze
const levels = [
    // Level 1
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Level 2
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],

];

let currentLevel = 0;
let maze = levels[currentLevel];
const player = { x: 1, y: 1 }; // Starting position
const goal = { x: 8, y: 8 };   // Exit position
let timer = 30;                // Timer for each level
let timerInterval;

// Update the level and UI
function updateLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        alert("Congratulations! You completed all levels!");
        resetGame();
        return;
    }
    maze = levels[currentLevel];
    player.x = 1;
    player.y = 1;
    goal.x = 8;
    goal.y = 8;
    document.getElementById("level").innerText = currentLevel + 1;
    resetTimer();
    drawMaze();
}

// Reset the game
function resetGame() {
    currentLevel = 0;
    maze = levels[currentLevel];
    player.x = 1;
    player.y = 1;
    document.getElementById("level").innerText = currentLevel + 1;
    resetTimer();
    drawMaze();
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timer = 30;
    document.getElementById("timer").innerText = timer;
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game over.");
            resetGame();
        }
    }, 1000);
}

// Draw the maze
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = "#000"; // Wall color
            } else {
                ctx.fillStyle = "#fff"; // Path color
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }

    // Draw the goal
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);

    // Draw the player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Handle keyboard input
window.addEventListener("keydown", (event) => {
    let newX = player.x;
    let newY = player.y;

    if (event.key === "ArrowUp") newY--;
    if (event.key === "ArrowDown") newY++;
    if (event.key === "ArrowLeft") newX--;
    if (event.key === "ArrowRight") newX++;

    // Check for collisions
    if (maze[newY] && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }

    // Redraw the maze
    drawMaze();

    // Check if player reached the goal
    if (player.x === goal.x && player.y === goal.y) {
        alert("Level completed!");
        updateLevel();
    }
});

// Initial setup
drawMaze();
resetTimer();
// Tambahkan event listener untuk tombol virtual
document.getElementById("btnUp").addEventListener("click", () => movePlayer("ArrowUp"));
document.getElementById("btnDown").addEventListener("click", () => movePlayer("ArrowDown"));
document.getElementById("btnLeft").addEventListener("click", () => movePlayer("ArrowLeft"));
document.getElementById("btnRight").addEventListener("click", () => movePlayer("ArrowRight"));

// Fungsi untuk menggerakkan pemain (mengganti bagian dari event listener keyboard)
function movePlayer(direction) {
    let newX = player.x;
    let newY = player.y;

    if (direction === "ArrowUp") newY--;
    if (direction === "ArrowDown") newY++;
    if (direction === "ArrowLeft") newX--;
    if (direction === "ArrowRight") newX++;

    // Periksa apakah gerakan valid
    if (maze[newY] && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }

    // Gambar ulang maze
    drawMaze();

    // Periksa apakah pemain mencapai tujuan
    if (player.x === goal.x && player.y === goal.y) {
        alert("Level completed!");
        updateLevel();
    }
}
