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

        // Clear the input field
        noteInput.value = "";
        noteTitle.value = "";
    }
};

function saveNoteToLocalStorage(noteTitleText, noteText) {
    // Get existing notes from local storage or initialize an empty array
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Add the new note as an object to the array
    notes.push({ title: noteTitleText, text: noteText });

    // Save the updated notes array back to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
}


function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Loop through the notes and create HTML elements for each note
    notes.forEach((noteText, noteTitleText) => {
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
    </div>`

        // Append the note to the noteList
        noteList.appendChild(note);
    });
}

// Call the function to load notes when the page loads
window.addEventListener("load", loadNotesFromLocalStorage);



// Event listeners
addButton.addEventListener("click", ()=>{
    addNote();
    saveNoteToLocalStorage();
});

noteList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        // Remove the HTML element from the DOM
        const noteElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        noteElement.remove();

        // Get the current notes from local storage
        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        // Find the index of the note to delete based on its title
        const noteTitleToDelete = noteElement.querySelector("h4").textContent;
        const noteIndex = notes.findIndex((note) => note.title === noteTitleToDelete);

        if (noteIndex !== -1) {
            // Remove the note from the array
            notes.splice(noteIndex, 1);

            // Update local storage with the modified notes array
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }
});
