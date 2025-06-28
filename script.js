// Globals
let operand1 = null;    // V
let operand2 = null;    // Stored as a string
let operator = null;

// Element References
let display = document.querySelector(".display");

onStart();

function onStart() {
    let mainButtons = document.querySelectorAll(".mainButtons button, .mathButtons button");

    // Set up the main buttons (Numbers, decimal, equal, and math buttons)
    mainButtons.forEach((element) => {
        element.addEventListener("click", onMainButtonPress);
    });
}

function operate(a, symbol, b) {
    console.log("Operate not yet implemented");
}

function onMainButtonPress(e) {
    let symbol = e.target.textContent;

    switch (symbol) {
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
        case ".":
            if (operator === null) {
                operand1 += symbol;
            }
            else {
                operand2 += symbol
            }
            display.textContent += symbol;
            break;
        case "/":
        case "X":
        case "-":
        case "+":
            if (operand1 != null && operator == null) {
                operator = symbol;
                display.textContent += symbol;
            }
        case "=":
            if (operand1 != null && operator != null && operand2 != null) {
                operate(operand1, operator, operand2);
            }
    }
}