//Global Variable
let totalPoints = 0;
let treasurePoints = 0;
let cuser = {};

$(function() {
  $(".lds-hourglass").css("display", "block");
  $(".load-ellipsis").css("display", "block");
  $("#treasure-btn").click(() => {
    window.location.href = "/pages/ARDemo/index.html";
  });
  $("#leader-btn").click(() => {
    window.location.href = "/pages/Leaderboard/index.html";
  });
  $("#book-btn").click(() => {
    window.location.href = "/pages/BookTicket/index.html";
  });
  $("#booking-btn").click(() => {
    window.location.href = "/pages/Bookings/index.html";
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      cuser.displayName = user.displayName;
      cuser.email = user.email;
      cuser.photoURL = user.photoURL;
      cuser.uid = user.uid;

      try {
        dbRef.ref(`myPosts/${user.uid}`).on("child_added", snapshot => {
          totalPoints += parseInt(snapshot.val().score);
          $("#point-show").html(totalPoints);
          $("#my-feed").prepend(
            createHtmlItem(snapshot.val(), snapshot.key, cuser.displayName)
          );
        });
      } catch (error) {
        console.log(error);
      }

      try {
        dbRef.ref(`treasures/${user.uid}`).on("child_added", snapshot => {
          totalPoints += 450;
          treasurePoints += 1;
          $("#point-show").html(totalPoints);
          $("#trophy-show").html(treasurePoints);
        });
      } catch (error) {
        console.log(error);
      }

      $(".load-ellipsis").css("display", "none");
      $("#profile-avatar").attr({ src: user.photoURL });
    }
  });
});

function createHtmlItem(snap, id, author) {
  $(".lds-hourglass").css("display", "none");
  let html = "";
  let date = new Date(snap.createdAt);
  let refinedDate =
    date.getDate() +
    "/" +
    (parseInt(date.getMonth()) + 1) +
    "/" +
    date.getFullYear();
  let refinedTime = date.getHours() + ":" + date.getMinutes();

  html += `<div id=${id} class="feed">`;
  html += '<div class="head">';
  html += '<div class="img-container">';
  html += `<img class="avatar-img" src="${snap.authorImg}" />`;
  html += "</div>";
  html += '<div class="name-date">';
  html += '<p class="full-name">' + author + "</p>";
  html += '<p class="date-time">' + refinedDate + " at " + refinedTime + "</p>";
  html += "</div>";
  html += "</div>";

  html += '<div class="post-img">';
  html += "<img src=" + snap.imageUrl + " />";
  html += "</div>";
  html += '<div class="body-cont">';
  html += '<div class="caption-cont">';
  html += '<p class="caption">' + snap.description + "</p>";
  html += "</div>";
  html += '<div class="location-cont">';
  html += '<p class="location">';
  html +=
    '<img src="/assets/icons/map-pin.svg" /> ' +
    snap.district +
    ", " +
    snap.landmark +
    "</p>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  return html;
}
