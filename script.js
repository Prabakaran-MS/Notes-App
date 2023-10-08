let noteTitleInput = document.getElementById('noteTitleInput');
let noteBodyInput = document.getElementById('noteBodyInput');
let noteList = document.getElementById('noteList');
let currentNoteIndex = -1;
let notes = [];

function clearNote() {
    noteTitleInput.value = "";
    noteBodyInput.value = "";
    currentNoteIndex = -1;
}

function saveNote() {
    let title = noteTitleInput.value;

    if (title.trim() === "") {
        alert("Please enter a title for the note.");
        return;
    }

    const noteDetails = {
        title: title,
        body: noteBodyInput.value
    };

    if (currentNoteIndex === -1) {
        notes.push(noteDetails);
    } else {
        notes[currentNoteIndex] = noteDetails;
    }
    displayNotes();
    saveNotes();
}

function deleteNote() {
    if (currentNoteIndex !== -1) {
        notes.splice(currentNoteIndex, 1);
        saveNotes();
        clearNote();
        displayNotes();
    }
}

function displayNotes() {
    noteList.innerHTML = "";
    notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.classList.add('note-card');
        card.dataset.index = index;

        card.addEventListener('click', () => {
            displayNoteDetails(index);
        });

        card.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.body}</p>
        `;
        noteList.appendChild(card);
    });
}

function displayNoteDetails(index) {
    currentNoteIndex = index;
    const note = notes[index];
    noteTitleInput.value = note.title;
    noteBodyInput.value = note.body;
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
        notes = savedNotes;
        displayNotes();
    }
}

loadNotes();