import { storageService } from "../../../services/storage.service.js";

export const noteService = {
    query,
    getNoteById,
    deleteNote,
    togglePin,

}

const KEY = 'noteDB'


const gNotes = [
    { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
    { id: "n106", type: "note-txt", isPinned: false, info: { txt: "Master Juggling" } },
    { id: "n102", type: "note-txt", isPinned: true, info: { txt: "Don't forget to turn off oven" } },
    { id: "n103", type: "note-img", info: { url: "/assets/img/bobi.png", title: "Bobi and Me" },style: { backgroundColor: "#00d" } },
    { id: "n104", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving license", doneAt: null }, { txt: "Coding power", doneAt: 187111111 },{ txt: "Save the world", doneAt: 187111111 }] } },
    { id: "n105", type: "note-txt", isPinned: true, info: { txt: "Dont forget to invest in crypto!" } }
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


function togglePin(noteId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => {
        return note.id === noteId
    })
    if (note.isPinned === true) {
        note.isPinned = false
    } else {
        note.isPinned = true
    }
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function deleteNote(noteId) {
    console.log(noteId);
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveNotesToStorage(notes)
    console.log(notes);
    console.log('removed');
    return Promise.resolve()
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
