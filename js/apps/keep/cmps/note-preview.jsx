import { ToDoList } from '../cmps/note-to-do.jsx';
import { noteService } from '../services/note.service.js';

const { Link } = ReactRouterDOM;

export function NotePreview({ note, onRemoveNote, onTogglePin }) {
  const { id, isPinned, style } = note;
  const pinImg = !isPinned ? 'assets/icons/pin.png' : 'assets/icons/pined.png';
  if (note.type === 'note-txt') {
    return (
        <section style={style} className='note-preview'>
          <h4>{note.info.txt}</h4>
          <div className='btn-container'>
            <button onClick={() => onTogglePin(id)}>
              <img src={pinImg} />
            </button>
            <button>
              <img src='assets/icons/palette.png' />
            </button>
            <button>
              <img src='assets/icons/mail.png' />
            </button>
            <Link to={`/keep/${id}`}>
            <button>
              <img src='assets/icons/edit.png' />
            </button>
            </Link>
            <button onClick={() => onRemoveNote(id)}>
              <img src='assets/icons/bin.png' />
            </button>
          </div>
        </section>
    );
  } else if (note.type === 'note-todos') {
    return (
          <section style={style} className='note-preview'>
            <h4>{note.info.label}</h4>
            <ToDoList todos={note.info.todos} />
          </section>
    );
  } else if (note.type === 'note-img') {
    return (
          <section style={style} className='note-preview'>
            <h4>{note.info.title}</h4>
            <img src={note.info.url} />
          </section>
    );
  }
}
