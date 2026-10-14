// Get elements from HTML

const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");


// Calculator variables

let currentNumber = "0";
let numbers = [];
let operators = [];

let justCalculated = false;


// Update the display

function updateDisplay() {
    display.textContent = currentNumber;
}


// Add number to the current number

function addNumber(number) {

    // Start a new calculation after pressing equals
    if (justCalculated) {
        currentNumber = "";
        numbers = [];
        operators = [];

        justCalculated = false;
    }

    // Prevent multiple unnecessary zeros
    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


// Add decimal point

function addDecimal() {

    if (justCalculated) {
        currentNumber = "0";
        numbers = [];
        operators = [];

        justCalculated = false;
    }

    // Don't allow two decimal points
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}


// Add an operator

function addOperator(operator) {

    // If the user presses an operator immediately after another operator,
    // replace the previous operator.
    if (currentNumber === "" && operators.length > 0) {
        operators[operators.length - 1] = operator;

        previousDisplay.textContent =
            numbers.join(" ") + " " + operators.join(" ");

        return;
    }

    // Save the current number
    numbers.push(parseFloat(currentNumber));

    // Save the operator
    operators.push(operator);

    // Show the expression above the display
    previousDisplay.textContent =
        numbers.join(" ") + " " + operators.join(" ");

    // Prepare for the next number
    currentNumber = "";

    justCalculated = false;

    updateDisplay();
}


// Calculate multiplication and division first,
// then addition and subtraction.

function calculateExpression() {

    // If there is no number, stop
    if (currentNumber === "" && numbers.length === 0) {
        return;
    }

    // Add the final number
    if (currentNumber !== "") {
        numbers.push(parseFloat(currentNumber));
    }

    if (numbers.length === 0) {
        return;
    }

    // Make copies so we can safely modify them
    let calculationNumbers = [...numbers];
    let calculationOperators = [...operators];

    // First handle multiplication and division
    let i = 0;

    while (i < calculationOperators.length) {

        let operator = calculationOperators[i];

        if (operator === "×" || operator === "÷") {

            let left = calculationNumbers[i];
            let right = calculationNumbers[i + 1];

            let result;

            if (operator === "×") {

                result = left * right;

            } else if (operator === "÷") {

                // Prevent division by zero
                if (right === 0) {

                    display.textContent = "Error";
                    display.classList.add("error");

                    previousDisplay.textContent =
                        "Cannot divide by zero";

                    return;
                }

                result = left / right;
            }

            // Replace the two numbers with the result
            calculationNumbers.splice(i, 2, result);

            // Remove the operator
            calculationOperators.splice(i, 1);

        } else {
            i++;
        }
    }


    // Now handle addition and subtraction

    let result = calculationNumbers[0];

    for (let j = 0; j < calculationOperators.length; j++) {let operator = calculationOperators[j];
        let nextNumber = calculationNumbers[j + 1];

        if (operator === "+") {

            result = result + nextNumber;

        } else if (operator === "−") {

            result = result - nextNumber;
        }
    }


    // Remove unnecessary decimal digits
    if (Number.isInteger(result)) {
        currentNumber = result.toString();
    } else {
        currentNumber = parseFloat(result.toFixed(10)).toString();
    }


    // Show the completed expression
    previousDisplay.textContent =
        numbers.join(" ") + " " + operators.join(" ");

    // Reset stored calculation
    numbers = [];
    operators = [];

    justCalculated = true;

    display.classList.remove("error");

    updateDisplay();
}


// Clear calculator

function clearCalculator() {

    currentNumber = "0";

    numbers = [];
    operators = [];

    justCalculated = false;

    previousDisplay.textContent = "";

    display.classList.remove("error");

    updateDisplay();
}


// Delete last character

function deleteLastCharacter() {

    if (justCalculated) {
        clearCalculator();
        return;
    }

    if (currentNumber.length > 1) {

        currentNumber =
            currentNumber.slice(0, -1);

    } else {

        currentNumber = "0";
    }

    updateDisplay();
}


// Event listeners for number buttons

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const number = button.dataset.number;

        addNumber(number);

    });

});


// Event listeners for operator buttons

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const operator = button.dataset.operator;

        addOperator(operator);

    });

});


// Decimal button

decimalButton.addEventListener("click", function() {

    addDecimal();

});


// Equals button

equalsButton.addEventListener("click", function() {

    calculateExpression();

});


// Clear button

clearButton.addEventListener("click", function() {

    clearCalculator();

});


// Delete button

deleteButton.addEventListener("click", function() {

    deleteLastCharacter();

});