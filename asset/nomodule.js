"use strict";

var nomodule =
  '<main class="nomodule" lang="en"><h2>Modern JavaScript needed</h2>' +
  "<p>This application is built with recent web technologies.</p>" +
  '<p>Please use browser with a JavaScript engine that supports ECMAScript 2019, see Can I use <a href="https://caniuse.com/#feat=custom-elementsv1">custom elements</a>?</p>' +
  "</main>";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const nomoduleElement = document.querySelector("body");
  nomoduleElement.innerHTML = nomodule;
});
