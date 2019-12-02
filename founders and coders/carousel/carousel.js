// closed loop image slider by TomW, built as a part of Founders and Coders application

const carousel = document.querySelector('.carousel')

// ====================insert image url here content here: ===================================================== //


let content = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
    "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1504321946642-8f661bf96ff0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1424581342241-2b1aba4d3462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
    "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
]

// ====================insert image url above, make sure they are comma seperated : ===================================================== //


let auto;

// dom insert list
let ol = document.createElement('ol');
ol.classList.add('carouselElemenList')
carousel.appendChild(ol);

// images into the list

function appendImagesIntoAList(i, insertLocation) {
    let li = document.createElement('li');
    li.innerHTML = `<img src=${content[i]}></img>`
    li.dataset.index = `${i}`
    ol.appendChild(li);
}

for (let i = 0; i < content.length; i++) {
    appendImagesIntoAList(i)
};

// navigation functions :

// get carousel div size:
let carouselWidth = carousel.offsetWidth;
let rightMargin = 0;
let leftMargin = -carouselWidth;

let imageGallery = document.querySelector('li');
imageGallery.style.marginLeft = `${leftMargin}` + 'px';

navButtonRightCarousel.addEventListener('click', nextImage)
navButtonLeftCarousel.addEventListener('click', previousImage);

function nextImage(e) {

    let firstLi = document.querySelector('li');
    let currentIndex = firstLi.dataset.index;
    ol.removeChild(firstLi);
    imageGallery = document.querySelector('li');
    imageGallery.style.marginLeft = `${leftMargin}` + 'px';
    appendImagesIntoAList(currentIndex)
}

function previousImage(e) {

    let lastLi = ol.lastChild;
    let currentIndex = lastLi.dataset.index;
    ol.removeChild(lastLi);
    imageGallery = document.querySelector('li');
    let li = document.createElement('li');
    li.innerHTML = `<img src=${content[currentIndex]}></img>`
    li.dataset.index = `${currentIndex}`
    ol.insertBefore(li, ol.firstChild);
    imageGallery.style.marginLeft = '';
    li.style.marginLeft = `${-carouselWidth}` + 'px';
}

// play and pause functions
play.addEventListener('click', function () {
    autoPlay();
    play.style.display = 'none';
    pause.style.display = 'block';
})

pause.addEventListener('click', function () {
    pausePlay();
    pause.style.display = 'none';
    play.style.display = 'block';
})

function autoPlay() {
    auto = setInterval(nextImage, 2500)
}

function pausePlay() {
    clearInterval(auto)
}

// display play OR pause button

function autopPlayControlsDisplay() {

}


// switch images using arrow keys

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        previousImage()

    }
    else if (e.keyCode == '39') {
        nextImage()
    }

}

