import { NotePreview } from "./note-preview.jsx"

export function NoteList({notes}) {
    if (!notes || !notes.length) return <div>loading..</div>

    return (
        <React.Fragment>
            {notes.map(note => <NotePreview key={note.id} note={note} />)}
        </React.Fragment>
    )
}