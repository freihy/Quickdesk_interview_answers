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
  // Connect to DB
  const db = getDatabase();
  var reference = ref(db, 'number');
  var data;
  onValue(reference, (snapshot) => {
    data = snapshot.val();
  });

  // Get first number in queue
  const servingNumber = data.shift()

  // If there's no numbers left, return 
  if (data.length == 0){
    if (data == [0]){
      alert("No tickets in waiting queue")
      return
    }
    data = [0]
  }

  // Update counter to be offline
  updateCounter(counterId, servingNumber, "Offline");

  // Update the queue
  set(reference, 
    data
  )
  .catch((error) => {
    alert("Unable to update number: " + error)
  });

  // Update the latest served 
  reference = ref(db, 'currentServing');
  set(reference, 
    servingNumber
  )
  .catch((error) => {
    alert("Unable to update number: " + error)
  });

  return data
}

function initCounters(noCounters = 3){
  // Initialise counters to 0 and offline
  // TODO - Make noCounters actually dynamic?
  for (let i = 1; i <=noCounters; i++) {
    updateCounter(i, 0);
    var counter = document.getElementById("c" + i + "statusbtn");
    counter.addEventListener('click', function(){changeStatus(i)});
    counter = document.getElementById("c" + i + "nextno");
    counter.addEventListener('click', function(){getNumber(i)});
    counter = document.getElementById("c" + i + "complete");
    counter.addEventListener('click', function(){updateCounter(i,"Waiting","Online")});
    const db = getDatabase();
    const reference = ref(db, 'counters/' + i);
    onValue(reference, (snapshot) => {
      document.getElementById("c" +i+ "statusbtn").innerHTML = (snapshot.val().status == 'Online' ? "Go Offline" : "Go Online");
    });
  } 
}

function updateCounter(counterId, currentNumber = undefined, status = "Offline"){
  // General function to update a counter's params
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
  // Simple switch to turn counter offline/offline
  const state = getSnapshot(counterId).status
  if (state == "Online"){
    updateCounter(counterId, undefined, "Offline");
  }
  else if (state == "Offline"){
    updateCounter(counterId, undefined, "Online");
  }
}

initCounters();