/* app.js - To-Do app with localStorage */
const STORAGE_KEY = 'flashfund_todos_v1';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const countSpan = document.getElementById('count');
const clearBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filters button');

let todos = []; // {id, text, completed, createdAt}
let filter = 'all';

function saveTodos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return todos = [];
  try{ todos = JSON.parse(raw) || []; }catch(e){ console.error('Failed to parse todos', e); todos = []; }
}

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

function addTodo(text){
  if(!text || !text.trim()) return;
  todos.unshift({ id: uid(), text: text.trim(), completed: false, createdAt: Date.now() });
  saveTodos();
  render();
}

function toggleComplete(id){
  const t = todos.find(x=>x.id===id); if(!t) return;
  t.completed = !t.completed; saveTodos(); render();
}

function deleteTodo(id){
  todos = todos.filter(x=>x.id!==id); saveTodos(); render();
}

function editTodo(id){
  const t = todos.find(x=>x.id===id); if(!t) return;
  const value = prompt('Edit to-do', t.text);
  if(value===null) return; // cancelled
  t.text = value.trim(); saveTodos(); render();
}

function clearCompleted(){
  todos = todos.filter(x=>!x.completed); saveTodos(); render();
}

function setFilter(f){
  filter = f; filterButtons.forEach(b=>b.classList.toggle('active', b.dataset.filter===f)); render();
}

function render(){
  todoList.innerHTML = '';
  const filtered = todos.filter(t=>{
    if(filter==='all') return true;
    if(filter==='active') return !t.completed;
    if(filter==='completed') return t.completed;
  });

  for(const t of filtered){
    const li = document.createElement('li'); li.className = 'todo-item';

    const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = t.completed;
    cb.addEventListener('change', ()=> toggleComplete(t.id));

    const span = document.createElement('div'); span.className='title'+(t.completed? ' completed': ''); span.textContent = t.text;
    span.title = 'Double‑click to edit';
    span.addEventListener('dblclick', ()=> editTodo(t.id));

    const editBtn = document.createElement('button'); editBtn.textContent = 'Edit'; editBtn.addEventListener('click', ()=> editTodo(t.id));
    const delBtn = document.createElement('button'); delBtn.textContent = 'Delete'; delBtn.addEventListener('click', ()=> deleteTodo(t.id));

    li.appendChild(cb); li.appendChild(span); li.appendChild(editBtn); li.appendChild(delBtn);
    todoList.appendChild(li);
  }

  const activeCount = todos.filter(x=>!x.completed).length;
  countSpan.textContent = `${activeCount} item${activeCount!==1? 's':''} left`;
}

// event handlers
todoForm.addEventListener('submit', e=>{
  e.preventDefault(); addTodo(todoInput.value); todoInput.value=''; todoInput.focus();
});

clearBtn.addEventListener('click', ()=>{ if(confirm('Clear all completed items?')) clearCompleted(); });

filterButtons.forEach(b=> b.addEventListener('click', ()=> setFilter(b.dataset.filter)));

// initialize
loadTodos(); render();
