// assign grid area to the buttons
const buttons = document.querySelectorAll('button');


buttons.forEach(button => {
    button.style.gridArea = button.id;
})

const calculator = document.querySelector('.calculator');
console.log(calculator)