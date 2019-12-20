let auth = firebase.auth();
let storeRef = firebase.storage().ref();

$(function() {
  $("#signup-btn").click(function() {
    let imgFile = document.getElementById("file-upload").files[0];
    let imgUpl = storeRef.child("avatars/" + imgFile.name).put(imgFile);
    let imgurl;
    imgUpl
      .then(snap => snap.ref.getDownloadURL())
      .then(url => {
        imgurl = url;
        auth
          .createUserWithEmailAndPassword(
            $("#email-input").val(),
            $("#password-input").val()
          )
          .then(user => {
            let authUser = auth.currentUser;
            console.log(imgurl);
            let value = {
              displayName: $("#full-name").val(),
              photoURL: imgurl
            };
            authUser
              .updateProfile(value)
              .then(function() {
                window.location.href = "/pages/UserAuth/login.html";
              })
              .catch(function(error) {
                alert(error);
              });
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
      });
  });

  $("#login-btn").click(function() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        $("#email-input").val(),
        $("#password-input").val()
      )
      .then(() => {
        window.location.href = "/pages/NewsFeed/index.html";
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  });
});

//Send email function to export favourites list
function sendEmail() {

    // getting the value of the send email modal inputs
    var receiver = document.getElementById("email-to").value;
    Email.send({
      Host: "smtp.gmail.com",
      Username: "trainbuddytest@gmail.com",
      Password: "Buddy678",
      To: receiver,
      From: "trainbuddytest@gmail.com",
      Subject: "Verification Code",
      Body: "1234"
    }).then(() =>{
      $("#forgotpassword1-page").css("display", "none");
      $("#forgotpassword2-page").css("display", "block");
  });
}
