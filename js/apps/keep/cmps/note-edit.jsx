import { noteService } from '../services/note.service.js';
// import { TodosInput } from './todos-input.jsx';

export class NoteEdit extends React.Component {
  state = {
    note: null,
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
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        info: {
          [field]: value,
        },
      },
    }));
  };

  handleImgChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        info: {
          ...prevState.note.info,
          [field]: value,
        },
      },
    }));
  };

  handleTodosChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        info: {
          ...prevState.note.info,
          [field]: value,
        },
      },
    }));
  };
  handleColorChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        style: {
          ...prevState.note.style,
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
    noteService.updateNote(note).then(() => {
      this.onGoBack();
    });
  };

  render() {
    const { note } = this.state;
    if (!note) return <div className='div'>loading..</div>;
    if (note.type === 'note-txt') {
      const { txt } = note.info;
      const { backgroundColor } = note.style;
      return (
        <section className='note-edit'>
          <div className='note-edit-container'>
            <h1>Edit Note</h1>
            <form className='note-edit-form' onSubmit={this.onSaveNote}>
              <div className="input-container">
                <label htmlFor='by-txt'>Text:</label>
                <input
                  placeholder='Enter Text'
                  name='txt'
                  type='text'
                  id='by-txt'
                  value={txt || ''}
                  onChange={this.handleTxtChange}
                  />
                </div>

                <div className="input-container">
                <label htmlFor='by-color'>Color:</label>
                <input
                  placeholder='Enter Text'
                  name='backgroundColor'
                  type='color'
                  id='by-color'
                  value={backgroundColor || ''}
                  onChange={this.handleColorChange}
                  />
                </div>
              <button className='primary-btn '>Save Note</button>
            </form>
          </div>
        </section>
      );
    } else if (note.type === 'note-img') {
      const { url, title } = note.info;
      const { backgroundColor } = note.style;
      return (
        <section className='note-edit'>
          <div className='note-edit-container'>
            <h1>Edit Note</h1>
            <form className='note-edit-form' onSubmit={this.onSaveNote}>
              <div className='input-container'>
                <label htmlFor='by-txt'>Text:</label>
                <input
                  placeholder='Enter Title'
                  name='title'
                  type='text'
                  id='by-title'
                  value={title || ''}
                  onChange={this.handleImgChange}
                />
              </div>

              <div className='input-container'>
                <label htmlFor='by-url'>Url:</label>
                <input
                  placeholder='Enter Url'
                  name='url'
                  type='text'
                  id='by-url'
                  value={url || ''}
                  onChange={this.handleImgChange}
                />
              </div>

              <div className='input-container'>
                <label htmlFor='by-color'>Color:</label>
                <input
                  placeholder='Enter Text'
                  name='backgroundColor'
                  type='color'
                  id='by-color'
                  value={backgroundColor || ''}
                  onChange={this.handleColorChange}
                />
              </div>
              <button className='primary-btn '>Save Note</button>
            </form>
          </div>
        </section>
      );
    } else if (note.type === 'note-todos') {
      const { todos, label } = note.info;
      const { backgroundColor } = note.style;
      return (
        <section className='note-edit'>
          <div className='note-edit-container'>
            <h1>Edit Note</h1>
            <form className='note-edit-form' onSubmit={this.onSaveNote}>
              <div className='input-container'>
                <label htmlFor='by-label'>Label:</label>
                <input
                  placeholder='Enter Title'
                  name='label'
                  type='text'
                  id='by-label'
                  value={label || ''}
                  onChange={this.handleTodosChange}
                />
              </div>

              {/* <TodosInput todos={todos}/> */}

              <div className='input-container'>
                <label htmlFor='by-color'>Color:</label>
                <input
                  placeholder='Enter Text'
                  name='backgroundColor'
                  type='color'
                  id='by-color'
                  value={backgroundColor || ''}
                  onChange={this.handleColorChange}
                />
              </div>
              <button className='primary-btn '>Save Note</button>
            </form>
          </div>
        </section>
      );
    }
  }
}
