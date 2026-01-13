import { bordArray } from "./data.js";
import { attachDeleteListener, attathDraglistener } from "./events.js";
export const modal = document.querySelector(".modal");
export const modalInput = document.querySelector(".modal-input");

export const deleteModal = document.querySelector(".delete-modal");
export const searchBox = document.querySelector(".search-box");


searchBox.addEventListener("input", (e) => {
  const value = e.currentTarget.value.toLowerCase();
    // 🔁 FULL RESET WHEN INPUT EMPTY
  if (value === "") {
    bordArray.forEach(obj => {
      document.getElementById(obj.id)?.classList.remove("hidden");
    });

    document.querySelectorAll(".column").forEach(cl => {
      cl.classList.remove("hidden");
    });

    return; // ⛔ নিচের logic আর চলবে না
  }

    
  bordArray.forEach(obj => {
    if (!obj.title.toLowerCase().includes(value)) {
      document.getElementById(obj.id).classList.add("hidden");
    } else {
      document.getElementById(obj.id).classList.remove("hidden");
    }
  });
  document.querySelectorAll(".column").forEach(cl => {
    const cards = cl.querySelectorAll(".header-title-box");
    const anyVisible = Array.from(cards).some(c => !c.classList.contains("hidden"));
   cl.classList.toggle("hidden", !anyVisible);
  })
});

export function createCardElement(cardObject) {
  const div = document.createElement("div");
  div.classList.add("header-title-box");
  div.id = cardObject.id;
  div.draggable = true;

  // fade in handled by CSS animation
  // div.style.opacity = 0;
  // setTimeout(() => div.style.opacity = 1, 10);

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = cardObject.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("card-delete-button");

  attachDeleteListener(deleteBtn);
  div.append(title, deleteBtn);

  attathDraglistener(div); // dragging effect handled here

  return div;
}

export function appendCardToColumn(cardElement, columnId) {
  document.querySelector(`.column[data-column="${columnId}"] .card-container`)
    .append(cardElement);
}

export function openModal() {
  modal.classList.remove("hidden");
}

export function closeModal() {
  modal.classList.add("hidden");
  modalInput.value = "";
}

export function openDeleteModal() {
  deleteModal.classList.remove("hidden");
}

export function closeDeleteModal() {
  deleteModal.classList.add("hidden");
}
