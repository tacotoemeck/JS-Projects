
const quotesSource = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const quotesArr = [];

let index = 0;

const newQuote = document.getElementById('new-quote');
const tweetQuote = document.getElementById('tweetQuote');
const background = document.querySelector('body')

let tweetableUrl = '';
const currentPageUrl = window.location.href;




fetch(quotesSource)
    .then(blob => blob.json())
    .then(data => quotesArr.push(...data.quotes))

function generateRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1));
}

function generateNewQuote() {
    index = generateRandomIndex(1, quotesArr.length)
    textContent.innerHTML = quotesArr[index].quote
    authorContent.innerHTML = quotesArr[index].author


}

newQuote.addEventListener('click', generateNewQuote)

setTimeout(function () {
    index = generateRandomIndex(1, quotesArr.length)
    textContent.innerHTML = quotesArr[index].quote
    authorContent.innerHTML = quotesArr[index].author

    tweetableUrl = makeTweetableUrl(textContent.innerText, currentPageUrl);
    tweetQuote.setAttribute('href', tweetableUrl);
    tweetQuote.onclick = onClickToTweet;

    let tweetContect = encodeURIComponent(textContent.innerHTML);

}, 500);






function makeTweetableUrl(text, pageUrl) {
    const tweetableText = "https://twitter.com/intent/tweet?url=" + "&text=" + encodeURIComponent(text);
    return tweetableText;
}




function onClickToTweet(e) {
    e.preventDefault();

    window.open(

        e.target.parentNode.getAttribute("href"),
        "twitterwindow",
        "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0,scrollbars=0"

    );

}





