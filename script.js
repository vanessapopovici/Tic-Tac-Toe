let currentPlayer = "X";
let gameOver = false;
let scores = {
    X: 0,
    O: 0,
    Tie: 0
};
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let gameMode = "PvP";

function makeMove(cellIndex){
    if(gameOver){
        return;
    }

    let selectedCell = document.getElementById("cell-" + cellIndex);

    if(selectedCell.textContent === ""){
        selectedCell.textContent = currentPlayer;

        if(checkWin()){
            return;
        }
        if(checkTie()){
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if(gameMode === "PvC" && currentPlayer === "O" && !gameOver){
            setTimeout(computerMove, 500);
        }
    }
}
function checkWin(){
    for(let i = 0; i < winningCombinations.length; i++){
        const condition = winningCombinations[i];

        let cellA = document.getElementById("cell-" + condition[0]);
        let cellB = document.getElementById("cell-" + condition[1]);
        let cellC = document.getElementById("cell-" + condition[2]);

        let textA = cellA.innerText;
        let textB = cellB.innerText;
        let textC = cellC.innerText;
        
        if(textA === "" || textB === "" || textC === ""){
            continue;
        }
        if(textA === textB && textB === textC){
            cellA.classList.add("winning-line");
            cellB.classList.add("winning-line");
            cellC.classList.add("winning-line");

            gameOver = true;

            scores[currentPlayer]++;
            document.getElementById("score-" + currentPlayer).textContent = scores[currentPlayer];

            setTimeout(() => { 
                document.addEventListener("click", resetGame, { once: true });
            }, 0);
            return true;
        }
    }
    return false;
}

function checkTie(){
    for(let i = 0; i < 9; i++){
        if(document.getElementById("cell-" + i).textContent === ""){
            return false;
        }
    }
    scores.Tie++;
    document.getElementById("score-Tie").textContent = scores.Tie;

    gameOver = true;
    setTimeout(() => {
        document.addEventListener("click", resetGame, { once: true });
    }, 0);
    return true;
}

function resetGame(){
    for(let i = 0; i < 9; i++){
        let cell = document.getElementById("cell-" + i);
        cell.innerText = "";
        cell.classList.remove("winning-line");
        }
    currentPlayer = "X";
    gameOver = false;
}
function computerMove(){
    let emptyCells = [];
    for(let i = 0; i < 9; i++){
        if(document.getElementById("cell-" + i).textContent === ""){
            emptyCells.push(i);
        }
    }
    if(emptyCells.length > 0 && !gameOver){
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
    }
}
function setGameMode(mode){
    gameMode = mode;

    document.getElementById("human-btn").classList.remove("active");
    document.getElementById("computer-btn").classList.remove("active");

    if(mode === "PvP"){
        document.getElementById("human-btn").classList.add("active");
    }
    else{
        document.getElementById("computer-btn").classList.add("active");
    }
    resetGame();
    resetScores();
}
function resetScores(){
    scores.X = 0;
    scores.O = 0;
    scores.Tie = 0;

    document.getElementById("score-X").textContent = "0";
    document.getElementById("score-O").textContent = "0";
    document.getElementById("score-Tie").textContent = "0";
}