import { noteService } from "../services/note.service.js"
import { NoteIndex } from "../pages/note-index.jsx"

export class NoteEdit extends React.Component {
    state = {
        note: {
            info: {
                txt:''
            }
        }
    }


    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { noteId } = this.props.match.params
        if (!noteId) return
        noteService.getNoteById(noteId).then(note => {
            if (!note) return this.props.history.push('/')
            this.setState({ note} )
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        console.log(field);
        const value = target.type === 'number' ? +target.value : target.value
        console.log(value);
        this.setState((prevState) => ({ note: {
            ...prevState.note,
            info:{
                [field]: value  
            }
            } }))
    }

    onGoBack = () => {
        this.props.history.push('/keep')
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        const { note } = this.state
        console.log(note);
        noteService.updateNote(note).then(()=>{
            this.onGoBack()
            this.props.loadNotes()
        })
        // carService.saveCar(car).then(() => {
        //     eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
        //     this.onGoBack()
        // })
    }

    render() {
        const { note } = this.state
        if (!note) return <div className="div">loading..</div>
        const {txt} = note.info
        console.log(this.state.note)
        return (
            <section className="note-edit">
                <div className="note-container">
                <h1>Edit Note</h1>
                {/* <h4>Editing {this.state.note.id}</h4> */}
                <form onSubmit={this.onSaveNote}>
                    <label htmlFor="by-txt">Text:</label>
                    <input placeholder="Enter Text" name="txt" type="text" id="by-txt" value={txt || ''} onChange={this.handleChange} />
                <button className="primary-btn ">Save Note</button>
                </form>
                </div>
            </section>
        )
    }

}