// script.js
let Game = document.querySelector("#game");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let winner = document.querySelector("#winner");

let turnX = true;

let wPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            box.classList.add("x");
            turnX = false;
        } else {
            box.innerText = "O";
            box.classList.add("o");
            turnX = true;
        }
        
        box.disabled = true;
        Patterns();
    });
});

function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}
function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
        winner.innerText = "";
    }
}

const Patterns = () => {
    for (let pattern of wPatterns) {
        let turn1 = boxes[pattern[0]].innerText;
        let turn2 = boxes[pattern[1]].innerText;
        let turn3 = boxes[pattern[2]].innerText;
        
        if (turn1 != "" && turn2 != "" && turn3 != "") {
            if (turn1 === turn2 && turn2 === turn3) {
                winner.innerText = `Congratulations ${turn1} you are Winner`;
                disableBoxes();
                Game.classList.add("hide");
                newGame.classList.add("block");
                return; // Exit if there's a winner
            }
        }
    }
    
    // Check for tie
    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }
    if (allFilled) {
        winner.innerText = "It's a Tie!";
        disableBoxes();
        Game.classList.add("hide");
        newGame.classList.add("block");
    }
};

resetBtn.addEventListener("click", () => {
  turnX = true;
  enableBoxes();
});

newGame.addEventListener("click", () => {
    Game.classList.remove("hide");
    newGame.classList.remove("block");
    enableBoxes();
  });