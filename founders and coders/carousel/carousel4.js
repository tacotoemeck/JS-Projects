// insert image url here content here:

const carousel = document.querySelector('.carousel')
let content = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
    "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1504321946642-8f661bf96ff0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1424581342241-2b1aba4d3462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
    "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
]
let ol = document.createElement('ol');




carousel.appendChild(ol);

function appendImagesIntoAList(i) {
    let li = document.createElement('li');
    li.innerHTML = `<img src=${content[i]}></img>`
    ol.appendChild(li);
}

for (let i = 0; i < content.length; i++) {
    appendImagesIntoAList(i)
};

let imageGallery = document.querySelector('li');

// navButtonRightCarousel.addEventListener('click', function () {
//     setTimeout(nextImage, 500)
// });
navButtonRightCarousel.addEventListener('click', nextImage)
navButtonLeftCarousel.addEventListener('click', previousImage);

let rightMargin = 0;
let leftMargin = 0;

function nextImage(e) {
    let firstLi = document.querySelector('li');
    if (rightMargin == 0) {
        firstLi.style.transform = `translateX(-100%)`;
    }
    if (rightMargin < -1500) {
        firstLi.style.transform = `translateX(100%)`;
        firstLi.style.zIndex = "-1"
        setTimeout(function () {
            firstLi.style.zIndex = "0"
        }, 1000)
    }
    if (rightMargin == -3750) {
        firstLi.style.transform = `translateX(0%)`;
    }
    if (rightMargin == -4500) {
        for (let i = -1; i < content.length; i++) {
            appendImagesIntoAList(i);
            let firstLi = document.querySelector('li');
            ol.removeChild(firstLi);
        }
        rightMargin = 750;
        imageGallery = document.querySelector('li');
    }

    rightMargin -= 750;
    imageGallery.style.marginRight = `${rightMargin}` + 'px';


}

function previousImage(e) {
    if (leftMargin >= 4500) leftMargin = 0;
    leftMargin = leftMargin + 750
    imageGallery.style.marginLeft = `${leftMargin}` + 'px';
    console.log(leftMargin)


    // content.push(content.shift());
    // let firstLi = document.querySelector('li')
    // let li = document.createElement('li');
    // li.innerHTML = `<img src=${content[1]}></img>`
    // ol.appendChild(li);
    // ol.removeChild(firstLi)

}



