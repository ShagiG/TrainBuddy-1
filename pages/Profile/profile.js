//Global Variable
let totalPoints = 0;

$(function() {
  $("#leader-btn").click(() => {
    window.location.href = "#";
  });
  $("#book-btn").click(() => {
    window.location.href = "/pages/BookTicket/index.html";
  });
  $("#booking-btn").click(() => {
    window.location.href = "/pages/Bookings/index.html";
  });
});

try {
  feedRef.on("child_added", snapshot => {
    if (snapshot.val().author === "Thivagar Mahendran") {
      $("#my-feed").append(createHtmlItem(snapshot.val(), snapshot.key));
    }
  });
} catch (error) {
  console.log(error);
}

try {
  dbRef.ref("/myPosts").on("child_added", snapshot => {
    totalPoints += parseInt(snapshot.val().points);
    $("#point-show").html(totalPoints);
    console.log(snapshot.val().points);
  });
} catch (error) {
  console.log(error);
}

function createHtmlItem(snap, id) {
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
  html += '<p class="full-name">' + snap.author + "</p>";
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
