async function fetchNotes() {
  const response = await fetch('/notes');
  const notes = await response.json();

  const list = document.getElementById('notesList');
  list.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${note.content}
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addNote() {
  const input = document.getElementById('noteInput');
  const errorMessage = document.getElementById('errorMessage');
  const content = input.value.trim();

  if (!content) {
    errorMessage.textContent = "Note cannot be empty.";
    return;
  }

  errorMessage.textContent = "";

  await fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  });

  input.value = "";
  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`/notes/${id}`, {
    method: 'DELETE'
  });

  fetchNotes();
}

window.onload = fetchNotes;