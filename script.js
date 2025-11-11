let a;
let b;
let operator;

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

// returns (number)
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// returns (number)
const operate = (a, b, operator) => {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            alert("ERROR");
    }
}

// add text to display
const displayAdd = (str) => {
    // Prevent multiple decimal points
    if (display.textContent.includes(".") && str === ".") {
        return;
    }
    display.textContent += str;
}

// clear display
const clearDisplay = () => {
    display.textContent = "";
}

buttons.addEventListener("click", e => {
    let btnType = e.target.classList;
    switch (true) {
        case (btnType.contains("digit")):
            displayAdd(e.target.dataset.value);
            break;
        case (btnType.contains("operator")):
            
            
    }
})