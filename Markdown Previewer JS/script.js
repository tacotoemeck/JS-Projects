const initialMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

const textArea = document.querySelector('#editor');
const previewDiv = document.querySelector('#preview');
const expandPanel = document.querySelectorAll('.expand')
const menuButton = document.querySelector('#menu');
const menuTab = document.querySelector('#menuContent');
const clearButton = document.querySelector('#clear');
const populatebutton = document.querySelector('#populate');


textArea.value = initialMarkdown;
previewDiv.innerHTML = marked(textArea.value)


function displayInput() {
    previewDiv.innerHTML = marked(textArea.value)
}

textArea.addEventListener('keyup', displayInput)

function loadInitialMarkdown() {
    previewDiv.innerHTML = marked(initialMarkdown)
}



marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    },
    breaks: true
})


const panels = document.querySelectorAll('.panel');

function toggleOpen(event) {
    if (event.target.classList.contains('fa-arrows-alt-h')) {
        panels.forEach(panel => panel.style.flex = 1);

        if (this.dataset.open == "false") {
            this.dataset.open = "true";
            this.style.flex = 6;

        }
        else {
            this.dataset.open = "false";
            this.style.flex = 1;
        }
    }
}



panels.forEach(panel => panel.addEventListener('click', toggleOpen));

function toggleMenu(event) {

    if (event.target.parentNode.dataset.open == "false") {
        menuTab.style.display = "flex";
        event.target.parentNode.dataset.open = "true";
    }
    else {
        menuTab.style.display = "none";
        event.target.parentNode.dataset.open = "false";
    }
}

menuButton.addEventListener('click', toggleMenu);

function clearTextArea() {
    textArea.value = '';
    displayInput()
    menuTab.style.display = "none";
    event.target.parentNode.dataset.open = "false";

}

clearButton.addEventListener('click', clearTextArea)

populatebutton.addEventListener('click', function () {
    textArea.value = initialMarkdown;
    displayInput()
    menuTab.style.display = "none";
    event.target.parentNode.dataset.open = "false";
})