import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    query,
    getNoteById,
    deleteNote,
    togglePin,
    createTxtNote,
    createTodoNote,

}

const KEY = 'noteDB'


const gNotes = [
    { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n106", type: "note-txt", isPinned: false, info: { txt: "Master Juggling" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n102", type: "note-txt", isPinned: true, info: { txt: "Don't forget to turn off oven" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n103", type: "note-img", info: { url: "/assets/img/bobi.png", title: "Bobi and Me" },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n104", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving license", doneAt: null }, { txt: "Coding power", doneAt: 187111111 },{ txt: "Save the world", doneAt: 187111111 }] },style: { backgroundColor: utilService.getRandomColor() } },
    { id: "n105", type: "note-txt", isPinned: true, info: { txt: "Dont forget to invest in crypto!" },style: { backgroundColor: utilService.getRandomColor() } }
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
}


_createNotes()


function _createNotes() {
    var notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = gNotes

    }
    createTodoNote('eat breakfest,workout,sleep')
    _saveNotesToStorage(notes)
} 

function createTxtNote(txt) {
    const note = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt
        }
    }
    return note
}

function createTodoNote(todoStr) {
    let toDoList = todoStr.split(',')
    const newList = []
    console.log(toDoList);
    toDoList.map(todo =>{
        newList.push({
            txt: todo,
            doneAt: null
        })
    })
    console.log(newList);
    const toDoNote = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            label: 'To Do List',
            todos: newList
        }
    }
    return toDoNote
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
    console.log(noteId);
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveNotesToStorage(notes)
    console.log(notes);
    console.log('removed');
    return Promise.resolve()
}

function query(filterBy) {
    const {searchStr} = filterBy
    const notes = _loadNotesFromStorage()
    if (!filterBy) return Promise.resolve (notes)
    const filteredNotes = _getFilteredNotes(searchStr)
    return Promise.resolve(filteredNotes)
}

function _getFilteredNotes(searchStr) {
    let notes = _loadNotesFromStorage()
    return notes.filter(note =>{
        console.log(searchStr);
        console.log(note.info.txt);
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
