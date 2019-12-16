let likeCounts;
let feeds = [];

//Load all Newsfeed Items
try {
  feedRef.on("child_added", snapshot => {
    feeds.push(snapshot.val());
    $("#feed-items").append(createHtmlItem(snapshot.val(), snapshot.key));
  });
} catch (error) {
  console.log(error);
}

function likeItem(key, isLiked) {
  $("#unlike-" + key).css("display", "none");
  $("#liked-" + key).css("display", "block");
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

  html += '<div class="container feed">';
  html += '<div class="row head">';
  html += '<div class="col-2 col-md-2 img-container">';
  html += '<img class="avatar" src=' + "" + "/>";
  html += "</div>";
  html += '<div class="col-10 col-md-10 name-date">';
  html += '<p class="full-name">' + snap.author + "</p>";
  html += '<p class="date-time">' + refinedDate + " at " + refinedTime + "</p>";
  html += "</div>";
  html += "</div>";

  html += '<div class="row post-img">';
  html += "<img src=" + snap.imageUrl + " />";
  html += "</div>";
  html += '<div class="row">';
  html += '<div class="col-12 col-md-12">';
  html += '<p class="caption">' + snap.description + "</p>";
  html += "</div>";
  html += '<div class="col-12 col-md-12">';
  html += '<p class="location">';
  html +=
    '<img src="/assets/icons/map-pin.svg" />' +
    snap.district +
    ", " +
    snap.landmark +
    "</p>";
  html += "</div>";
  html += "</div>";
  html += "<hr />";

  html += '<div class="row buttons">';
  html += '<div class="col-3 col-md-3">';
  html +=
    '<button class="like-btn" data-role="none" onClick="likeItem(\'' +
    id +
    "')\">";
  html +=
    "<img id=unlike-" +
    id +
    ' class="unlike" src="/assets/icons/thumbs-up.svg" />';
  html +=
    "<img id=liked-" +
    id +
    ' class="liked" src="/assets/icons/Active/thumbs-up.svg" />';
  html += "</button>";
  html += "</div>";
  html += '<div class="col-2 col-md-2">';
  html += '<p class="like-count">' + snap.likes + "</p>";
  html += "</div>";
  html += '<div class="col-3 col-md-3">';
  html += '<button class="comment-btn" data-role="none">';
  html += '<img class="comment" src="/assets/icons/message-circle.svg" />';
  html += "</button>";
  html += "</div>";
  html += '<div class="col-4 col-md-4">';
  html += '<button class="fav-btn" data-role="none" style="float: right;">';
  html += '<img class="unstar" src="/assets/icons/heart.svg" />';
  html += '<img class="starred" src="/assets/icons/Active/heart.svg" />';
  html += "</button>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  return html;
}
