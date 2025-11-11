let a = null;
let b = null;
let operator = null;
let operatorPressed = false;
let displayingResult = false;
const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

// returns (number)
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
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
            console.log(`25error:\na: ${a}\nb: ${b}\noperator: ${operator}\operatorPressed: ${operatorPressed}\ndisplayingResult: ${displayingResult}`);
    }
}

// rounding
function roundToSigFig(num, sig = 10) {
    if (num === 0) return 0; 
    
    const multiplier = Math.pow(10, sig - 1 - Math.floor(Math.log10(Math.abs(num))));
    return Math.round(num * multiplier) / multiplier;
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
    displayingResult = false;
}
// reset var
const resetVar = () => {
    a = null;
    b = null;
    operator = null;
    displayingResult = false;
    operatorPressed = false;
}
// reset
const reset = () => {
    clearDisplay();
    resetVar();
}
// delete
const displayDelete = () => {
    display.textContent = display.textContent.slice(0, -1);
}

// enter pressed
const enterPressed = () => {
    if (display.textContent !== "" && b === null) {
        b = Number(display.textContent);
        clearDisplay();
        displayingResult = false;
    }
    
    if (a === null || b === null || operator === null) {
        console.log(`73error:\na: ${a}\nb: ${b}\noperator: ${operator}\operatorPressed: ${operatorPressed}\ndisplayingResult: ${displayingResult}`);
        return;
    }

    a = operate(a, b, operator);
    
    displayAdd(roundToSigFig(a));

    displayingResult = true;
    b = null;
    operator = null;
    operatorPressed = false;
}



// for action keys
const performAction = (action) => {
    switch (action) {
        case ("clear"):
            reset();
            break;
        case ("delete"):
            displayDelete();
            break;
        case ("="):
            enterPressed();
    }
}

// return btnType (str)
const getBtnType = (btnClassList) => {
    switch (true) {
        case (btnClassList.contains("digit")):
            return "digit";
        case (btnClassList.contains("action")):
            return "action";
        case (btnClassList.contains("operator")):
            return "operator";
        default:
            return;
    }
}


buttons.addEventListener("click", e => {
    let target = e.target;
    let btnType = getBtnType(target.classList);

    switch (btnType) {
        case ("digit"):
            if (displayingResult) {
                if (operatorPressed) {
                    clearDisplay();
                } else {
                    reset();
                }
            }
            displayAdd(target.dataset.value);
            break;
        case ("operator"):
            if (displayingResult) {
                clearDisplay();
                operator = target.dataset.op;
                operatorPressed = true;
                break;
            }
            // a: null, b: null, operator: null, operatorPressed: false, displayingResult: false
            if (!operatorPressed && a === null) {
                a = Number(display.textContent);
                operator = target.dataset.op;
                operatorPressed = true;
                clearDisplay();
                break;
            }
            // change operator
            if (a !== null && operatorPressed && display.textContent === "") {
                operator = target.dataset.op;
                break;
            }
            if (a !== null && operatorPressed && display.textContent !== "") {
                let nextOperator = target.dataset.op;
                enterPressed();
                operator = nextOperator;
                operatorPressed = true;
                break;
            }
        case ("action"):
            performAction(target.dataset.action);
            break;
        default:
            break;
    }
})