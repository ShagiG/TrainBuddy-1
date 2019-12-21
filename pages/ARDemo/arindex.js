function verifyMarker() {
  var amarker = document.getElementById("amarker");
  if (amarker.object3D.visible) {
    console.log("marker visible");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dbRef
          .ref(`treasures/${user.uid}`)
          .push()
          .set({
            score: 450
          });
      }
    });
    window.location.href = "congrats.html";
  } else {
    console.log("not visible");
  }
}

setInterval(this.verifyMarker, 2000);
