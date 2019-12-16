//Load all Newsfeed Items
try {
  let idNo = 0;
  bookingRef.on("child_added", snapshot => {
    idNo++;
    $(".booking-element-loading").css("display", "none");
    if (snapshot.val().isComplete) {
      $("#past-list").append(createPastItem(snapshot.val()));
    } else {
      $("#upcome-list").append(createCurrItem(snapshot.val(), snapshot.key));
    }
  });
} catch (error) {
  console.log(error);
}

try {
  bookingRef.on("child_removed", snapshot => {
    let remv = document.getElementById(snapshot.key);
    remv.parentNode.removeChild(remv);
  });
} catch (error) {
  console.log(error);
}

function cancelBooking(key) {
  console.log("clicked");
  dbRef.ref("bookings/" + key).remove();
}

function createPastItem(snap) {
  let totPrice = snap.price * snap.qty;

  let html = "";
  html += '<div class="booking-element">';
  html += '<div class="ui-grid-b top-row">';
  html += '<div class="ui-block-a">';
  html += '<p class="is-complete">Trip Completed</p>';
  html += "</div>";
  html += '<div class="ui-block-b">';
  html += '<p class="order-no">' + snap.id + "</p>";
  html += "</div>";
  html += '<div class="ui-block-c">';
  html += '<img class="check-icon" src="/assets/icons/check-circle.svg" />';
  html += "</div>";
  html += "</div>";
  html += "<hr />";
  html += '<p class="date-txt">' + snap.date + "</p>";
  html += '<p class="class-type">' + snap.class + "</p>";
  html += '<div class="ui-grid-a">';
  html += '<div class="ui-block-a">';
  html += '<p class="price-qty">LKR' + snap.price + " x " + snap.qty + "</p>";
  html += "</div>";
  html += '<div class="ui-block-b">';
  html += '<p class="price-txt">Total: LKR' + totPrice + "</p>";
  html += "</div>";
  html += "</div>";
  html += "<hr />";
  html += '<div class="ui-grid-b">';
  html += '<div class="ui-block-a">';
  html += '<p class="time-txt">' + snap.startTime + "</p>";
  html += '<p class="place-txt">' + snap.from + "</p>";
  html += "</div>";
  html += '<div class="ui-block-b arrow">';
  html += '<img src="/assets/icons/arrow-right.svg" />';
  html += "</div>";
  html += '<div class="ui-block-c" style="text-align: right;">';
  html += '<p class="time-txt">' + snap.endTime + "</p>";
  html += '<p class="place-txt">' + snap.to + "</p>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  return html;
}

function createCurrItem(snap, id) {
  let totPrice = snap.price * snap.qty;

  let html = "";
  html += "<div id=" + id + ' class="booking-element">';
  html += '<div class="ui-grid-b top-row">';
  html += '<div class="ui-block-a">';
  html += '<p class="is-complete">Upcoming</p>';
  html += "</div>";
  html += '<div class="ui-block-b">';
  html += '<p class="order-no">' + snap.id + "</p>";
  html += "</div>";
  html += '<div class="ui-block-c">';
  html += '<p class="date-txt">' + snap.date + "</p>";
  html += "</div>";
  html += "</div>";
  html += "<hr />";
  html += '<p class="class-type">' + snap.class + "</p>";
  html += '<p class="place-txt">seats ' + snap.qty + "</p>";
  html += '<p class="place-txt">Price: LKR ' + totPrice + "</p>";
  html += '<div class="ui-grid-b tick-info">';
  html += '<div class="ui-block-a">';
  html += '<p class="time-txt">' + snap.startTime + "</p>";
  html += '<p class="place-txt">' + snap.from + "</p>";
  html += "</div>";
  html += '<div class="ui-block-b arrow">';
  html += '<img src="/assets/icons/arrow-right.svg" />';
  html += "</div>";
  html += '<div class="ui-block-c" style="text-align: right;">';
  html += '<p class="time-txt">' + snap.endTime + "</p>";
  html += '<p class="place-txt">' + snap.to + "</p>";
  html += "</div>";
  html += "</div>";
  html += "<hr />";
  html +=
    '<button class="cancel-btn" data-role="none" onClick="cancelBooking(\'' +
    id +
    "')\">Cancel</button>";
  html += "</div>";
  return html;
}
