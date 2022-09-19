// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js'

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

function getNumber(counterId){
  const db = getDatabase();
  const reference = ref(db, 'number');

  var data;
  onValue(reference, (snapshot) => {
    data = snapshot.val();
  });

  updateCounter(counterId, data.shift(), "Online");

  if (data.length == 0){
    data = [0]
  }

  set(reference, 
    data
  )
  .catch((error) => {
    alert("Unable to update number: " + error)
  });

  
  console.log(data);
  return data
}

// Initialise counters to 0 and offline
function initCounters(noCounters = 3){
  for (let i = 1; i <=noCounters; i++) {
    updateCounter(i, 0);
    var counter = document.getElementById("c" + i + "statusbtn");
    counter.addEventListener('click', function(){changeStatus(i)});
    var counter = document.getElementById("c" + i + "nextno");
    counter.addEventListener('click', function(){getNumber(i)});
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
    .catch((error) => {
      alert("Unable to update counter: " + error)
    });
}

function changeStatus(counterId){
  const state = getSnapshot(counterId).status
  if (state == "Online"){
    document.getElementById("c" +counterId+ "statusbtn").innerHTML = "Go Online";
    updateCounter(counterId, undefined, "Offline");
  }
  else if (state == "Offline"){
    document.getElementById("c" +counterId+ "statusbtn").innerHTML = "Go Offline";
    updateCounter(counterId, undefined, "Online");
  }
}

initCounters();