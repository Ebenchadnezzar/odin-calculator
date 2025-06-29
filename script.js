// Globals
let operand1 = null;    // V
let operand2 = null;    // Stored as a string
let operator = null;

// Element References
let display = document.querySelector(".display");

onStart();

function onStart() {
    let mainButtons = document.querySelectorAll(".mainButtons button, .mathButtons button");
    console.log(display.textContent);
    // Set up the main buttons (Numbers, decimal, equal, and math buttons)
    mainButtons.forEach((element) => {
        element.addEventListener("click", onMainButtonPress);
    });
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

    // Display
    display.textContent = result;

    // Cleanup
    operand1 = null;
    operand2 = null;
    operator = null;
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
            if (operand1 === null) {
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
                display.textContent += symbol;
            }
            else if (operand1 !== null & operator !== null && operand2 !== null) {
                // If you've arleady typed a full expression, but then type
                // another operator, it calculates the first expression,
                // at treats it as the first operand.
                operate();
                operand1 = display.textContent;
                operator = symbol;
                display.textContent += symbol;
            }
            else if (operand1 === null && operator === null && operand2 === null && display.textContent !== "") {
                // If you've just completed an operation and press an
                // operator, it will treat the result as the first operand
                operand1 = display.textContent;
                operator = symbol;
                display.textContent += symbol;
            }
        case "=":
            if (operand1 != null && operator != null && operand2 != null) {
                operate();
            }
    }
}