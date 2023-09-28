const noteInput = document.getElementById("note-input");
const addButton = document.getElementById("add-button");
const noteList = document.getElementById("note-list");
const noteTitle = document.getElementById("title-input");

function addNote() {
    const noteText = noteInput.value.trim();
    const noteTitleText = noteTitle.value.trim();
    if (noteText !== "") {
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerHTML = `
        <div class="notes__container" id="note-list">
        <div class="note">
            <div class="notes__action">
            <h4>${noteTitleText}</h4>
                <div class="action__con">
                    <i class="ri-file-copy-line"></i>
                    <i class="ri-delete-bin-3-line delete-button delete-button"></i>
                    <i class="ri-more-2-fill"></i>
                </div>
            </div>
            <p>${noteText}</p>
        </div>
    </div>
        `;
        noteList.appendChild(note);

        // Save the note to local storage
        saveNoteToLocalStorage(noteText);

        // Clear the input field
        noteInput.value = "";
        noteTitle.value = "";
    }
}

// Function to delete a note
function deleteNote(note) {
    noteList.removeChild(note);
    const noteText = note.querySelector("p").textContent;
    deleteNoteFromLocalStorage(noteText);
}

// Function to save a note to local storage
function saveNoteToLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to delete a note from local storage
function deleteNoteFromLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((note) => note !== noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((noteText) => {
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerHTML = `
        <div class="notes__container" id="note-list">
        <div class="note">
            <div class="notes__action">
            <h4>${noteTitleText}</h4>
                <div class="action__con">
                    <i class="ri-file-copy-line"></i>
                    <i class="ri-delete-bin-3-line id="delete-button"></i>
                    <i class="ri-more-2-fill"></i>
                </div>
            </div>
            <p>${noteText}</p>
        </div>
    </div>
        `;
        noteList.appendChild(note);
    });
}

// Event listeners
addButton.addEventListener("click", addNote);

noteList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        const note = e.target.parentElement.parentElement;
        deleteNote(note);
    }
});
