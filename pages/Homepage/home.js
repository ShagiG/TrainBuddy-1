let feedback = {};

$(() => {
  $("#submit").click(() => {
    addFeedback();
    alert("Sent Successfully!");
  });
});

function addFeedback() {
  dbRef
    .ref("feedbacks")
    .push()
    .set(
      {
        name: $("#full-name").val(),
        message: $("#message").val()
      },
      error => {
        if (error) {
          alert(error);
        }
      }
    );
}
