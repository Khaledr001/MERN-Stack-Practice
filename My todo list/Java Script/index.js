const input = document.getElementById("task-details-input");
const time_el = document.getElementById("time1");
const date_el = document.getElementById("date1");

let taskList = [];

function addingTask() {
  let task = input.value;
  let time = time_el.value;
  let date = date_el.value;

  if(!task || !time || !date) {
    alert("Add you information properly");
  }
  else {
    let id = new Date().getTime().toString();
    taskList.unshift({
        taskName: task,
        date: date,
        time: time,
        id: id
    })

    rendarTaskList();

    input.value = "";
    date_el.value = "";
    time_el.value = "";
    // saveData();
    // console.log(taskList.length);
  }
}

function rendarTaskList() {
    let sec = document.querySelector('#task-list');
    sec.innerHTML = "";

    taskList.forEach(function (task) {
      console.log(task.taskName + ' ' + task.date + ' ' + task.time);
        let outer_div = document.createElement("div");
        outer_div.setAttribute("id", "main-div");
        sec.appendChild(outer_div);

        let task_div = document.createElement("div");
        task_div.setAttribute("id", "tasks");
        outer_div.appendChild(task_div);

        let input_ckbox = document.createElement("input");
        input_ckbox.setAttribute("type", "checkbox");
        input_ckbox.setAttribute("id", "ckbox");
        task_div.appendChild(input_ckbox);

        let content_div = document.createElement("div");
        content_div.classList.add("content");
        task_div.appendChild(content_div);

        let task_input = document.createElement("input");
        task_input.classList.add("text");
        task_input.value = task.taskName;
        task_input.setAttribute("readOnly", true);
        content_div.appendChild(task_input);

        let action_div = document.createElement("div");
        action_div.classList.add("action");
        task_div.appendChild(action_div);

        let edit_btn = document.createElement("button");
        edit_btn.classList.add("edit");
        edit_btn.id = task.id;
        edit_btn.innerText = "EDIT";
        edit_btn.onclick = editTask;
        action_div.appendChild(edit_btn);

        let delet_btn = document.createElement("button");
        delet_btn.classList.add("delet");
        delet_btn.innerText = "DELETE";
        delet_btn.id = task.id;
        delet_btn.onclick = deleteTask;
        action_div.appendChild(delet_btn);


        let show_date_time_div = document.createElement("div");
        show_date_time_div.setAttribute("id", "show-date-time");
        outer_div.appendChild(show_date_time_div);

        let date_input = document.createElement("input");
        date_input.classList.add('dt');
        date_input.setAttribute("readOnly", "true");
        date_input.value = task.date;
        date_input.type = "date";
        show_date_time_div.appendChild(date_input);

        let time_input = document.createElement("input");
        time_input.classList.add('tm');
        time_input.value = task.time;
        time_input.type = "time";
        time_input.setAttribute("readOnly", "true");
        show_date_time_div.appendChild(time_input);

    });
}


function editTask (event) {
  let editButton = event.target;
  let toBeEdited = editButton.id;
  
  let i = 0;
  taskList.forEach(function (task) {
    
    if(task.id === toBeEdited) {
      console.log(task.taskName);
      let title1 = document.querySelectorAll(".text");
      let date1 = document.querySelectorAll(".dt");
      let time1 = document.querySelectorAll(".tm");
      if(editButton.innerText.toLowerCase() === 'edit') {
        title1[i].removeAttribute("readOnly");
        date1[i].removeAttribute("readOnly");
        time1[i].removeAttribute("readOnly");

        // title1.focus();
        editButton.innerText = "SAVE";
      }
      else {
        editButton.innerText = "EDIT";
        title1[i].setAttribute("readOnly", true);
        date1[i].setAttribute("readOnly", true);
        time1[i].setAttribute("readOnly", true);

        console.log('save task');
      } 
    }
    i++;
  });
  // saveData();

}

function deleteTask (event) {
  let deleteButton = event.target;
  let toBeDeleted = deleteButton.id;

  taskList = taskList.filter(function (task) {
    if(task.id === toBeDeleted) return false;
    else return true;
  });
  rendarTaskList();
  // saveData();
}
// let storeData = document.getElementById("main-div");
// function saveData () {
  
//   localStorage.setItem("data", storeData.innerHTML);
// }

// function showData () {
//   storeData.innerHTML = localStorage.getItem("data");
// }
// showData();