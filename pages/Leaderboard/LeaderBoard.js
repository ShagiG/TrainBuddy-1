let totalPoints = 0;
let trophies = 0;
let cuser = {};
$(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      cuser.displayName = user.displayName;
      cuser.email = user.email;
      cuser.photoURL = user.photoURL;
      cuser.uid = user.uid;
      console.log(user.uid);
      try {
        dbRef.ref(`myPosts/${user.uid}`).on("child_added", snapshot => {
          totalPoints += parseInt(snapshot.val().score);
        });
      } catch (error) {
        console.log(error);
      }

      try {
        dbRef.ref(`treasures/${user.uid}`).on("child_added", snapshot => {
          totalPoints += 450;
          trophies += 1;
          $("#trophy-count").html(trophies);
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
