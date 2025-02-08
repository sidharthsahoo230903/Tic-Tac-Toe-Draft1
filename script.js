const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const turnIndicator = document.getElementById("turnIndicator");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.classList.add(currentPlayer === 'X' ? 'cross' : 'circle');

    const winner = checkWinner();
    if (winner) {
        turnIndicator.textContent = `${currentPlayer} Wins! 🎉`;
        highlightWinningCells(winner);
        showConfetti();  // 🎉 Show confetti when someone wins!
        gameActive = false;
    } else if (!gameBoard.includes("")) {
        turnIndicator.textContent = "It's a Draw! 🤡";
        showClownFace();  // 🤡 Show clown face when it's a draw!
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnIndicator.textContent = `${currentPlayer} Turn`;
    }
}

function checkWinner() {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return combo;
        }
    }
    return null;
}

function highlightWinningCells(combo) {
    combo.forEach(index => cells[index].classList.add("win"));
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    turnIndicator.textContent = "X Turn";
    
    // Remove marks and highlight
    cells.forEach(cell => {
        cell.classList.remove("cross", "circle", "win");
    });
}

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
});

// Reset button event listener
resetButton.addEventListener("click", resetGame);

// 🎊 Confetti Animation
function showConfetti() {
    for (let i = 0; i < 20; i++) {  // Create 20 confetti pieces
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        // Random position & color
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.background = ["red", "yellow", "blue", "green", "pink"][Math.floor(Math.random() * 5)];
        confetti.style.animationDuration = (1 + Math.random()) + "s";

        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 1500);
    }
}

// 🤡 Clown Face Animation
function showClownFace() {
    let clown = document.createElement("div");
    clown.classList.add("clown");
    clown.innerHTML = "🤡";  // Clown emoji
    document.body.appendChild(clown);

    // Fade out clown face after 1.5s
    setTimeout(() => clown.classList.add("fade-out"), 1000);
    setTimeout(() => clown.remove(), 2500);
}