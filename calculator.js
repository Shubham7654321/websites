let currentOperand = '';
let previousOperand = '';
let operationType = null;

function appendNumber(number) {
  currentOperand += number;
  updateDisplay();
}

function appendDecimal() {
  if (!currentOperand.includes('.')) {
    currentOperand += '.';
    updateDisplay();
  }
}

function clearResult() {
  currentOperand = '';
  previousOperand = '';
  operationType = null;
  updateDisplay();
}

function toggleSign() {
  currentOperand = (parseFloat(currentOperand) * -1).toString();
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('result').value = currentOperand;
}

function operation(operator) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  operationType = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operationType) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operationType = null;
  previousOperand = '';
  updateDisplay();
}

// Event listeners for button clicks
document.getElementById('clear').addEventListener('click', clearResult);
document.getElementById('toggle-sign').addEventListener('click', toggleSign);
document.getElementById('add').addEventListener('click', () => operation('+'));
document.getElementById('subtract').addEventListener('click', () => operation('-'));
document.getElementById('multiply').addEventListener('click', () => operation('*'));
document.getElementById('divide').addEventListener('click', () => operation('/'));
document.getElementById('equals').addEventListener('click', calculate);

// Event listeners for number buttons
const numbers = document.getElementsByClassName('number');
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    appendNumber(this.textContent);
  });
}

// Event listener for decimal button
document.getElementById('decimal').addEventListener('click', appendDecimal);

// Function to initialize the calculator
function initializeCalculator() {
  clearResult();
}

// Initialize the calculator
initializeCalculator();
