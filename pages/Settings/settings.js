$(() => {
  $("#logout-btn").click(() => {
    firebase.auth().signOut();
    window.location.href = "/pages/UserAuth/login.html";
  });

  $("#addpay-btn").click(() => {
    window.location.href = "/pages/AddPayment/index.html";
  });
});
