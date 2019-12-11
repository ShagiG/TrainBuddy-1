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

//create firebase database reference
var dbRef = firebase.database();
var faviouritesRef = dbRef.ref("faviourites");

//load older conatcts as well as any newly added one...
faviouritesRef.on("child_added", function(snapshot) {
  $("#fav-items").append(contactHtmlFromObject(snapshot.val()));
});

function contactHtmlFromObject(snap) {
  var distance = "103km Away";
  var html = "";
  html += '<div class="fav-item">';
  html += '<p class="distance-txt">' + distance + "</p>";
  html += '<div class="location">';
  html += '<p class="district">' + snap.district + "</p>";
  html += '<p class="place">' + snap.landmark + "</p>";
  html += "</div>";

  html += '<p class="user-owner">';
  html +=
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera">';
  html +=
    '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z">';
  html += "</path>";
  html += '<circle cx="12" cy="13" r="4"></circle>';
  html += "</svg> ";
  html += "&nbsp;" + snap.author + "</p>";
  html += "</div>";
  return html;
}
