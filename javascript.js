const dimension = 500;
let numSquares = 16;

const container = document.querySelector(".container");
const changeNumSquares = document.getElementById("change-num-squares");

function makeGrid(numSquares) {
    const singleSquareDimension = dimension / numSquares;
    document.documentElement.style.setProperty("--singleSquareDimension", singleSquareDimension);
    for (let i = 0; i < numSquares; i++) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add("row-container");
        for (let j = 0; j < numSquares; j++) {
            const singleSquare = document.createElement('div');
            singleSquare.classList.add("single-square");
            rowContainer.appendChild(singleSquare);
        }
        container.appendChild(rowContainer);
    }
}
makeGrid(numSquares);

let isNaturalNumber = str => /^[1-9]\d*$/.test(str);

function setNumSquares() {
    while (true) {
        let input = prompt("Enter the number of squares per side :");
        if (input === null) {
            alert("Cancelled");
            break;
        }
        if (input.trim() === "" || isNaN(input)) {
            alert("Invalid input. Try again.");
            continue;
        }
        input = input.trim();
        if (isNaturalNumber(input)) {
            const num = Number(input);
            if (num > 100) {
                alert("Max 100 squares per side is allowed. We have made the grid for 100 sq/side.")
            }
            numSquares = num;
            break;
        }
    }
}

function clearGrid() {
    container.replaceChildren();
}

function resetGrid() {
    setNumSquares();
    clearGrid();
    makeGrid(numSquares);
}

function getRandomNumber(num) {
    return Math.floor(Math.random() * (num + 1));
}
function getRandomColor() {
    return ({
        r: getRandomNumber(255),
        g: getRandomNumber(255),
        b: getRandomNumber(255)
    });
}
function changeSquareColor(targetSq) {
    const col = getRandomColor();
    targetSq.style.backgroundColor = `rgb(${col.r},${col.g},${col.b})`;
}
changeNumSquares.addEventListener("click", resetGrid);

container.addEventListener("mousemove", (e) => {
    if (!e.target.classList.contains("single-square")) return;
    changeSquareColor(e.target);
});






