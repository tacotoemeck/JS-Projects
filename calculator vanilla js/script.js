const buttons = document.querySelectorAll('button');
const displayFormula = document.querySelector('#formulaDisplay');
const result = document.querySelector('#display');
const clearButton = document.querySelector('#clear')
const equalButton = document.querySelector('#equals');

let displayContent = '';
let resultValue = 0;

let specialOperators = ['*', '/', '+', 'AC', '0']

result.innerHTML = resultValue;


// assign grid area to the buttons
buttons.forEach(button => {
    button.style.gridArea = button.id;
})

// display button value when clicked

function displaValue() {

    let index = [displayContent.length - 1];
    let splited = displayContent.split('');

    if (this.innerText === 'AC' || this.innerText === '=') return;

    if (specialOperators.includes(this.innerText) && specialOperators.includes(displayContent[displayContent.length - 1])
        && this.innerText == displayContent[displayContent.length - 1]) {
        return;
    }

    if (specialOperators.includes(this.innerText) && specialOperators.includes(displayContent[displayContent.length - 1])
        && this.innerText !== displayContent[displayContent.length - 1]) {

        splited[index] = this.innerText;
        displayContent = splited.join('');
        displayFormula.innerText = displayContent;
        result.innerHTML = this.innerText;
        return;
    }

    if (this.innerText === '-' && (!specialOperators.includes(this.innerText))) {
        displayContent += this.innerText;
        displayFormula.innerText = displayContent;
        display.textContent += this.innerText;
        return;

    }

    result.innerHTML = (!isNaN(Number(this.innerText))) ? Number(this.innerText) : this.innerHTML;
    displayContent += this.innerText;
    displayFormula.innerText = displayContent;
    display.textContent = this.innerText;

}

buttons.forEach(button => {
    button.addEventListener('click', displaValue)
})

// clear display
function clearDisplay() {
    displayContent = '';
    resultValue = 0;
    displayFormula.innerText = displayContent;
    result.innerHTML = resultValue;
}

clearButton.addEventListener('click', clearDisplay)


// equal

// display dots correctly 

function decimalDisplay(val) {
    if (val === String) return;
    else {
        if (val.toString().split('').includes('.')) {
            console.log('almost there mate')
        }
    }
}

function connectTheDots(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '.') {
            let i = arr.indexOf('.')
            arr.splice(i - 1, 3, `${arr[i - 1]}.${arr[i + 1]}`)
        }
    }
    return arr;
}

function equalString(str) {
    let arr = str.split('');
    arr = connectTheDots(arr)
    calculateInOrder(arr)
}

equalButton.addEventListener('click', function () {
    equalString(displayContent)
    result.innerHTML = resultValue;

})




function calculateInOrder(arr) {

    if (arr.length == 1) {

        resultValue = arr[0];
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






