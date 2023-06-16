const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber = 3;
let operator = "+";
let secondNumber = 5;

const operate = (operator, a, b) => {
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
      throw new Error("Invalid");
  }
};

let displayValue = "0";
const displayElement = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const clearButton = document.querySelector(".clear-button");
const equalButton = document.querySelector(".equal-button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value || button.dataset.operator;
    updateDisplay(value);
  });
});

clearButton.addEventListener("click", () => {
  clearDisplay();
});

equalButton.addEventListener("click", () => {
  calculate();
});

const updateDisplay = (value) => {
  if (displayValue === "0") {
    displayValue = value;
  } else {
    displayValue += value;
  }
  displayElement.innerText = displayValue;
};

const clearDisplay = () => {
  displayValue = "0";
  displayElement.innerText = displayValue;
};

const calculate = () => {
  // treated as a literal hyphen and not interpreted as a range indicator.
  const regex = /([+\-*/])/;
  // "5+7*2" split will ["5", "+", "7", "*", "2"].
  const values = displayValue.split(regex);

  if (values.length < 3 || values.length % 2 != 1) {
    throw new Error("Invalid!");
  }

  let result = parseFloat(values[0]);
  // Since all odd number array are operators
  // operator = values[i] and increment of 2 will ensure always is an operator
  //operand = values[i + 1] will be the numbers
  for (let i = 1; i < values.length; i += 2) {
    const operator = values[i];
    const operand = values[i + 1];
    result = operate(operator, result, parseFloat(operand));
  }
  //toString() returns the content of a string:
  displayValue = result.toString();
  displayElement.innerText = displayValue;
};
