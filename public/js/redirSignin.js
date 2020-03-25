firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    location.href = "signin";
  } else {
    firebase.firestore().collection("users").doc(user.uid).get().then(function(doc) {
      if (!doc.exists && location.pathname != "/user-info") {
        location.href = "user-info";
      }
    });
  }
});
