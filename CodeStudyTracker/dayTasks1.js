//TIMER VARS

let secondsLeft;
let seconds;
let pause = false;


const addItems = document.querySelector('.add-items');
const dayTasks = document.querySelector('.dayWindow');
const listItems = [];

let today;
let dateFormated;

let taskInProgress = false;

let currentTask;
const topDiplay = document.querySelector('.topDisplay');
const displayDate = document.getElementById('logDate');

let completedTasksCounter = 0;
let completedTasksCounterDisplay = document.getElementById('logTasksCompleted');

let currentTaskElement = document.querySelector('.display__currentTask') 

let totalCodingTime = 0;
let totalCodingTimeDisplay = document.getElementById('logCodingTime')

let overTime;
 


// START TIMER FUNCTION

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let time = 10;
let now;
let taskFinishedAt;



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
        timeLeft: 0,
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
        timeCompleted: 0,
        done: false

    };
    listItems.push(item);
    populateToDo(listItems, dayTasks);
    this.reset();
};

function populateToDo(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, i) => {
        return `
        <div data-index="${i}" class="taskGeneral ${task.taskType}" style="height: auto; display:${task.taskScreenDisplay};">
            <div class="taskSection1">
            <h3>${task.taskType} : ${task.title}</h3>
            <h3>Allocated Time:${task.duration}min</h3>

            <h3>Task URL:${task.taskUrl}</h3>
            
            </div>
            <div class="taskBottoms"><button class="startButton myButton">START TASK</button><button class="finishButton myButton">FINISH</button><button class="deleteButtonClass myButton">DELETE</button></div>
        </div>
        <div data-index="${i}" class="submitInputScreen taskGeneral ${task.taskType}" style="display: ${task.finishTaskDisplay}; height:auto;">
        <div class="inputSection">
        <div class="topInputScreen">
        <h3>${task.taskType} : ${task.title}</h3> 
        <h3>Completed In:${listItems[i].timeCompleted}min</h3>
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
        <div class="taskBottoms"><button class="deleteButtonClass myButton">DELETE</button><button class="submitButton myButton">SUBMIT</button></div>
        </div>
        `;
    }).join('');
}

addItems.addEventListener('submit', addItem)

// create a function to add a result into a task

// below function changes the object in an itemList and populates resultUrl with a new value. It then refreshes the whole list

function addResultURL(e) {
    // add result url
    
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
        clearInterval(overTime);
        clearInterval(countdown);
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
       
        listItems[index].taskScreenDisplay="none";
        // second div display below

        listItems[index].finishTaskDisplay= "flex";
       

        clearInterval(overTime);
        clearInterval(countdown);
        
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
        taskInProgress = false;
        let index = e.target.parentNode.parentNode.dataset.index;

        taskFinishedAt = Date.now();

        let taskTime = Math.ceil((taskFinishedAt - now ) / 60000);
        
        
        listItems[index].timeCompleted = taskTime;
        listItems[index].taskScreenDisplay = '';
        
        totalCodingTimeDisplay.innerHTML= Number(totalCodingTimeDisplay.innerHTML) + Number(taskTime);
        console.log(typeof totalCodingTimeDisplay.innerHTML)

        logLiveSection.innerHTML+=`
        <div data-index="${index}">
        <hr>
        <p>TASK TYPE : ${listItems[index].taskType}</p>
        <p>TITLE : ${listItems[index].title}</p>
        <p>COMPLETED IN : ${listItems[index].timeCompleted}min</p>
        <p>TASK URL : ${listItems[index].taskUrl}</p>
        <p>RESULT : ${listItems[index].resultUrl}</p>
        <p>NOTES : ${listItems[index].notes}</p>
        <hr>
        </div>
        `


        listItems.splice(index,1);
        populateToDo(listItems, dayTasks);
        completedTasksCounter++;

        updateCurrentTaskDisplay()
        countCompletedTasks()
    }
}

dayTasks.addEventListener('click', submitFinal);


// timer



function timer(e, seconds) {
    

    if ( e.target.innerHTML=='START TASK') {

    e.target.innerHTML = "PAUSE";
    pause = false;
    taskInProgress = true;

    let index = e.target.parentNode.parentNode.dataset.index;
    
    currentTask = `${listItems[index].taskType} - ${listItems[index].title}`
    seconds = listItems[index].duration * 60;
    
    clearInterval(countdown);

    updateCurrentTaskDisplay()

    now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0 ) {
            clearInterval(countdown)
            overTimer() 
            return;
            
        }
        displayTimeLeft(secondsLeft)
    }, 1000);
}

else if ( e.target.innerHTML == 'PAUSE') {
    let index = e.target.parentNode.parentNode.dataset.index;
  
    listItems[index].duration = secondsLeft / 60
    e.target.innerHTML = "START TASK";
    pauseTimer()
}

}

function overTimer() {
   let secondsOver = 0;
   let minutesOver = 0;

   clearInterval(overTime);
   
   overTime = setInterval(() => {
   secondsOver++;
   if ( secondsOver >= 59 ) {
       minutesOver ++;
       secondsOver = 0;
   }
   timerDisplay.innerHTML = `${minutesOver} : ${secondsOver < 10 ? '0' : ''}${secondsOver}`;

    }, 1000);
}



dayTasks.addEventListener('click', timer)

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes} : ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.innerHTML = display;
    
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes =  end.getMinutes();
    // endTime.textContent = `Next break at: ${hour} : ${minutes < 10 ? '0' : ''} ${minutes}`;
}



function startTimer(seconds) {
    seconds = parseInt(this.dataset.time);
    timer(seconds);

    
}

function pauseTimer() {
   
    if ( pause == false ) {
    clearInterval(countdown);  
    pause = true;
    // hidePlayPause();
    seconds = secondsLeft;
    }
};

// UPDATE CURRENT TASK DISPLAY



function updateCurrentTaskDisplay() {

    if ( taskInProgress == true ) {
    
    currentTaskElement.innerHTML = currentTask;

    if(currentTask == "TUTORIAL - JavaScript.info") {
        topDiplay.classList.toggle('TUTORIAL')
    }
    else if(currentTask == "READING - JavaScript.info") {
        topDiplay.classList.toggle('READING')
    }
    else if(currentTask == "CODING_CHALLANGE - JavaScript.info") {
        topDiplay.classList.toggle('CODING_CHALLANGE')
    }
    else if(currentTask == "PROJECT - JavaScript.info") {
         topDiplay.classList.toggle('PROJECT')
    }
    }
    else {
        currentTaskElement.innerHTML = '';
        timerDisplay.innerHTML = '';

    }


}

// add function to accumulate all coding time 

function accumulateAllCodingTime() {

}

// add function to add a date into a date div

function todayDate() {
    today = new Date();
    
    dateFormated = `${today.getDay()} / ${today.getMonth()} / ${today.getFullYear()}`;
    displayDate.innerHTML = dateFormated;

}

todayDate()





// add a function to count and display completed tasks

function countCompletedTasks() {
    completedTasksCounterDisplay.innerHTML = completedTasksCounter;
}

countCompletedTasks()



 

// add to clipboard

// add social media tags

// add local storage

// add pulsing motiong to the topDisplay while task in progress