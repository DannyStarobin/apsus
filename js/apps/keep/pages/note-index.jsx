import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export class NoteIndex extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query().then((notes) =>{
            this.setState({notes})
        })
    }

    onRemoveNote = (noteId) => {
        noteService.deleteNote(noteId).then(
            this.loadNotes()
        )
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
                <div className="note-container">
                    <NoteList notes={notes} onTogglePin={this.onTogglePin} onRemoveNote={this.onRemoveNote} />
                </div>
            </section>
        )
    }

}