const buttons = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');


buttons.forEach(button => {
    button.style.gridArea = button.id;
})




let currentFormula = [];
let currentValue = [0];
let currentValueType = 'empty';


// enter number

function enterNumber() {
    // if current value not empty or a number submit the previous value

    if (currentValueType !== 'number') {
        currentFormula += currentValue;
        updateCurrentFormula()
        currentValue = [];
        currentValueType = 'number';
    }

    if (this.innerText == '.' && currentValue.includes('.')) {
        return;
    }

    if (this.innerText == '0' && currentValue == '0') {
        currentValue == [0];
        return;
    }


    currentValue += this.innerText;
    updateCurrentDisplay();

}

function enterOperator() {
    if (currentValueType == 'operator') {
        currentValue = this.innerText;
        updateCurrentDisplay()
        return;
    };

    if (currentValueType !== 'operator' && currentValue != '-') {
        currentFormula += currentValue;
        updateCurrentFormula();
        currentValue = [];
        currentValueType = 'operator';
    }

    // if (currentValueType !== 'operator' && currentValue == '-') {
    //     updateCurrentFormula();
    //     currentValue =+ this.innerText;
    //     currentValueType = 'operator';
    // }

    currentValue += this.innerText;
    updateCurrentDisplay();
}

numberButtons.forEach(button => {
    button.addEventListener('click', enterNumber)
})

operatorButtons.forEach(button => {
    button.addEventListener('click', enterOperator)
})

function updateCurrentDisplay() {
    display.innerText = currentValue;
}

function updateCurrentFormula() {
    if (currentFormula == 0) {
        currentFormula = [];
    }
    formulaDisplay.innerText = currentFormula;
}

function handleSubstract() {

    if (currentValueType == 'operator' && this.innerText == '-') {
        currentValue = currentValue.split('')
        currentFormula += currentValue[0];
        updateCurrentFormula()
        currentValue = this.innerText;
        currentValueType = 'number';
        updateCurrentDisplay();
        return;
    }

    if (currentValueType == 'number') {
        console.log('that')
        currentFormula += currentValue;
        updateCurrentFormula();
        currentValue = [];
        currentValueType = 'operator';
        currentValue += this.innerText;
        updateCurrentDisplay();
    }

}

subtract.addEventListener('click', handleSubstract);


function decimalEnter() {
    if (currentValue.includes('.')) {
        console.log('does')
    }
}


function clearDisplay() {
    currentFormula = [];
    currentValue = [0];
    currentValueType = 'empty';
    updateCurrentDisplay()
    updateCurrentFormula()
}

clear.addEventListener('click', clearDisplay);


// 
function equalString(str) {
    let arr = str.split('');
    calculateInOrder(arr)
}

equals.addEventListener('click', function () {
    equalString(currentFormula)
    display.innerText = currentValue;

})


function calculateInOrder(arr) {
    console.log(arr)
    if (arr.length == 1) {
        currentValue = arr[0];
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




