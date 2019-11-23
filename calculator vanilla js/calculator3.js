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

function updateCurrentValueNumbers(string, theClass) {


    if (theClass == 'number' && operatorValues.includes(currentValue.toString())) {

        currentFormula += currentValue;
        currentValue = [0];
        displayFormula();


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
            if (currentValue == '-') {
                currentValue += Number(string);
            }
            if (currentValue[0] === 0) {
                currentValue[0] = Number(string);
            }
            else {
                currentValue += Number(string);
            }
            updateDisplay(currentValue);
    }
}

function operatorsAction(string, className) {
    // if (operatorValues.includes(currentFormula[currentFormula.length - 1]) && string != '-') {
    //     return;
    // }

    if (string == '-' && currentValue != '-' && operatorValues.includes(currentValue.toString())) {
        currentFormula += currentValue;
        currentValue = [string];
        displayFormula();
        updateDisplay();
        // return;
    }


    if (operatorValues.includes(currentValue.toString())) {
        currentValue = [string]
        updateDisplay(string)
        return;
    }

    currentFormula += currentValue
    currentValue = [string];

    updateDisplay(string)
    displayFormula()
}

numberKeys.forEach(button => {
    button.addEventListener('click', function () {
        updateCurrentValueNumbers(this.innerText, this.classList.value)
    })
})

operators.forEach(button => {
    button.addEventListener('click', function () {
        operatorsAction(this.innerText, this.classList.value)
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
    currentFormula = []
    updateDisplay(currentValue);
    displayFormula()
}

clear.addEventListener('click', clearDisplay);

// operator functions


// display current formula

function displayFormula() {
    formulaDisplay.innerText = currentFormula;
}

function equalString(str) {
    let arr = str.split('');
    calculateInOrder(arr)
}

equals.addEventListener('click', function () {
    equalString(currentFormula)
    result.innerHTML = resultValue;
    console.log(resultValue)
})


function calculateInOrder(arr) {
    console.log(arr)
    if (arr.length == 1) {
        currentValue = arr[0];
        updateDisplay(currentValue)
        return;
    }

    else {
        if (arr.includes('*')) {
            let i = arr.indexOf('*')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a * b;
            arr.splice(i - 1, 3, c)
        }
        else if (arr.includes('/')) {
            let i = arr.indexOf('/')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a / b;
            arr.splice(i - 1, 3, c)
        }
        else if (arr.includes('+')) {
            let i = arr.indexOf('+')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a + b;
            arr.splice(i - 1, 3, c)
        }
        else if (arr.includes('-')) {
            let i = arr.indexOf('-')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a - b;
            arr.splice(i - 1, 3, c)
        }
        calculateInOrder(arr)
    }
}


// when number starts with 0 it can be followed by a decimel and any number of digits

// number can start with a minus 

// operarors when clicked more than once overrite themselves


