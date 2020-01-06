let points = 0;

$(() => {
  //Stripe
  var handler = StripeCheckout.configure({
    key: "pk_test_cp21BcECf4kMMUbSlRlZlsMo",
    token: function(token) {
      if (token.id) {
        $("#thankyouPayment").html("Thank you");
      }
    }
  });

  let seats = parseInt(window.localStorage.getItem("seat"));
  let price = parseInt(window.localStorage.getItem("price"));
  let finalPrice;

  $("#class").html(window.localStorage.getItem("class"));
  $("#start").html(window.localStorage.getItem("start"));
  $("#end").html(window.localStorage.getItem("end"));
  $("#destination").html(window.localStorage.getItem("dest"));
  $("#seats").html(seats);
  $("#price").html(price);
  $("#tot-price").html(`LKR ${seats * price}.00`);

  $("#use-points").html(points);

  $("#plus-btn").click(() => {
    points += 1;
    if (points <= 100) {
      $("#use-points").html(points);
      finalPrice = seats * price - points;
      $("#tot-price").html(`LKR ${finalPrice}.00`);
    } else {
      alert("You can use max of 100 Points only");
    }
  });
  $("#minus-btn").click(() => {
    points -= 1;
    if (points >= 0) {
      $("#use-points").html(points);
      finalPrice = seats * price - points;
      $("#tot-price").html(`LKR ${finalPrice}.00`);
    } else {
      alert("Theres no Minus Points!");
    }
  });

  $("#cancel-btn").click(() => {
    window.location.href = "/pages/BookTicket/index.html";
  });

  $("#paynow-btn").on("click", function(e) {
    let checkedVal = $("input[type='radio']:checked").val();
    console.log(checkedVal);
    if (checkedVal === "stripe") {
      dbRef
        .ref("bookings")
        .push()
        .set({
          class: window.localStorage.getItem("class"),
          date: window.localStorage.getItem("date"),
          endTime: window.localStorage.getItem("end"),
          from: "Colombo",
          id: "#12THYU5",
          isComplete: false,
          price: finalPrice,
          qty: seats,
          startTime: window.localStorage.getItem("start"),
          to: window.localStorage.getItem("dest")
        });
      handler.open({
        name: "Pay",
        currency: "LKR",
        description: "Train Ticket",
        amount: finalPrice * 100
      });
      $(window).on("popstate", function() {
        console.log("done");
        handler.close();
      });
    } else {
      dbRef
        .ref("bookings")
        .push()
        .set({
          class: window.localStorage.getItem("class"),
          date: window.localStorage.getItem("date"),
          endTime: window.localStorage.getItem("end"),
          from: "Colombo",
          id: "#12THYU5",
          isComplete: false,
          price: finalPrice,
          qty: seats,
          startTime: window.localStorage.getItem("start"),
          to: window.localStorage.getItem("dest")
        });
      window.location.href = "/pages/BookTicket/index.html";
    }
  });
});
