const displayElement = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const clearButton = document.querySelector(".clear-button");
const equalButton = document.querySelector(".equal-button");

let displayValue = "0";
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

const evaluateParentheses = (expression) => {
  // Regular expression to match parentheses
  const regex = /\(([^\(\)]+)\)/;
  let result = expression;
  // The test() method tests for a match in a string
  // This loop is necessary because there may be multiple sets of parentheses in the expression.
  while (regex.test(result)) {
    // The match parameter represents the entire matched substring, including the
    // parentheses. The subExpression parameter represents the sub-expression within the
    // parentheses (i.e., the part to be evaluated).
    result = result.replace(regex, (match, subExpression) => {
      const evaluated = calculate(subExpression);
      return evaluated;
    });
  }

  return result;
};

const calculate = () => {
  const parenthesesEvaluated = evaluateParentheses(displayValue);
  // Regular expression to operators
  const regex = /([+\-*/])/;
  const values = parenthesesEvaluated.split(regex);

  if (values.length < 3 || values.length % 2 !== 1) {
    throw new Error("Invalid expression!");
  }

  let result = parseFloat(values[0]);

  for (let i = 1; i < values.length; i += 2) {
    const operator = values[i];
    const operand = values[i + 1];
    if (operator === "*" || operator === "/") {
      // Perform multiplication or division immediately
      result = operate(operator, result, parseFloat(operand));
    } else {
      // Store the operator and operand for later evaluation
      const nextOperator = values[i + 2];
      const nextOperand = values[i + 3];
      if (nextOperator === "*" || nextOperator === "/") {
        // Perform multiplication or division next
        result = operate(
          operator,
          result,
          operate(nextOperator, parseFloat(operand), parseFloat(nextOperand))
        );
        i += 2; // Skip the next operator and operand
      } else {
        // Perform addition or subtraction
        result = operate(operator, result, parseFloat(operand));
      }
    }
  }

  displayValue = result.toString();
  displayElement.innerText = displayValue;
};
