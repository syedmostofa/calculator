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
    return num1 / num2;
}

function percent(num1) {
    return num1/100;
}

function calculate(num1, operator, num2) {
    let result = 0;
    if (operator === '+') {
        result = add(num1, num2);
    }
    else if (operator === '*') {
        result = multiply(num1, num2);
    }
    else if (operator === '-') {
        result = sub(num1, num2);
    }
    else if (operator === '/') {
        result = div(num1, num2);
    }
    else {
        console.log("Invalid operator!");
        return;
    }
    console.log(result);
    return result;
}

// Prompt returns strings → convert to numbers where needed
let num1 = parseFloat(prompt("Enter first number"));
let operator = prompt("Enter an operator (+, -, *, /)");
let num2 = parseFloat(prompt("Enter second number"));

calculate(num1, operator, num2);