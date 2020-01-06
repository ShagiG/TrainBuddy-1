var firebaseConfig = {
  apiKey: "AIzaSyAqgAxxo3m2hpEGYi7l67WIV7VQ_G5hM88",
  authDomain: "travelbuddy-261311.firebaseapp.com",
  databaseURL: "https://travelbuddy-261311.firebaseio.com",
  projectId: "travelbuddy-261311",
  storageBucket: "travelbuddy-261311.appspot.com",
  messagingSenderId: "955274868327",
  appId: "1:955274868327:web:d21356955b0d832a42c6c2",
  measurementId: "G-B649LJZBXP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let feedback = {};
//create firebase database reference
let dbRef = firebase.database();

$(() => {
  $("#submit").click(() => {
    addFeedback();
    alert("Sent Successfully!");
  });
});

function addFeedback() {
  dbRef
    .ref("feedbacks")
    .push()
    .set(
      {
        name: $("#full-name").val(),
        message: $("#message").val()
      },
      error => {
        if (error) {
          alert(error);
        }
      }
    );
}
