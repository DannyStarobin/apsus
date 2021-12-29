import { NotePreview } from "./note-preview.jsx"

export function NoteList({notes, onRemoveNote, onTogglePin}) {
    if (!notes || !notes.length) return <div>loading..</div>

    return (
        <React.Fragment>
            {notes.map(note => <NotePreview onTogglePin={onTogglePin} onRemoveNote={onRemoveNote} key={note.id} note={note} />)}
        </React.Fragment>
    )
}