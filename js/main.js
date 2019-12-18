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
let dbRef = firebase.database();
let feedRef = dbRef.ref("newsFeed");
//Reference to the booking list
let bookingRef = dbRef.ref("bookings");

var autocomplete, place;

//Load the components when document is ready
$(function() {
  $("#footer").load("/components/footer.html");
  $("#navigation-bar").load("/components/navigationBar.html");
  $("#header").load("/components/header.html");
});

//Page Navigation
$(document).on("click", "#home-icon", function() {
  window.location.href = "/pages/NewsFeed/index.html";
});

$(document).on("click", "#star-icon", function() {
  window.location.href = "/pages/Favourites/index.html";
});

$(document).on("click", "#camera-icon", function() {
  window.location.href = "/pages/Camera/index.html";
});

$(document).on("click", "#train-icon", function() {
  window.location.href = "/pages/BookTicket/index.html";
});

$(document).on("click", "#settings-icon", function() {
  window.location.href = "/pages/Settings/index.html";
});

//Range slider popup
$(document).on("input", "#distance-range", function() {
  let control = $(this),
    min = control.attr("min"),
    max = control.attr("max"),
    val = control.val(),
    thumbWidth = control.data("thumbwidth");

  let range = max - min;

  let position = ((val - min) / range) * 100;
  let offsetPosition =
    Math.round((thumbWidth * position) / 100) - thumbWidth / 2;
  let output = control.next("output");

  output
    .css("left", "calc(" + position + "% - " + offsetPosition + "px)")
    .text(val);

  $("#range-val").html(control.val());
});
