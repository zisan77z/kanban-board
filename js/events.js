import { createCardElement, appendCardToColumn, openModal, closeModal, modalInput, openDeleteModal, closeDeleteModal, modal } from "./ui.js";
import { createCard, bordArray, updateCard, deleteCard, updateCardToNColumn, sortCard } from "./data.js";

export let currentColumnId = null;
export let editingCardId = null;
const deleteItemName = document.querySelector(".delete-item-name");
const noBtn = document.querySelector(".no");
const yesBtn = document.querySelector(".yes");

export function initEvents() {
  const addBtn = document.querySelector(".modal-add");
  const cancelBtn = document.querySelector(".modal-cancel");
  const addCardBtns = document.querySelectorAll(".add-card-btn");

  addCardBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      currentColumnId = e.target.dataset.column;
      editingCardId = null;
      modalInput.value = "";
      openModal();
      modalInput.focus(); // openModal() এ call
    });
  });

  addBtn.addEventListener("click", () => {
    const title = modalInput.value.trim();
    if (!title) return console.log("Fill the title field");

    if (editingCardId !== null) {
      // Update existing card
      updateCard(editingCardId, title);
      const cardEl = document.getElementById(editingCardId);
      cardEl.querySelector(".title").textContent = title;
    } else {
      // Create new card
      const card = createCard(title, currentColumnId);
      const cardElement = createCardElement(card);
      attachEditListener(cardElement);
      appendCardToColumn(cardElement, currentColumnId);
    }

    closeModal();
  });

  cancelBtn.addEventListener("click", closeModal);
  initYesBtn();
  initNoBtn();
  // Close modal on outside click
  document.addEventListener("click", (e) => {
    if (!modal.contains(e.target) && !e.target.classList.contains("add-card-btn") && e.target !== addBtn && e.target !== cancelBtn) {
      closeModal();
    }
  });
}

export function attachEditListener(cardElement) {
  const titleEl = cardElement.querySelector(".title");
  titleEl.addEventListener("click", () => {
    editingCardId = cardElement.id;
    const cardObj = bordArray.find(c => c.id === editingCardId);
    if (!cardObj) return;

    modalInput.value = cardObj.title;
    currentColumnId = cardObj.columnData;
    openModal();
  });
}

let deleteCardObject = null;

export function attachDeleteListener(deletebtn) {
  deletebtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-delete-button")) {
      const titlebox = e.target.closest(".header-title-box");
      const boxId = titlebox.id;
      const cardObject = bordArray.find(item => item.id === boxId);
      deleteCardObject = cardObject;
      deleteItemName.innerHTML = cardObject.title
      openDeleteModal();
    }
  });
}

function initYesBtn() {
  yesBtn.addEventListener("click", () => {
    if (deleteCardObject) {
      document.getElementById(deleteCardObject.id).closest(".header-title-box").classList.add("hidden");
      setTimeout(() => {document.getElementById(deleteCardObject.id).closest(".header-title-box").remove();
      deleteCard(deleteCardObject);
      closeDeleteModal();
      deleteCardObject = null;
    }, 300); // 300ms CSS transition
      
    }
  });
}
function initNoBtn() {
  noBtn.addEventListener("click", () => {
    closeDeleteModal();
  });
}

let dragElmId = null;
export function attathDraglistener(elm) {
  elm.addEventListener("dragstart", (e) => {
    dragElmId = e.target.id;
    elm.classList.add("dragging");
  });
elm.addEventListener("dragend", () => {
  elm.classList.remove("dragging");
});

}

export function makeDraggble() {
  document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    column.addEventListener("drop", () => {
      const columnData = column.dataset.column;
      if (!dragElmId) return;
      const dragElement = document.getElementById(dragElmId);
      column.querySelector(".card-container").append(dragElement);
      updateCardToNColumn(columnData, dragElmId);
      dragElmId = null;
      console.log(bordArray);
    });
  });
}

// Render the board
export function renderBoard() {
  // Clear all containers
  document.querySelectorAll(".card-container").forEach(container => {
    container.innerHTML = "";
  });

  // Sort cards
  let sortedArray = sortCard(bordArray);

  // Render each card
  sortedArray.forEach(card => {
    const cardEl = createCardElement(card);
    appendCardToColumn(cardEl, card.columnData);
    attachEditListener(cardEl);
  });

  // Re-init events & drag
  initEvents();
  makeDraggble();
}
