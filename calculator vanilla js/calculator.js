// assign grid area to the buttons
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.style.gridArea = button.id;
})

let currentValue = [0];
let displayEmpty = true;

// display current value in a display element

const numberKeys = document.querySelectorAll('.number');

// handle decimals

function updateCurrentValueNumbers(event) {

    if (currentValue[0] === 0 && this.innerText !== '.') {
        currentValue[0] = Number(this.innerText);
        display.innerText = currentValue;
        return;
    }

    if (this.innerText == '.' && (currentValue.includes('.'))) {
        return;
    }

    if (this.innerText == '.') {
        currentValue += '.';
        display.innerText = currentValue;
        return;
    }

    if (this.innerText == '0' && currentValue[0] == 0 && currentValue[1] !== '.') {
        currentValue[0] == 0;
        return;
    }

    else {
        currentValue += Number(this.innerText);
    }

    display.innerText = Number(currentValue);
}

numberKeys.forEach(button => {
    button.addEventListener('click', updateCurrentValueNumbers)
})

// limit decimal

function decimalLimit(arr) {
    if (arr.includes('.')) return;
    else return arr;
}

// not +, . can only be used once


// when number starts with 0 it can be followed by a decimel and any number of digits

// number can start with a minus 

// operarors when clicked more than once overrite themselves


