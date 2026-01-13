export let bordArray = loadBoard();

export function loadBoard() {
  return JSON.parse(localStorage.getItem("kanbanBoard")) || [];
}

export function saveBoard() {
  localStorage.setItem("kanbanBoard", JSON.stringify(bordArray));
}

export function createCard(title, columnData) {
  const card = {
    id: generateUniqueId(),
    title,
    columnData,
    createdAt: Date.now()
  };
  bordArray.push(card);
  saveBoard();
  return card;
}

export function updateCard(id, newTitle) {
  const card = bordArray.find(c => c.id === id);
  if (card) {
    card.title = newTitle;
    saveBoard();
  }
}

const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export function deleteCard(cardObject) {
  bordArray = bordArray.filter(item => item.id !== cardObject.id);
  saveBoard();
}

export function updateCardToNColumn(getColumnId,dragElmId) {
  if (getColumnId !== null && dragElmId !== null) {
    let cardObject = bordArray.find(item => item.id === dragElmId);
    cardObject.columnData = getColumnId;
    saveBoard()
  } 
}

export function sortCard(array) {
 let sortArray = array.sort((a,b) => a.createdAt - b.createdAt)
  return sortArray;
}