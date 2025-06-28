const canvas = document.querySelector(".canvas");
const drawBtn = document.getElementById("drawBtn");
const rainbowBtn = document.getElementById("rnbBtn");
const eraseBtn = document.getElementById("eraseBtn");
const clearBtn = document.getElementById("clearBtn");

canvas.style.display = "flex";
canvas.style.flexWrap = "wrap";
canvas.style.width = "500px";
canvas.style.height = "500px";

let rainbowMode = false;
let eraserMode = false;

rainbowBtn.addEventListener('click', function () {
    rainbowMode = !rainbowMode;
    rainbowBtn.classList.toggle('active', rainbowMode);
});

eraseBtn.addEventListener('click', function () {
    eraserMode = !eraserMode;
    eraseBtn.classList.toggle('active', eraserMode);
    // Turn off rainbow mode if eraser is on
    if (eraserMode) {
        rainbowMode = false;
        rainbowBtn.classList.remove('active');
    }
});

clearBtn.addEventListener('click', function () {
    // Reset all squares to white
    const squares = canvas.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
        square.dataset.hue = '';
        square.dataset.lightness = '';
    });
});

function getRandomColor() {
    // HSL with high lightness for initial color
    const hue = Math.floor(Math.random() * 360);
    return {hue, lightness: 80};
}

function darkenColor(hue, lightness) {
    return `hsl(${hue}, 100%, ${Math.max(lightness - 20, 10)}%)`;
}

function gridCreation(x) {
    // Clear previous grid
    canvas.innerHTML = "";
    const gridSize = Math.sqrt(x);
    for (let i = 0; i < x; i++) {
        const square = document.createElement("div");
        square.style.width = square.style.height = `calc(100% / ${gridSize})`;
        square.style.backgroundColor = "white";
        square.style.border = "1px solid #ddd";
        square.style.boxSizing = "border-box";
        square.classList.add("square");
        square.dataset.hue = '';
        square.dataset.lightness = '';
        canvas.appendChild(square);
        square.addEventListener('mouseover', function () {
            if (eraserMode) {
                square.style.backgroundColor = 'white';
                square.dataset.hue = '';
                square.dataset.lightness = '';
            } else if (rainbowMode) {
                let hue = square.dataset.hue;
                let lightness = square.dataset.lightness;
                if (!hue || !lightness) {
                    const color = getRandomColor();
                    hue = color.hue;
                    lightness = color.lightness;
                } else {
                    lightness = Math.max(lightness - 20, 10);
                }
                square.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;
                square.dataset.hue = hue;
                square.dataset.lightness = lightness;
            } else {
                square.style.backgroundColor = 'black';
                square.dataset.hue = '';
                square.dataset.lightness = '';
            }
        });
    }
}

drawBtn.addEventListener('click', function () {
    const x = parseInt(prompt("Enter the No. of Squares (perfect square, e.g. 64 for 8x8):"), 10);
    if (!isNaN(x) && Number.isInteger(Math.sqrt(x))) {
        gridCreation(x);
    } else {
        alert("Please enter a perfect square (e.g. 16, 36, 64, 100, ...)");
    }
});




