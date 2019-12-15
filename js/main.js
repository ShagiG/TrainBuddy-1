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

var autocomplete, place;
var capturedMoment = {};

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
  window.location.href = "#";
});

$(document).on("click", "#train-icon", function() {
  window.location.href = "#";
});

$(document).on("click", "#settings-icon", function() {
  window.location.href = "#";
});
