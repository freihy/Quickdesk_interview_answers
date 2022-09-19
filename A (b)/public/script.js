// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD794jFsX52gbCaYoJ-l_qNrK68TKcZ8k8",
    authDomain: "queuebot-8382b.firebaseapp.com",
    databaseURL: "https://queuebot-8382b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "queuebot-8382b",
    storageBucket: "queuebot-8382b.appspot.com",
    messagingSenderId: "216896784767",
    appId: "1:216896784767:web:67da10d591c97c73baf24a"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the current snapshot of a counter
function getSnapshot(counterId){
  const db = getDatabase();
  const reference = ref(db, 'counters/' + counterId);
  var data;
  onValue(reference, (snapshot) => {
    data = snapshot.val();
  });
  return data
}

// Initialise counters to 0 and offline
function initCounters(noCounters = 4){
  for (let i = 1; i <=noCounters; i++) {
    updateCounter(i, 0);
    var counter = document.getElementById("c" + i + "statusbtn");
    counter.addEventListener('click', function(){changeStatus(i)});
  } 
}

function updateCounter(counterId, currentNumber = undefined, status = "Offline"){
    const db = getDatabase();
    const reference = ref(db, 'counters/' + counterId);
    
    if (currentNumber == undefined){
      currentNumber = getSnapshot(counterId).currentNumber
    }
    set(reference, {
        currentNumber: currentNumber,
        status: status
    })
    .then(() => {
      // alert("Updated Counter")
    })
    .catch((error) => {
      alert("Unable to update counter: " + error)
    });
}

function changeStatus(counterId){
  const state = getSnapshot(counterId).status
  if (state == "Online"){
    document.getElementById("c" +counterId+ "statusmsg").innerHTML = "Offline";
    document.getElementById("c" +counterId+ "statusbtn").innerHTML = "Go Online";
    updateCounter(counterId, undefined, "Offline");
  }
  else if (state == "Offline"){
    document.getElementById("c" +counterId+ "statusmsg").innerHTML = "Online";
    document.getElementById("c" +counterId+ "statusbtn").innerHTML = "Go Offline";
    updateCounter(counterId, undefined, "Online");
  }
}

initCounters();
// var c1Status = document.getElementById("c1statusbtn");
// c1Status.addEventListener('click', function(){changeStatus(1)});
// var c1Status = document.getElementById("c2statusbtn");
// c1Status.addEventListener('click', function(){updateCounter(1, "Hi!", "Online")});
// var c1Status = document.getElementById("c3statusbtn");
// c1Status.addEventListener('click', function(){updateCounter(3, "Hi!", "Online")});
