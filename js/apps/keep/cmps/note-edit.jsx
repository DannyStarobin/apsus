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
            this.setState({ note })
        })
    }

    // handleChange = ({ target }) => {
    //     const field = target.name
    //     const value = target.type === 'number' ? +target.value : target.value
    //     this.setState((prevState) => ({ car: { ...prevState.car, [field]: value } }))
    // }

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
        const { note } = this.state
        if (!note) return <div className="div">loading..</div>
        return (
            <section className="note-edit">
                <div className="note-container">
                <h1>Edit Note</h1>
                <pre>{this.state.note.id}</pre>
                <form >
                    {/* <label htmlFor="by-vendor">Vendor:</label>
                    <input placeholder="Enter vendor" name="vendor" type="text" id="by-vendor" value={vendor} onChange={this.handleChange} />
                    <label htmlFor="by-speed">Speed:</label>
                    <input placeholder="Enter speed" name="speed" type="number" id="by-speed" value={speed} onChange={this.handleChange} />
                <button className="primary-btn ">Save car</button> */}
                </form>
                </div>
            </section>
        )
    }

}