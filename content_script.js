// // This code is executed when the add-on is loaded.
// function onLoad() {
//   // Get the search input element.
//   var searchInput = document.getElementById("search-input");

//   // Listen for changes to the search input.
//   searchInput.addEventListener("input", function() {
//     // Search through the chat for the given text.
//     var matches = this.value.match(new RegExp(this.value, "i"));
//     for (var i = 0; i < matches.length; i++) {
//       var match = matches[i];
//       var span = document.createElement("span");
//       span.textContent = match;
//       span.style.color = "red";
//       this.parentNode.appendChild(span);
//     }
//   });
// }
