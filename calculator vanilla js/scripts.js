const buttons = document.querySelectorAll('button');
const display = document.querySelector('#formulaDisplay');
const result = document.querySelector('#display');
const clearButton = document.querySelector('#clear')
const equalButton = document.querySelector('#equals');

let displayContent = 0;
let resultValue = 0;

display.innerHTML = displayContent;


// assign grid area to the buttons
buttons.forEach(button => {
    button.style.gridArea = button.id;
})

// display button value when clicked

function displaValue() {

    displayContent += this.innerText;
    display.innerHTML = displayContent;
}

buttons.forEach(button => {
    button.addEventListener('click', displaValue)
})

// clear display
function clearDisplay() {
    display.innerHTML = 0;
}

clearButton.addEventListener('click', clearDisplay)


// equal

function equalString(str) {
    let arr = str.split('');
    calculateInOrder(arr)
}

equalButton.addEventListener('click', function () {
    equalString(displayContent)
    result.innerHTML = resultValue;
    console.log(resultValue)
})


function calculateInOrder(arr) {
    console.log(arr)
    if (arr.length == 2) {
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




