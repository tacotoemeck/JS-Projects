// assign grid area to the buttons
const buttons = document.querySelectorAll('button');
const operators = document.querySelectorAll('.operator')

buttons.forEach(button => {
    button.style.gridArea = button.id;
})

let currentFormula = [];
let currentValue = [0];
let displayEmpty = true;

const operatorValues = ['/', '*', '+', '-']

// display current value in a display element

const numberKeys = document.querySelectorAll('.number');

// updateDisplay 

function updateDisplay(string) {
    display.innerText = string;
}

updateDisplay(currentValue)

function updateCurrentValueNumbers(string) {
    console.log(currentFormula[currentFormula.length - 1])
    if (operatorValues.includes(currentValue)) {
        currentFormula += currentValue;
        currentValue = [0]
    }
    switch (string) {
        case '-':
            if (currentValue.length > 1) return;

            if (currentValue[0] === 0) {
                currentValue[0] = '-';
            };
            updateDisplay(currentValue);
            break;

        case '.':
            if (currentValue.includes('.')) return;

            if (currentValue[currentValue.length - 1] === '-') {
                currentValue += '0.';
                updateDisplay(currentValue);
                return;
            };
            currentValue += '.';
            updateDisplay(currentValue);
            break;

        case '0':
            if (currentValue[0] == 0 && currentValue[1] !== '.') return;

            if ((currentValue[0] == 0 || currentValue[0] == '-') && (currentValue[2] === '.' || currentValue[1] === '.')) {
                currentValue += Number(string);
            }
            updateDisplay(currentValue);
            break;

        default:
            if (currentValue[0] === 0) {
                currentValue[0] = Number(string);
            }
            else {
                currentValue += Number(string);
            }
            updateDisplay(currentValue);
    }
}

numberKeys.forEach(button => {
    button.addEventListener('click', function () {
        updateCurrentValueNumbers(this.innerText)
    })
})

// limit decimal

function decimalLimit(arr) {
    if (arr.includes('.')) return;
    else return arr;
}

// clear

function clearDisplay() {
    currentValue = [0];
    updateDisplay(currentValue)
}

clear.addEventListener('click', clearDisplay);

// operator functions

function operator(string) {
    currentFormula += currentValue;
    currentValue = [string];
    displayFormula();
    updateDisplay(string);

}

operators.forEach(button => {
    button.addEventListener('click', function () {
        operator(this.innerText)
    })
})

// display current formula

function displayFormula() {
    formulaDisplay.innerText = currentFormula;
}

// not +, . can only be used once


// when number starts with 0 it can be followed by a decimel and any number of digits

// number can start with a minus 

// operarors when clicked more than once overrite themselves


