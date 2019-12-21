let items = [];
$(() => {
  $("#booking-btn").click(() => {
    window.location.href = "/pages/Bookings/index.html";
  });

  $(".train-avail").click(e => {
    let id = e.target.id;
    console.log(id);
    if (id === "train-one") {
      window.localStorage.setItem("seat", $("#seats-input").val());
      window.localStorage.setItem("class", $("#class-type").val());
      window.localStorage.setItem("seat", $("#seats-input").val());
      window.localStorage.setItem("date", $("#date").val());
      window.localStorage.setItem("start", $("#start-time-1").text());
      window.localStorage.setItem("end", $("#end-time-1").text());
      window.localStorage.setItem("dest", $("#destination-1").text());
      window.localStorage.setItem("price", $("#price-1").text());
      window.location.href = "/pages/Payment/index.html";
    } else {
      window.localStorage.setItem("class", $("#class-type").val());
      window.localStorage.setItem("seat", $("#seats-input").val());
      window.localStorage.setItem("date", $("#date").val());
      window.localStorage.setItem("start", $("#start-time-2").text());
      window.localStorage.setItem("end", $("#end-time-2").text());
      window.localStorage.setItem("dest", $("#destination-2").text());
      window.localStorage.setItem("price", $("#price-2").text());

      window.location.href = "/pages/Payment/index.html";
    }
  });
});
