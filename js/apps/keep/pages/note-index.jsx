import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"

const { Route, Switch } = ReactRouterDOM


export class NoteIndex extends React.Component {

    state = {
        notes: [],
        filterBy: ''
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

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onTogglePin = (noteId) => {
        noteService.togglePin(noteId).then(
            this.loadNotes()
        )
    }

    // onChangeColor = (noteId) = {

    // }
    
    render() {
        const {notes} = this.state
        return (
            <section className="note-index">
                <NoteFilter onSetFilter={this.onSetFilter}/>
                <div className="note-container">
                    <NoteList notes={notes} onTogglePin={this.onTogglePin} onRemoveNote={this.onRemoveNote} />

                </div>
                <Route component={NoteEdit} loadNotes={this.loadNotes} path="/keep/:noteId" />
            </section>
        )
    }

}