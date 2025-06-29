// Constants
const DISPLAY_DECIMAL_PLACES = 2;
const MAX_OPERAND_LENGTH = 6;

// Globals
let operand1 = null;    // V
let operand2 = null;    // Stored as a string
let operator = null;

// Element References
let display = document.querySelector(".display p");

onStart();

function onStart() {
    // Set up the main buttons (Numbers, decimal, equal, and math buttons)
    let mainButtons = document.querySelectorAll(".mainButtons button, .mathButtons button");
    mainButtons.forEach((element) => {
        element.addEventListener("click", onMainButtonPress);
    });

    // Set up Clear/Delete buttons
    let clearButtons = document.querySelectorAll(".clearButtons button");
    clearButtons.forEach((element) => {
        element.addEventListener("click", onClearButtonPress);
    });

    // Set up keyboard inputs
    document.addEventListener("keydown", onMainButtonPress);
    document.addEventListener("keydown", onClearButtonPress);
}

function operate() {
    let result;
    operand1 = +operand1; // They're stored as strings
    operand2 = +operand2;
    
    switch (operator) {
        case "/":
            if (operand2 === 0) { result = 0; }
            else { result = operand1 / operand2; }
            break;
        case "X":
            result = operand1 * operand2;
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "+":
            result = operand1 + operand2;
            break;
    }

    if (!Number.isInteger(+result)) {
        result = result.toFixed(DISPLAY_DECIMAL_PLACES);
    }

    // Display
    display.textContent = result;

    // Cleanup
    operand1 = null;
    operand2 = null;
    operator = null;
}

function onMainButtonPress(e) {
    let symbol;
    if (e.type == "click") {
        symbol = e.target.textContent;
    }
    else {
        symbol = e.key;

        // Symbol Corrections
        if (symbol === "x" || symbol === "*") { symbol = "X"; }
        if (symbol === "Enter") {symbol = "="; }
        if (symbol === "\\") {symbol = "/"; }
    }

    switch (symbol) {
        case ".":
            // If the current operand is empty, append a 0 to the display (only) beforehand
            if (operand1 === null || (operand2 === null && operator !== null)) {
                if (operand1 === null) {
                    display.textContent = "0";
                }
                else {
                    display.textContent += "0";
                }
            }    
            // If there's already a "."
            if ((operand1 !== null && operator === null && operand1.includes(".")) || (operand2 !== null && operand2.includes("."))) {
                return;
            }
            // Intentionally flow into rest of switch statement
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            // Are there too many character in the operand?
            if (operator === null && operand1 !== null && operand1.length >= MAX_OPERAND_LENGTH
                || operator !== null && operand2 !== null && operand2.length >= MAX_OPERAND_LENGTH) { return; }

            // Account for the case of the user just typing "."
            if (operand1 === null && display.textContent !== "0") {
                display.textContent = symbol;
            }
            else {
                display.textContent += symbol;
            }

            if (operator === null) {
                if (operand1 === null) { operand1 = symbol; }
                else { operand1 += symbol; }
            }
            else {
                if (operand2 === null) { operand2 = symbol; }
                else { operand2 += symbol; }
            }
            break;
        case "/":
        case "X":
        case "-":
        case "+":
            if (operand1 !== null && operator === null) {
                // Standard behavior, if you hit a number then hit a symbol
                operator = symbol;
                if (display.textContent.at(display.textContent.length - 1) === ".") { display.textContent += "0"; }
                display.textContent += " " + symbol + " ";
            }
            else if (operand1 !== null && operator !== null && operand2 !== null) {
                // If you've arleady typed a full expression, but then type
                // another operator, it calculates the first expression,
                // at treats it as the first operand.
                operate();
                operand1 = display.textContent;
                operator = symbol;
                if (display.textContent.at(display.textContent.length - 1) === ".") { display.textContent += "0"; }
                display.textContent += " " + symbol + " ";
            }
            else if (operand1 === null && operator === null && operand2 === null && display.textContent !== "") {
                // If you've just completed an operation and press an
                // operator, it will treat the result as the first operand
                operand1 = display.textContent;
                operator = symbol;
                if (display.textContent.at(display.textContent.length - 1) === ".") { display.textContent += "0"; }
                display.textContent += " " + symbol + " ";
            }
        case "=":
            if (operand1 === ".") {
                operand1 = 0;
            }
            if (operand2 === ".") {
                operand2 = 0;
            }
            if (operand1 != null && operator != null && operand2 != null) {
                operate();
            }
    }
}

function onClearButtonPress(e) {
    if ((e.type === "click" && e.target.id === "clearButton") || (e.type === "keydown" && e.key === "Delete")) {
        display.textContent = "";
        operand1 = null;
        operator = null;
        operand2 = null;
    }
    else if ((e.type === "click" && e.target.id === "backspaceButton") || (e.type === "keydown" && e.key === "Backspace")) {
        display.textContent = display.textContent.slice(0, -1);

        // Remove a character from the latest possible chunk of
        // the expression
        if (operand2 != null) {
            operand2 = operand2.slice(0, -1);
        }
        else if (operator != null) {
            operator = null;
        }
        else if (operand1 != null) {
            operand1 = operand1.slice(0, -1);
        }
    }
}