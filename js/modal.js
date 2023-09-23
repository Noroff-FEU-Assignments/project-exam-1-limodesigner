// newsletter modal popup - footer: gjøre den automatisk til index.html! 3 sec.

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    // Get the dialog element
    var dialog = document.querySelector(".subscribe-modal");

    // Show the dialog
    dialog.showModal();

    // Handle the overlay click to close the dialog
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    // Handle the subscribe button click
    var subscribeButton = document.getElementById("btnsubmit");
    subscribeButton.addEventListener("click", function (event) {
      // Handle the subscribe action here
      // You can submit the form or perform any other action
      // For demonstration, we'll just close the dialog
      dialog.close();
    });
  }, 3000); // 3000 milliseconds (3 seconds)
});

