let inp=document.getElementById("calculation");
let calcu=(operator)=>{
  if(operator=="="){
    try{
      inp.value=eval(inp.value);
    }
    catch(error){
      alert("Error, Please check the value format...!");
      inp.value="";
    }
  }
  else if(operator=="C"){
    inp.value='';
  }
  else if(operator=="D"){
    inp.value=inp.value.slice(0,-1);
  }
  else{
    inp.value=inp.value+operator;
  }
}