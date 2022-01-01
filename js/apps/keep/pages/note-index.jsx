import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"

const { Route, Switch } = ReactRouterDOM


export class NoteIndex extends React.Component {

    state = {
        notes: [],
        filterBy: '',
        newNote: {
            newNoteType: null,
            content: '',
            placeholder: 'Add New Note'
        }
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        const {filterBy} = this.state
        noteService.query(filterBy).then((notes) =>{
            this.setState({notes})
        })
    }
    onRemoveNote = (noteId) => {
        noteService.deleteNote(noteId).then(
            this.loadNotes()
        )
    }
    onUpdateNote = () => {
            this.loadNotes()
    }
    
    onAddNote = (ev) =>{
        ev.preventDefault()
        const {newNoteType,content} = this.state.newNote
        if (!newNoteType || !content) return
        else if (newNoteType === "Text") {
            noteService.createTxtNote(content).then(
                this.loadNotes(),
                this.CleanForm()
            )
        }
        else if (newNoteType === "Img") {
            noteService.createImgNote(content).then(
                this.loadNotes(),
                this.CleanForm()
            )
        }
        else if (newNoteType === "Todos") {
            noteService.createTodoNote(content).then(
                this.loadNotes(),
                this.CleanForm()
            )
        }
    }

    CleanForm = () => {
        this.setState({
            newNote: {
                newNoteType: null,
                content: '',
                placeholder: 'Add New Note'
            }
        })
    }

    onChangeNewNoteType = (noteType) =>{
        this.setState({
            newNote:{
                newNoteType: noteType,
                content: '',
                placeholder: `Add ${noteType} Note`
            }
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onTogglePin = (noteId) => {
        noteService.togglePin(noteId).then(
            this.loadNotes()
        )
    }
    handleNewNote = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ newNote: { ...prevState.newNote, [field]: value } }), () => {
        })
    }


    render() {
        const {notes} = this.state
        const {content, placeholder} = this.state.newNote
        return (
            <section className="note-index">
                <NoteFilter onSetFilter={this.onSetFilter}/>
                <form className="add-note" onSubmit={this.onAddNote}>
                    <button onClick={this.onAddNote} >Add</button>
                    <input  
                    placeholder={placeholder}
                    onChange={this.handleNewNote}
                    value={content}
                    name="content"
                    id="add-note" />
                    <button onClick={()=> this.onChangeNewNoteType('Text')}>Txt</button>
                    <button onClick={()=> this.onChangeNewNoteType('Img')} >Img</button>
                    <button onClick={()=> this.onChangeNewNoteType('Todos')}>ToDo</button>
                </form>
                <div className="note-container">
                    <NoteList notes={notes} onTogglePin={this.onTogglePin} onRemoveNote={this.onRemoveNote} />

                </div>
                <Route component={NoteEdit}  path="/keep/:noteId" />
            </section>
        )
    }

}