import { storageService } from "../../../services/storage.service.js";

export const noteService = {
    query,
    getNoteById,

}

const KEY = 'noteDB'


const gNotes = [
    { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
    { id: "n102", type: "note-txt", isPinned: true, info: { txt: "Don't forget to turn off oven" } },
    { id: "n103", type: "note-img", info: { url: "http://some-img/me", title: "Bobi and Me" },style: { backgroundColor: "#00d" } },
    { id: "n104", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } }
];


_createNotes()


function _createNotes() {
    var notes = _loadNotesFromStorage()
    console.log(notes);
    if (!notes || !notes.length) {
        notes = gNotes

    }
    _saveNotesToStorage(notes)
} 

function query() {
    const notes = _loadNotesFromStorage()
    return Promise.resolve(notes)
}

function getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find((note)=>{
        return noteId === note.id
    })
    return Promise.resolve(note)
}

function _saveNotesToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}
