$(() => {
  $("#logout-btn").click(() => {
    firebase.auth().signOut();
    window.location.href = "/pages/UserAuth/login.html";
  });
});
