import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    query,
    getNoteById,
    deleteNote,
    togglePin,
    createTxtNote,
    createTodoNote,
    updateNote,
    createImgNote,
}

const KEY = 'noteDB'


const gNotes = [
    { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n106", type: "note-txt", isPinned: false, info: { txt: "Master Juggling" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n102", type: "note-txt", isPinned: true, info: { txt: "Don't forget to turn off oven" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n103", type: "note-img", info: { url: "/assets/img/bobi.png", title: "Bobi and Me" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n104", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving license", doneAt: null }, { txt: "Coding power", doneAt: 187111111 },{ txt: "Save the world", doneAt: 187111111 }] },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n105", type: "note-img", isPinned: true, info: { url: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F61119c500f0713e04e419c4e%2FA-picture-of-bitcoin--a-digital-currency-%2F960x0.jpg%3Ffit%3Dscale", title:'Invest in crypto' },style: { backgroundColor: utilService.getRandomColor() } }
];

function createImgNote(url) {
    const imgNote = {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url,
            title: ''
        },
        style: { backgroundColor: utilService.getRandomColor() }
    }
    const notes = _loadNotesFromStorage()
    notes.push(imgNote)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}


_createNotes()


function updateNote(noteToSave) {
    const notes = _loadNotesFromStorage()
    var noteIdx = notes.findIndex(function (note) {
        return note.id === noteToSave.id;
    })
    notes[noteIdx] = noteToSave
    _saveNotesToStorage(notes);
    return Promise.resolve()
}


function _createNotes() {
    var notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = gNotes

    }
    _saveNotesToStorage(notes)
} 

function createTxtNote(txt) {
    const note = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt
        },
        style: { backgroundColor: utilService.getRandomColor() }
    }
    const notes = _loadNotesFromStorage()
    notes.push(note)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function createTodoNote(todoStr) {
    let toDoList = todoStr.split(',')
    const newList = []
    toDoList.map(todo =>{
        newList.push({
            txt: todo,
            doneAt: null
        })
    })
    const toDoNote = {
        id: utilService.makeId(),
        type: "note-todos",
        isPinned: false,
        info: {
            label: 'To Do List',
            todos: newList
        },
        style: { backgroundColor: utilService.getRandomColor() }
    }
    const notes = _loadNotesFromStorage()
    notes.push(toDoNote)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function togglePin(noteId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => {
        return note.id === noteId
    })
    note.isPinned = !note.isPinned
 
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function deleteNote(noteId) {
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function query(filterBy) {
    const {searchStr} = filterBy
    const notes = _loadNotesFromStorage()
    const notes1 = notes.filter(note =>{
        return note.isPinned
    })
    const notes2 = notes.filter(note =>{
        return !note.isPinned
    })
    const newNotes = [...notes1, ...notes2]
    if (!filterBy) return Promise.resolve (newNotes)
    const filteredNotes = _getFilteredNotes(newNotes,searchStr)
    return Promise.resolve(filteredNotes)
}

function _getFilteredNotes(notes,searchStr) {
    return notes.filter(note =>{
        if (note.info.txt) {
            return note.info.txt.toLowerCase().includes(searchStr)
        } else if (note.info.title) {
            return note.info.title.toLowerCase().includes(searchStr)
        }
    })
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
