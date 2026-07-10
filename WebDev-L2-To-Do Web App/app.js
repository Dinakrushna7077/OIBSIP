let taskList=[];
let addTask=(taskName,taskDescription,dt)=>{
  taskList.push({id:taskList.length+1,name:taskName,description:taskDescription,date:dt,status:"Pending"});
  printTaskList();
}
//addTask("dommy","dommy decription","12-03-2000");
console.log(taskList);

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
        addTask(nameField.value,descriptionField.value,dateField.value);
        msg.innerText="Task Created";
        msg.classList.remove("text-danger");
        msg.classList.add("text-success");
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
      printPendingList(task);
    if(task.status==="Completed")
      printCompletedList(task);
  });
}
//Pending List
const printPendingList=(task)=>{
  const pendingListContainer=document.getElementById("pending-list");
  let container=document.createElement("div");
  container.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-pending", "p-2", "rounded-2");
  let newPendingTask=`
      <h2 class="title">${task.name}</h2>
      <span class="task-pending">${task.status}</span>
      <div>${task.description}</div>
      <div>${task.date}</div>
      <div class="d-flex gap-2">
        <button class="btn btn-danger">Delete</button>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-success">Complete</button>
      </div>
    `;
    container.innerHTML=newPendingTask;
  pendingListContainer.append(container);
}
//Completed List
const printCompletedList=(task)=>{
  const completeListContainer=document.getElementById("completed-list");
  let container=document.createElement("div");
  container.classList.add("d-flex", "flex-column", "align-items-center", "justify-content-center", "bg-success", "p-2", "rounded-2");
  let newCompletedTask=`
      <h2 >${task.name}</h2>
      <span class="task-complete">${task.status}</span>
      <div>${task.description}</div>
      <div>${task.date}</div>
      <div class="d-flex gap-2">
        <button class="btn btn-danger">Delete</button>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-warning">Incomplete</button>
      </div>
    `;
    container.innerHTML=newCompletedTask;

  completeListContainer.append(container);
}
printTaskList();