const dimension=500;
const numSquares=16;
const singleSquareDimension=dimension/numSquares;
document.documentElement.style.setProperty("--singleSquareDimension", singleSquareDimension);

const container = document.querySelector(".container");
function makeGrid(numSquares){
    for(let i=0; i<numSquares; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add("row-container");
        for(let j=0; j<numSquares; j++){    
            const singleSquare = document.createElement('div');
            singleSquare.classList.add("single-square");
            rowContainer.appendChild(singleSquare);
        }
        container.appendChild(rowContainer);
    }
}

makeGrid(numSquares);





