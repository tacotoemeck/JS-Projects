const totalSessionTime = 360;

const addItems = document.querySelector('.add-items');
const dayTasks = document.querySelector('.dayWindow');
const listItems = [];



function addItem(event) {
    const taskType = (this.querySelector('[name=task]')).value;
    const title = (this.querySelector('[name=title]')).value;
    const taskUrl = (this.querySelector('[name=taskUrl]')).value;
    const duration = (this.querySelector('[name=taskTime]')).value;
    event.preventDefault();
    const item = {
        taskType,
        title,
        duration,
        taskUrl,
        resultUrl: `
        <form class="taskInput">
            <input type="text" name="resultInput" placeholder="result URL if applicable" class="inputBox">
            <input type="submit" value="ADD" class="taskURLSubmit">
        </form>
        `,
        result: false,
        notes: `<form class="taskInput">
            <input type="text" name="notesInput" placeholder="any comments?" class="inputBox">
            <input type="submit" value="ADD" class="notesSubmit">
        </form>`,
        taskScreenDisplay: '',
        finishTaskDisplay: 'none',
        done: false

    };
    listItems.push(item);
    populateToDo(listItems, dayTasks);
    this.reset();
};

function populateToDo(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, i) => {
        return `
        <div data-index="${i}" class="taskGeneral ${task.taskType}" style="height:${(100 * task.duration) / totalSessionTime}%; display:${task.taskScreenDisplay};">
            <div class="taskSection1">
            <h3>${task.taskType} : ${task.title}</h3>
            <h3>Allocated Time:${task.duration}min</h3>
            
            <h3>Task URL:${task.taskUrl}</h3>
            
            </div>
            <div class="taskBottoms"><button>START TASK</button><button class="finishButton">FINISH</button><button class="deleteButtonClass">DELETE</button></div>
        </div>
        <div data-index="${i}" class="submitInputScreen taskGeneral ${task.taskType}" style="display: ${task.finishTaskDisplay}; height:${(100 * task.duration) / totalSessionTime}%;">
        <div class="inputSection">
        <div class="topInputScreen">
        <h3>${task.taskType} : ${task.title}</h3>
        <h3>Completed In:${task.duration}min</h3>
        </div>   
        <div class="bottomInputScreen">
          <div data-index="${i}" class="resultSection ">
            <h3>Result:</h3>
            ${task.resultUrl}
          </div>
          <div data-index="${i}" class="notesSection ">
            <h3>Notes:</h3>
            ${task.notes}
          </div>
          </div>
          
        </div>
        <div class="taskBottoms"><button class="deleteButtonClass">DELETE</button><button class="submitButton">SUBMIT</button></div>
        </div>
        `;
    }).join('');
}

addItems.addEventListener('submit', addItem)

// create a function to add a result into a task

// below function changes the object in an itemList and populates resultUrl with a new value. It then refreshes the whole list

function addResultURL(e) {
    // add result url
    console.log(e.target.parentNode.parentNode)
    if (!e.target.matches('.taskURLSubmit') ) return;
    
    else {
        // e.preventDefault()
        let resultUrlInput = (this.querySelector('[name=resultInput]')).value; 
        
        // find index of the item in listItems arr
        let index = e.target.parentNode.parentNode.dataset.index;  
        // remove orginal
        // resultArea.parentNode.removeChild(resultArea);
        // amend the result section with the new url
        listItems[index].resultUrl = `
        <h3>${resultUrlInput}</h3>
        `;
        listItems[index].result = 'true';
        // refresh the page section
        populateToDo(listItems, dayTasks);
    }
}
dayTasks.addEventListener('click', addResultURL);

// ADD NOTES

function addNotes(e) {
    if (!e.target.matches('.notesSubmit') ) return;
    else {
        let notesInputSection = (this.querySelector('[name=notesInput]')).value; 
      
        let index = e.target.parentNode.parentNode.dataset.index;   
        listItems[index].notes = `
        <h3>${notesInputSection}</h3>
        `;

        populateToDo(listItems, dayTasks);
    }
};
dayTasks.addEventListener('click', addNotes);




// dayTasks.addEventListener('click', getIndexItem);

// below function after click seraches if element clicked "matches" class of .deleteButtonClass if no it returns , if yes it walks up the node tree to the parent div 
// and then gets a dataset value from it and assigns it to the index variable, which is then used to remove that element from the list array. 
// after that populateToDo is called and list is refreshed without spliced items
function deleteTask(e) {
    if (!e.target.matches('.deleteButtonClass')) return;
    else {
        let targetElem = e.target;
        let index = e.target.parentNode.parentNode.dataset.index;
        listItems.splice(index,1);
        populateToDo(listItems, dayTasks);
    }
}

dayTasks.addEventListener('click', deleteTask);

// add function that ater pressing finish shows a new window in the space of the item and asks: did you complete the task ( yes or no) any comments?

function finishTask(e) {
    if ( !e.target.matches('.finishButton')) return;
    else {
        let index = e.target.parentNode.parentNode.dataset.index;
        // change the orginal div element display to none
        let mainElementDisplay = e.target.parentNode.parentNode;
        listItems[index].taskScreenDisplay="none";
        // second div display below
        let finishElementDisplay = e.target.parentNode.parentNode.nextSibling.nextSibling;
        listItems[index].finishTaskDisplay= "flex";
        populateToDo(listItems, dayTasks);
    }
}

dayTasks.addEventListener('click', finishTask);
// add function that takes an element and after clicking finish loggs it into the log section 

// LOG LIVE SECTION

let logLiveSection=  document.querySelector('.logLive')

// SUBMIT FUNCTION

function submitFinal(e) {
    if ( !e.target.matches('.submitButton')) return;
    else {
        let index = e.target.parentNode.parentNode.dataset.index;

        logLiveSection.innerHTML+=`
        <div data-index="${i}">
        <hr>
        <p>TASK TYPE : ${listItems[index].taskType}</p>
        <p>TITLE : ${listItems[index].title}</p>
        <p>COMPLETED IN : ${listItems[index].duration}</p>
        <p>TASK URL : ${listItems[index].taskUrl}</p>
        <p>RESULT : ${listItems[index].resultUrl}</p>
        <p>NOTES : ${listItems[index].notes}</p>
        <hr>
        </div>
        `

        listItems.splice(index,1);
        populateToDo(listItems, dayTasks);
    }
}

dayTasks.addEventListener('click', submitFinal);