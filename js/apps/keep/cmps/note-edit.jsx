import { noteService } from '../services/note.service.js';

export class NoteEdit extends React.Component {
  state = {
    note: null,
    info: null,
    style: null
  };

  componentDidMount() {
    this.loadNote();
  }

  loadNote = () => {
    const { noteId } = this.props.match.params; 
    if (!noteId) return;
    noteService.getNoteById(noteId).then((note) => {
      if (!note) return this.props.history.push('/');
      this.setState({ note });
    });
  };

  handleTxtChange = ({ target }) => {
    const field = target.name;
    console.log(field);
    const value = target.type === 'number' ? +target.value : target.value;
    console.log(value);
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        info: {
          [field]: value,
        },
      },
    }));
  };

  onGoBack = () => {
    this.props.history.push('/keep');
  };

  onSaveNote = (ev) => {
    ev.preventDefault();
    const { note } = this.state;
    console.log(note);
    noteService.updateNote(note).then(() => {
      this.onGoBack();
    });
  };


  render() {
    const { note } = this.state;
    if (!note) return <div className='div'>loading..</div>;
    const { txt } = note.info; 
    return (
      <section className='note-edit'>
        <div className='note-edit-container'>
          <h1>Edit Note</h1>
          <form onSubmit={this.onSaveNote}>
            <label htmlFor='by-txt'>Text:</label>
            <input
              placeholder='Enter Text'
              name='txt'
              type='text'
              id='by-txt'
              value={txt || ''}
              onChange={this.handleTxtChange}
            />
            <button className='primary-btn '>Save Note</button>
          </form>
        </div>
      </section>
    );
  }
}
