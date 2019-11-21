// nice and inventive works better but doesn't pass FCC's tests :

// const buttons = document.querySelectorAll('.drum-pad');
// const audio = document.querySelectorAll('.clip')
// let sounds = {};

// audio.forEach(sound => {
//     sounds[sound.dataset.key] = sound.src;
// })

// function playSound(event) {
//     let key;
//     if (event.type === 'click') {
//         key = this.dataset.key;
//     }
//     if (event.type === 'keydown') {
//         key = event.keyCode;
//     }
//     let sound = new Audio(sounds[key]);
//     sound.play();
// };

// window.addEventListener('keydown', playSound);
// buttons.forEach(button => button.addEventListener('click', playSound));

// below works

// function playSound(event) {
//     if (!event.target.matches('.drum-pad')) return;
//     else {
//         event.target.childNodes[1].play();
//         display.innerText = event.target.id;
//     }
// };

// document.addEventListener('click', playSound);

// function playSoundKey(event) {
//     document.getElementById(`${String.fromCharCode(event.keyCode)}`).play();
//     let key = document.getElementById(`${String.fromCharCode(event.keyCode)}`)
//     display.innerText = key.parentNode.id;
//     // letter.play()
// };

// document.addEventListener('keydown', playSoundKey)




// 

function playSound(event) {
    if (!event.target.matches('.drum-pad')) return;
    else {
        event.target.classList.toggle('playing');
        console.log(event.target)
        setTimeout(function () { event.target.classList.toggle('playing') }, 200);

        event.target.childNodes[1].currentTime = 0;
        event.target.childNodes[1].play();
        display.innerText = event.target.id;
        display.classList.add('tada')
        setTimeout(function () { display.classList.remove('tada') }, 500);

    }
};

document.addEventListener('click', playSound);

function playSoundKey(event) {
    let key = document.getElementById(`${String.fromCharCode(event.keyCode)}`);
    console.log(key.parentNodea)
    key.parentNode.classList.add('playing')
    setTimeout(function () { key.parentNode.classList.remove('playing') }, 200);
    display.classList.add('tada')
    setTimeout(function () { display.classList.remove('tada') }, 500);
    key.currentTime = 0;
    key.play();

    display.innerText = key.parentNode.id;
    // letter.play()
};

document.addEventListener('keydown', playSoundKey);








