export function MailPreview({ mail, onSelectMail, selectedMail, onRemoveMail }) {

    function getBcgColor() {
        return (mail.isRead) ? 'inherit' : '#77889962'
    }

    if (mail !== selectedMail) return (
        <div className="mail-preview" style={{ backgroundColor: getBcgColor() }} onClick={() => onSelectMail(mail)} >
            <h3>{mail.name}</h3>
            <h3>{mail.subject} <span>-{mail.body}</span></h3>
            <h3>{mail.sentAt}</h3>
        </div>
    )

    if (mail === selectedMail) return (
        <div>
            <div className="mail-preview" style={{ backgroundColor: getBcgColor() }} >
                <h3>{mail.name}</h3>
                <h3>{mail.subject} <span>-{mail.body}</span></h3>
                <h3>{mail.sentAt}</h3>
            </div>
            <div className="mail-preview-extended">
                <button>&#10066;</button><button onClick={() => onRemoveMail(mail.id)}>&#128465;</button>
                <h2>{mail.subject}</h2>
                <h3>{mail.name} {mail.from}</h3>
                <p>{mail.body}</p>

                <hr />
            </div>
        </div >
    )
}