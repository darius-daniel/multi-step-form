import "./style.css";

let currentPage = 0;

const markerForCurrentPage = document
  .getElementsByClassName("navItem__marker")
  .item(currentPage);

console.log(markerForCurrentPage);
markerForCurrentPage.classList.add("highlightMarker");
