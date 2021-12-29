import { noteService } from "../services/note.service.js"
import { NoteList } from "./note-list.jsx"

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
    
    render() {
        const {notes} = this.state
        return (
            <section className="note-index">
                <input className="add-note" />
                <div className="note-container">
                    <NoteList notes={notes} />
                </div>
            </section>
        )
    }

}