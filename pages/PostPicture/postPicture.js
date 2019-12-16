//Function to call database save function
$(document).on("click", ".share-btn", function() {
  writeUserData();
});

//write data to database
function writeUserData(userId, name, email, imageUrl) {
  dbRef
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
    capturedMoment.long = place ? place.geometry.location.lng() : "";
    capturedMoment.lat = place ? place.geometry.location.lat() : "";
    capturedMoment.imageUrl = "images/imageKandy.jpeg";
    capturedMoment.landmark = place ? place.name : "";
    capturedMoment.description = "This a really nice place you should travel";
    capturedMoment.createdAt = firebase.database.ServerValue.TIMESTAMP;

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
