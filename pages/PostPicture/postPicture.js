let imageUrl;
let capturedMoment = {};
let myCapturedMoment = {};

//Function to call database save function
$(document).on("click", "#share-btn", function() {
  $(".lds-hourglass").css("display", "block");
  $("#share-btn").css("display", "none");
  writeUserData();
});

$(function() {
  imageUrl = window.localStorage.getItem("image");
  $("#captured-image").attr("src", atob(imageUrl));
  $("#cancel-btn").click(() => {
    window.location.href = "/pages/NewsFeed/index.html";
  });
});

//write data to database
function writeUserData() {
  dbRef
    .ref("newsFeed")
    .push()
    .set(capturedMoment, error => {
      if (error) {
        alert(error);
      } else {
        dbRef
          .ref(`myPosts/${firebase.auth().currentUser.uid}`)
          .push()
          .set(myCapturedMoment, err => {
            if (err) {
              console.log(err);
            } else {
              $(".lds-hourglass").css("display", "none");
              $("#share-btn").css("display", "block");
              window.location.href = "/pages/NewsFeed/index.html";
            }
          });
      }
    });
}

//to get autocomplete places
function initAutocomplete() {
  // Create the autocomplete object
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("pac-input")
  );
  autocomplete.addListener("place_changed", function getPlaceDetails() {
    place = autocomplete.getPlace();
    let district;
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      if (addressType === "administrative_area_level_2") {
        district = place.address_components[i].long_name;
      }
    }
    console.log(district);
    capturedMoment.long = place ? place.geometry.location.lng() : "";
    capturedMoment.lat = place ? place.geometry.location.lat() : "";
    capturedMoment.imageUrl = atob(imageUrl);
    capturedMoment.landmark = place ? place.name : "";
    capturedMoment.district = district;
    capturedMoment.description = $("#description-box").val();
    capturedMoment.createdAt = firebase.database.ServerValue.TIMESTAMP;
    capturedMoment.likes = 0;
    capturedMoment.likedBy = {
      isExist: false
    };
    capturedMoment.favBy = {
      isExist: false
    };
    capturedMoment.isLiked = false;
    capturedMoment.isFavourite = false;
    capturedMoment.author = firebase.auth().currentUser.displayName;
    capturedMoment.authorId = firebase.auth().currentUser.uid;
    capturedMoment.authorImg = firebase.auth().currentUser.photoURL;

    myCapturedMoment.long = place ? place.geometry.location.lng() : "";
    myCapturedMoment.lat = place ? place.geometry.location.lat() : "";
    myCapturedMoment.imageUrl = atob(imageUrl);
    myCapturedMoment.landmark = place ? place.name : "";
    myCapturedMoment.district = district;
    myCapturedMoment.description = $("#description-box").val();
    myCapturedMoment.createdAt = firebase.database.ServerValue.TIMESTAMP;
    myCapturedMoment.likes = 0;
    myCapturedMoment.score = 2;
    myCapturedMoment.isFavourite = false;
    myCapturedMoment.author = firebase.auth().currentUser.displayName;
    myCapturedMoment.authorImg = firebase.auth().currentUser.photoURL;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var rad = function(x) {
          return (x * Math.PI) / 180;
        };

        var getDistance = function() {
          var R = 6378137; // Earth’s mean radius in meter
          var dLat = rad(position.coords.latitude - capturedMoment.lat);
          var dLong = rad(position.coords.longitude - capturedMoment.long);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(capturedMoment.lat)) *
              Math.cos(rad(position.coords.latitude)) *
              Math.sin(dLong / 2) *
              Math.sin(dLong / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
          var dinKm = d * 0.001;

          return dinKm; // returns the distance in Kilometer
        };
      });
    }
  });
}
