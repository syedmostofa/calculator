function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    if (num2 === 0) {
        return "Error: Division by zero";
    }
    return num1 / num2;
}

function percent(num1) {
    return num1 / 100;
}

// Main calculation function
function calculate(num1, operator, num2) {
    let result = 0;
    if (operator === '+') {
        result = add(num1, num2);
    }
    else if (operator === 'X' || operator === '*') {
        result = multiply(num1, num2);
    }
    else if (operator === '-') {
        result = sub(num1, num2);
    }
    else if (operator === '÷' || operator === '/') {
        result = div(num1, num2);
    }
    else {
        console.log("Invalid operator!");
        return "Error";
    }
    return result;
}

// Calculator state variables
let displayValue = "0";
let firstOperand = null;
let waitingForNewOperand = false;
let operator = null;

// Function to update the display element
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

// Function to handle digit button clicks
function inputDigit(digit) {
    if (waitingForNewOperand) {
        displayValue = digit;
        waitingForNewOperand = false;
    } else {
        displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
    updateDisplay();
}

// Function to handle operator button clicks
function inputOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const newValue = calculate(currentValue, operator, inputValue);

        displayValue = String(newValue);
        firstOperand = newValue;
        updateDisplay();
    }

    waitingForNewOperand = true;
    operator = nextOperator;
}

// Function to handle equals button
function inputEquals() {
    const inputValue = parseFloat(displayValue);

    if (firstOperand !== null && operator) {
        const newValue = calculate(firstOperand, operator, inputValue);
        displayValue = String(newValue);
        firstOperand = null;
        operator = null;
        waitingForNewOperand = true;
        updateDisplay();
    }
}

// Function to clear the calculator
function clear() {
    displayValue = "0";
    firstOperand = null;
    operator = null;
    waitingForNewOperand = false;
    updateDisplay();
}

// Function to delete last digit
function deleteLastDigit() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = "0";
    }
    updateDisplay();
}

// Function to handle percent button
function inputPercent() {
    const inputValue = parseFloat(displayValue);
    const newValue = percent(inputValue);
    displayValue = String(newValue);
    updateDisplay();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for number buttons
    const numberButtons = document.querySelectorAll('button[id="num"]');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            inputDigit(button.textContent);
        });
    });

    // Add event listener for zero button
    const zeroButton = document.getElementById('zeroBtn');
    zeroButton.addEventListener('click', () => {
        inputDigit('0');
    });

    // Add event listeners for operator buttons
    const operatorButtons = document.querySelectorAll('button[id="operator"]');
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            inputOperator(button.textContent);
        });
    });

    // Add event listener for equals button
    const equalsButton = document.getElementById('equalBtn');
    equalsButton.addEventListener('click', inputEquals);

    // Add event listener for clear button
    const clearButton = document.getElementById('clearBtn');
    clearButton.addEventListener('click', clear);

    // Add event listener for delete button
    const deleteButton = document.getElementById('delBtn');
    deleteButton.addEventListener('click', deleteLastDigit);

    // Add event listener for percent button
    const percentButton = document.getElementById('percentBtn');
    percentButton.addEventListener('click', inputPercent);

    // Initialize display
    updateDisplay();

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (key >= '0' && key <= '9') {
            inputDigit(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            let operatorKey = key;
            if (key === '*') operatorKey = 'X';
            if (key === '/') operatorKey = '÷';
            inputOperator(operatorKey);
        } else if (key === 'Enter' || key === '=') {
            inputEquals();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            clear();
        } else if (key === 'Backspace') {
            deleteLastDigit();
        } else if (key === '%') {
            inputPercent();
        }
    });
});