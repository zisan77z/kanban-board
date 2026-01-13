# 📝 Kanban Board Web App

A **modular, dynamic Kanban Board** built with **Vanilla JavaScript, HTML, and CSS**, featuring **create, edit, delete, drag & drop, search, sort, and persistent storage**. Perfect for task management or productivity apps.

---

## 🌟 Features

### ✅ Core Features
- **Add / Edit / Delete Cards** in any column
- **Drag & Drop Cards** between columns (Todo / In Progress / Completed)
- **Persistent Storage:** All tasks saved in `localStorage`
- **Sort Cards:** Sort cards by creation date
- **Search / Filter:** Quickly find cards by title
- **Modal UI:** Smooth add/edit modals
- **Delete Confirmation Modal** to prevent accidental deletions
- **Responsive Design:** Works on desktop and mobile

### ⚡ Optional / Future Enhancements
- Multi-board support (manage multiple projects)
- Card description, due date, and tags
- Keyboard accessibility (Enter → add, Escape → cancel modal)
- Touch drag & drop support for mobile
- Animated transitions for card movement, add, delete

---

## 🏗 Project Structure

```text
kanban-board/
│── index.html
│── style/
│     └── style.css
│── js/
│     ├── app.js          # Entry point; loads board, initializes events
│     ├── data.js         # Handles state: create, delete, update, drag/drop, localStorage
│     ├── ui.js           # DOM creation & manipulation (cards, modals)
│     └── events.js       # Event listeners: add, edit, delete, drag/drop, search
│── assets/
│     └── icons/ (optional)
````

---

## 🎨 UI Layout

```
-------------------------------------------
|  Header:  [Search Box] [Add Card Button]|
-------------------------------------------

---------------------------------------------------------
|    TODO        |   IN PROGRESS     |     COMPLETED    |
---------------------------------------------------------
|  + Add Card    |  + Add Card       |   + Add Card     |
|  [Card 1]      |  [Card A]         |   [Card M]       |
|  [Card 2]      |                   |                  |
---------------------------------------------------------
```

---

## 💻 Usage

1. Open `index.html` in a modern browser.
2. **Add a Card**

   * Click the `＋ Add Card` button in any column
   * Enter a title in the modal → Click `Add`
3. **Edit a Card**

   * Click the card title → Modal opens → Update title → Click `Add`
4. **Delete a Card**

   * Click the `Delete` button → Confirm in delete modal
5. **Drag & Drop**

   * Drag a card to any other column → Board state automatically updates
6. **Search / Filter**

   * Use the search input to filter cards by title
7. **Sort Cards**

   * Click `⇅ Sort Cards` to sort by creation date

---

## ⚙ Tech Stack

* **HTML5** – Semantic markup
* **CSS3** – Flexbox layout, transitions, responsive design
* **JavaScript (ES6 Modules)** – Modular, maintainable code
* **LocalStorage API** – Persistent client-side storage

---

## 🔑 Key Implementation

* **Modular JS**

  * `app.js`: Initializes board, loads cards, sets up events
  * `data.js`: Handles all card logic & localStorage
  * `ui.js`: Creates DOM elements (cards, modals), appends to columns
  * `events.js`: Attaches event listeners for add/edit/delete/drag/search
* **Drag & Drop**

  * Uses `dragstart`, `dragover`, `drop` events
  * Updates `columnData` in `bordArray` and localStorage
* **Search & Filter**

  * Filters cards by title in real-time
  * Hides empty columns if no visible cards
* **Sort**

  * Sorts cards based on `createdAt` timestamp
* **Modals**

  * Smooth open/close
  * Input focus management
* **Delete Confirmation**

  * Prevents accidental deletion
  * Fade-out animation on card removal

---

## 📝 Board State

All cards are stored in `localStorage` under `kanbanBoard`:

```json
[
  {
    "id": "1652156789-2345",
    "title": "Task title",
    "columnData": "todo",
    "createdAt": 1652156789123
  }
]
```

---

## 🚀 Run Locally

1. Clone the repository:

```bash
git clone <repo-url>
```

2. Open `index.html` in your browser.

No backend needed; fully client-side.

---

## 👨‍💻 Author

**ZISAN** – Frontend Web Developer
GitHub: [zisan77z](https://github.com/zisan77z)

```

