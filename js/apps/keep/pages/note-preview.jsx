import { MakeToDoList } from "../cmps/note-to-do.jsx"

export function NotePreview({ note }) {
    if (note.type === 'note-txt') {
        return (
            <section className="note-preview">
                <h4>{note.info.txt}</h4>
            </section>
    )
    } else if (note.type === 'note-todos') {
        return (
            <section className="note-preview">
                <h4>{note.info.label}</h4>
                <MakeToDoList todos={note.info.todos} />
            </section>
        )
    } else if (note.type === 'note-img') {
        return (
            <section className="note-preview">
                <h4>{note.info.title}</h4>
                <img src={note.info.url} />
            </section>
        )
    } 
}