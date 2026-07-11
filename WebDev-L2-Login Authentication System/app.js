let userList = [];


//----------------------------------------------------------------
const registerValidation = (event) => {
  if (event) event.preventDefault();
  let nameField = document.getElementById("name");
  let mobileField = document.getElementById("reg-mobile");
  let gmailField = document.getElementById("reg-gmail");
  let addField = document.getElementById("add");
  let passField = document.getElementById("reg-pass");
  let confirmField = document.getElementById("confirmPass");
  let msgField = document.getElementById("reg-msg");

  msgField.innerText = "";
  msgField.className = "";

  if (nameField.value != "") {
    if (mobileField.value != "") {
      if (isMobileNo(mobileField.value)) {
        if (gmailField.value != "") {
          if(isGmail(gmailField.value)){

            if (addField.value != "") {
              if (passField.value != "") {
                if (passField.value.length >= 8) {
                  if (isValidPassword(passField.value)) {
                    if (confirmField.value != "") {
                      if (passField.value == confirmField.value) {
                        msgField.innerText = "Registration Successful!";
                        msgField.classList.add("text-success");
                        if(!isRegistered(gmailField.value,mobileField.value))
                        {
                          const shaObj = new jsSHA("SHA-256", "TEXT");
                          shaObj.update(passField.value);
                          let hashPass = shaObj.getHash("HEX");
                          userList.push({
                             name: nameField.value, 
                             gmail: gmailField.value, 
                             mobileNo: mobileField.value,
                             address:addField.value, 
                             password: hashPass 
                            });
                        }
                        else
                        {
                          msgField.innerText = "User Already Registered. Please Login...!";
                          msgField.classList.add("text-danger");
                        }
                      }
                      else {
                        msgField.innerText = "Passwords do not match";
                        msgField.classList.add("text-danger");
                      }
                    }
                    else {
                      msgField.innerText = "Enter Confirm Password";
                      msgField.classList.add("text-danger");
                    }
                  }
                  else {
                    msgField.innerText = "Password must contain at least 1 number and 1 Special Character";
                    msgField.classList.add("text-danger");
                  }
                }
                else {
                  msgField.innerText = "Password must be at least 8 characters";
                  msgField.classList.add("text-danger");
                }
              }
              else {
                msgField.innerText = "Enter Password";
                msgField.classList.add("text-danger");
              }
            }
            else {
            msgField.innerText = "Enter Address";
            msgField.classList.add("text-danger");
          }
          }
          else {
            msgField.innerText = "Enter a Valid Gmail ID";
            msgField.classList.add("text-danger");
          }
        }
        else {
          msgField.innerText = "Enter Gmail ID";
          msgField.classList.add("text-danger");
        }
      }
      else {
        msgField.innerText = "Invalid Mobile Number";
        msgField.classList.add("text-danger");
      }
    }
    else {
      msgField.innerText = "Enter Mobile Number";
      msgField.classList.add("text-danger");
    }
  }
  else {
    msgField.innerText = "Enter Name";
    msgField.classList.add("text-danger");
  }
}




const isRegistered=(gmail,mobile)=>{
  if(userList.find(x=>x.gmail==gmail||x.mobileNo==mobile))
  {
    return true;
  }
  return false;
}


//Login methods
let LoginValidation = (event) => {
  if (event) event.preventDefault();
  let uid = document.getElementById("uid");
  let pass = document.getElementById("pass");
  let msg = document.getElementById("msg");
  msg.innerText = "";
  msg.className = "";


  if (uid.value != "") {
    if (pass.value != "") {
      let x = Login(uid.value, pass.value);
      if (x === 1) {
        localStorage.setItem("uid",uid.value );
        window.location.href = "dashboard.html";
      }
      else if (x == 0) {
        msg.innerText = "Invalid Password";
        msg.classList.add("text-danger");
        pass.focus();
      }
      else if (x == -1) {
        msg.innerText = "Invalid User ID";
        msg.classList.add("text-danger");
        uid.focus();
      }
      else {
        msg.innerText = "Enter Mobile Number or Gmail ID";
        msg.classList.add("text-danger");
        uid.focus();
      }
    }
    else {
      msg.innerText = "Please Enter Password";
      msg.classList.add("text-danger");
      pass.focus();
    }
  }
  else {
    msg.innerText = "Please Enter User ID";
    msg.classList.add("text-danger");
    uid.focus();
  }
}

const isValidPassword = (pass) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return passwordRegex.test(pass);
};

let Login = (uid, pass) => {
  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update(pass);
  let hashPass = shaObj.getHash("HEX");
  if (isGmail(uid)) {
    let user = userList.find(x => x.gmail == uid);
    if (user != null) {
      if (user.password === hashPass)
        return 1;
      return 0;
    }
    return -1;
  }
  else if (isMobileNo(uid)) {
    let user = userList.find(x => x.mobileNo == Number(uid));
    if (user != null) {
      if (user.password === hashPass)
        return 1;
      return 0;
    }
    return -1;
  }
  else {
    return -2;
  }
}


const isGmail = (uid) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(uid);
};

const isMobileNo = (uid) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(uid);
};

const toggleForm=()=>{
  let regContainer=document.getElementById("register-container");
  let logContainer=document.getElementById("login-container");
  if(logContainer.classList.contains("d-flex"))  {
    logContainer.classList.remove("d-flex");
    logContainer.classList.add("d-none");

    regContainer.classList.add("d-flex");
    regContainer.classList.remove("d-none");
  }
  else{
    logContainer.classList.add("d-flex");
    logContainer.classList.remove("d-none");

    regContainer.classList.remove("d-flex");
    regContainer.classList.add("d-none");
  }
};