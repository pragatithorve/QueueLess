const API="http://localhost:5000/api/queue";
const service=localStorage.getItem("service");

// ADD TOKEN
async function getToken(){
 let name=document.getElementById("name").value;
 let time=document.getElementById("time").value;

 if(!name || !time){
  alert("Enter name & time");
  return;
 }

 let res=await fetch(API+"/add",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({name,time,service,isVIP:false})
 });

 let data=await res.json();

 if(res.ok){
  alert("Booked at "+time);
 }else{
  alert(data.msg);
 }

 load();
}

// VIP
async function vip(){
 let name=prompt("VIP name");
 let time=prompt("Time (HH:MM)");

 await fetch(API+"/add",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({name,time,service,isVIP:true})
 });

 load();
}

// LOAD
async function load(){
 let res=await fetch(API+"/"+service);
 let data=await res.json();

 let list=document.getElementById("list");
 list.innerHTML="";

 data.forEach(i=>{
  let li=document.createElement("li");

  li.innerText =
   (i.isVIP?"⭐ ":"") +
   i.name + " ("+i.time+")";

  list.appendChild(li);
 });
}

// NEXT
async function nextToken(){
 let res=await fetch(API+"/next/"+service,{method:"POST"});
 let data=await res.json();

 alert(data?data.name:"No one");
 load();
}

// RESET
async function resetQueue(){
 await fetch(API+"/reset/"+service,{method:"DELETE"});
 load();
}

// LOGOUT
function logout(){
 localStorage.clear();
 location="index.html";
}

load();