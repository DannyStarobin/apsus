import { noteService } from "../services/note.service.js"

export class NoteEdit extends React.Component {
    state = {
        note: null
    }

    // inputRef = React.createRef()

    componentDidMount() {
        // this.inputRef.current.focus()
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
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ note: { ...prevState.note, [field]: value } }))
    }

    onGoBack = () => {
        this.props.history.push('/keep')
    }

    // onSaveCar = (ev) => {
    //     ev.preventDefault()
    //     const { car } = this.state
    //     carService.saveCar(car).then(() => {
    //         eventBusService.emit('user-msg', { txt: 'Saved !', type: 'success' })
    //         this.onGoBack()
    //     })
    // }

    render() {
        console.log(this.state);
        const { note } = this.state
        if (!note) return <div className="div">loading..</div>
        const {}
        return (
            <section className="note-edit">
                <div className="note-container">
                <h1>Edit Note</h1>
                {/* <h4>Editing {this.state.note.id}</h4> */}
                <form >
                    <label htmlFor="by-txt">Text:</label>
                    <input placeholder="Enter Text" name="txt" type="text" id="by-txt" value={txt} onChange={this.handleChange} />
                <button className="primary-btn ">Save Note</button>
                </form>
                </div>
            </section>
        )
    }

}