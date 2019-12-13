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
$(function() {
  $("#footer").load("/components/footer.html");
  $("#navigation-bar").load("/components/navigationBar.html");
  $("#header").load("/components/header.html");
});

//create firebase database reference
let dbRef = firebase.database();
let faviouritesRef = dbRef.ref("newsFeed");

//load and sync faviourite items
try {
  faviouritesRef.on("child_added", function(snapshot) {
    $(".fav-item-loading").css("display", "none");
    if (snapshot.val().isFavourite) {
      $("#fav-items").append(contactHtmlFromObject(snapshot.val()));
    }
  });
} catch (error) {
  console.log(error);
}

function contactHtmlFromObject(snap) {
  let distance = "103km Away";
  let html = "";
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

//load favourite Item page
$(document).on("pagebeforeshow", "#favourites_page", function() {
  $(document).on("click", ".fav-item", function() {
    //Change page
    $.mobile.changePage("../FavouriteItem/index.html");
    // $.mobile.changePage("../FavouriteItem/index.html", { dataUrl : "second.html?paremeter=123", data : { 'paremeter' : '123' }, reloadPage : false, changeHash : true });
  });
});

//Function to call database save function
$(document).on("click", ".share-btn", function() {
  writeUserData();
  console.log(place.geometry.location.lat());
});

//write data to database
function writeUserData(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref("newsFeed")
    .push()
    .set(capturedMoment);
}


//to get autocomplete places

function initAutocomplete() {
  // Create the autocomplete object
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("pac-input")
  );
  autocomplete.addListener("place_changed", function getPlaceDetails() {
    place = autocomplete.getPlace();
  });
}

var capturedMoment = {
  description: "name",
  long: place ? place.geometry.location.lng() : "",
  lat: place ? place.geometry.location.lat() : "",
  district: "imageUrl",
  landmark: "imageUrl",
  imageUrl: "imageUrl",
  isFavourite: false
};
