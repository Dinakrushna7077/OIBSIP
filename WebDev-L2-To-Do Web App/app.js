let taskList=[];
let updateId=0;
let addTask=(taskName,taskDescription,dt)=>{
  taskList.push({id:taskList.length+1,name:taskName,description:taskDescription,date:dt,status:"Pending"});
  printTaskList();
}
const counter=()=>{
  let totalCounter=document.getElementById("total-count");
  let completeCounter=document.getElementById("complete-count");
  let pendingCounter=document.getElementById("pending-count");
  totalCounter.innerText="Total : "+taskList.length;
  completeCounter.innerText="Completed : "+taskList.filter(x=>x.status=="Completed").length;
  pendingCounter.innerText="Pending : "+taskList.filter(x=>x.status=="Pending").length;
}

//Form validation and add new task when all fild have their values
let formValidation=()=>{
  let nameField=document.getElementById("taskName");
  let descriptionField=document.getElementById("taskDesc");
  let dateField=document.getElementById("taskDate");
  let msg=document.getElementById("msg");

  if(nameField.value!=="")
  {
    if(descriptionField.value!=="")
    {
      if(dateField.value!=="")
      {
        if(updateId==0)
        {
          addTask(nameField.value,descriptionField.value,dateField.value);
          msg.innerText="Task Created";
          msg.classList.remove("text-danger");
          msg.classList.add("text-success");
          nameField.value="";
          descriptionField.value="";
          dateField.value="";
        }
        else{
          updateTask(updateId,nameField.value,descriptionField.value,dateField.value);
          msg.innerText="Task Updated";
          msg.classList.remove("text-danger");
          msg.classList.add("text-success");
          nameField.value="";
          descriptionField.value="";
          dateField.value="";
        }
      }
      else{
        msg.innerText="Please Enter Date...";
      }
    }
    else{
      msg.innerText="Please Enter Task Description...";
    }
  }
  else{
    msg.innerText="please enter Task Name...";
  }
  msg.classList.add("text-danger");
}

//Showing List by filtering pending and completed task lists
const printTaskList=()=>{
  const pendingListContainer=document.getElementById("pending-list");
  const completeListContainer=document.getElementById("completed-list");
  pendingListContainer.innerHTML="";
  completeListContainer.innerHTML="";
  taskList.forEach((task,index)=>{
    if(task.status==="Pending")
      printPendingList(task,index);
    if(task.status==="Completed")
      printCompletedList(task,index);
  });
  counter();
}
//Pending List
const printPendingList=(task,index)=>{
  const pendingListContainer=document.getElementById("pending-list");
  let container=document.createElement("div");
  container.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-pending", "p-2", "rounded-2");
  let newPendingTask=`
      <h2 class="title">${task.name}</h2>
      <span class="task-pending">${task.status}</span>
      <div>${task.description}</div>
      <div>${task.date}</div>
      <div class="d-flex gap-2">
        <button class="btn btn-danger" onclick=deleteTask(${index})>Delete</button>
        <button class="btn btn-primary" onclick=editTask(${task.id})>Edit</button>
        <button class="btn btn-success" onclick=toggleStatus(${task.id})>Complete</button>
      </div>
    `;
    container.innerHTML=newPendingTask;
  pendingListContainer.append(container);
}
//Completed List
const printCompletedList=(task,index)=>{
  const completeListContainer=document.getElementById("completed-list");
  let container=document.createElement("div");
  container.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-success", "p-2", "rounded-2");
  let newCompletedTask=`
      <h2 >${task.name}</h2>
      <span class="task-complete">${task.status}</span>
      <div>${task.description}</div>
      <div>${task.date}</div>
      <div class="d-flex gap-2">
        <button class="btn btn-danger" onclick=deleteTask(${index})>Delete</button>
        <button class="btn btn-primary" onclick=editTask(${task.id})>Edit</button>
        <button class="btn btn-warning" onclick=toggleStatus(${task.id})>Incomplete</button>
      </div>
    `;
    container.innerHTML=newCompletedTask;

  completeListContainer.append(container);
}
printTaskList();


let deleteTask=(index)=>{
  taskList.splice(index,1);
  let msg=document.getElementById("msg");
  msg.innerText="Task Deleted";
  msg.classList.add("text-success");
  printTaskList();
}

let editTask=(id)=>{
  let nameField=document.getElementById("taskName");
  let descriptionField=document.getElementById("taskDesc");
  let dateField=document.getElementById("taskDate");
  let msg=document.getElementById("msg");
  let _task=taskList.find(x=>x.id==id);
  if(_task!=null)
  {
    let updateBtn=document.getElementById("update-btn");
    let addBtn=document.getElementById("add-btn");
    nameField.value=_task.name;
    descriptionField.value=_task.description;
    dateField.value=_task.date;
    updateId=_task.id;
    nameField.focus();
    updateBtn.hidden=false;
    addBtn.hidden=true;
  }
}

let updateTask=(id,name,desc,date)=>{
  let updateBtn=document.getElementById("update-btn");
  let addBtn=document.getElementById("add-btn");
  let _task=taskList.find(x=>x.id==id);
  if(_task!=null)
  {
    _task.name=name;
    _task.description=desc;
    _task.date=date;
  }
  updateBtn.hidden=true;
  addBtn.hidden=false;
  printTaskList();
}

let toggleStatus=(id)=>{
  let _task=taskList.find(x=>x.id==id);
  if (_task) {
    if (_task.status == "Pending") {
      _task.status = "Completed";
    } else {
      _task.status = "Pending";
    }
    printTaskList();
  }
}

