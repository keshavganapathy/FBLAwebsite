var auth = firebase.auth(),
  db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function(el) {
      el.addEventListener('click', function() {

        // Get the target from the "data-target" attribute
        var target = el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  auth.onAuthStateChanged(function(user) {
    var signed_out_buttons = document.getElementById("signed_out_buttons"),
      signed_in_buttons = document.getElementById("signed_in_buttons");
    if (user) {
      db.doc("users/"+user.uid).get().then(function(doc) {
        if (doc.exists) {
          document.querySelector("#signed_out_buttons > h2").innerText = "Hello, "+doc.data().first_name+"!";
        } else {
          document.querySelector("#signed_out_buttons > h2").innerText = "Hello!";
        }
        signed_out_buttons.classList.remove("is-hidden");
        signed_in_buttons.classList.add("is-hidden");
      });
    } else {
      signed_in_buttons.classList.remove("is-hidden");
      signed_out_buttons.classList.add("is-hidden");
    }
  });

  document.getElementById("sign_out").addEventListener("click", logout);

});

function logout() {
  auth.signOut();
  location.href="/";
}
