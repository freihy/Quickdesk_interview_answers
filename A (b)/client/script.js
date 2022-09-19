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
  appId: "1:216896784767:web:f5e942434d917961baf24a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function takeNumFunc(){
  const db = getDatabase();
  const reference = ref(db, 'number');

  var data;
  onValue(reference, (snapshot) => {
    data = snapshot.val();
  });

  console.log(data);
  var givenNum = parseInt(data[data.length-1] + 1)
  data.push(givenNum);

  set(reference, 
    data
  )
  .then(() => {
    alert("Your number is: " + givenNum);
  })
  .catch((error) => {
    alert("Unable to update number: " + error)
  });

  document.getElementById("lastNum").innerHTML = "Last Number: " + givenNum;
}

// Initialise counters to 0 and offline
function initCounters(noCounters = 3){
  for (let i = 1; i <=noCounters; i++) {
    const db = getDatabase();
    const reference = ref(db, 'counters/' + i);
    onValue(reference, (snapshot) => {
      console.log(snapshot.val())
      if (snapshot.val().status == "Online"){
        document.getElementById("c" +i+ "status").innerHTML = "&#9989;"
      } else {
        document.getElementById("c" +i+ "status").innerHTML = "&#9940;"
      }
      document.getElementById("c" +i+ "num").innerHTML = snapshot.val().currentNumber;
    });

  } 
  const db = getDatabase();
  const reference = ref(db, 'currentServing');
  onValue(reference, (snapshot) => {
    console.log(snapshot.val())
    document.getElementById("nowServing").innerHTML = "Now Serving: " + (parseInt(snapshot.val())+1);
  });
  const takeNum = document.getElementById("takeNum");
  takeNum.addEventListener('click', function(){takeNumFunc()});
}

initCounters();