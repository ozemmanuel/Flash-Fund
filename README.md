# To‑Do List (Flash‑Fund)

A small client-side to‑do list application using localStorage for persistence. This project adds a simple single-page app that allows adding, editing, completing, and deleting tasks. Tasks are stored in the browser's localStorage under the key `flashfund_todos_v1`.

Files added:

- `index.html` — the app UI
- `styles.css` — simple styles
- `app.js` — application logic (localStorage, rendering, CRUD)

How to use

1. Open `index.html` in a browser.
2. Add tasks, double-click or click "Edit" to modify, toggle completion with the checkbox, and delete tasks with "Delete".
3. Use the filters to view All / Active / Completed tasks. Click "Clear completed" to remove finished items.

Notes

- Data is stored locally in the browser only (no server).
- To reset, open browser devtools > Application > Local Storage and remove the `flashfund_todos_v1` key.

