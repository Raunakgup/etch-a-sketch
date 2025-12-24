const dimension = 500;
let numSquares = 16;

const container = document.querySelector(".container");
const changeNumSquares = document.getElementById("change-num-squares");
const clearGridButton = document.getElementById("clear-grid-button");

const defaultColor = "#7D7B791C";
const defaultColorRGB = "rgba(125, 123, 121, 0.11)";

document.documentElement.style.setProperty(
    "--default-color",
    defaultColor
);

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
    const r = getRandomNumber(255);
    const g = getRandomNumber(255);
    const b = getRandomNumber(255);
    const opacity = 0.1;
    return `rgb(${r},${g},${b},${opacity})`;
}
function getOpacity(rgbaString) {
    const match = rgbaString.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*([\d.]+))?\s*\)/);

    // If no alpha is present (i.e., rgb()), opacity is 1
    return match && match[1] !== undefined ? parseFloat(match[1]) : 1;
}
function increaseOpacity(rgbaString, increment = 0.1) {
    const match = rgbaString.match(
        /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/
    );

    if (!match) {
        throw new Error("Invalid rgb/rgba string");
    }

    const r = match[1];
    const g = match[2];
    const b = match[3];

    let a = match[4] !== undefined ? parseFloat(match[4]) : 1;
    a = Math.min(1, +(a + increment).toFixed(2));

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function changeSquareColor(targetSq) {
    const existingCol = getComputedStyle(targetSq).backgroundColor; //rgba string
    // console.log(existingCol);
    if (existingCol === defaultColorRGB) {
        const col = getRandomColor();
        targetSq.style.backgroundColor = col;
    } else {
        if (getOpacity(existingCol) == 1) return;
        const col = increaseOpacity(existingCol, 0.1);
        targetSq.style.backgroundColor = col;
    }
}

function setDefaultColor() {
    const singleSquareList = Array.from(document.querySelectorAll('.single-square'));
    singleSquareList.forEach(element => {
        element.style.backgroundColor = defaultColor;
    });
}

changeNumSquares.addEventListener("click", resetGrid);

container.addEventListener("mousemove", (e) => {
    if (!e.target.classList.contains("single-square")) return;
    changeSquareColor(e.target);
});

clearGridButton.addEventListener("click", setDefaultColor);







