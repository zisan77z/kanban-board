import { initEvents, attachEditListener,makeDraggble,renderBoard } from "./events.js";
import { createCardElement, appendCardToColumn } from "./ui.js";
import { bordArray } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  bordArray.forEach(card => {
    const cardEl = createCardElement(card);
    appendCardToColumn(cardEl, card.columnData);
    attachEditListener(cardEl);
  });

  initEvents();
  makeDraggble();
});



// Add click listener to Sort button
document.querySelector(".sort-cards-btn").addEventListener("click", () => {
  renderBoard();
});

