export function MailPreview({ mail }) {
console.log('mail.name:', mail.name);

    return (

        <div className="mail-preview">
            <h3>{mail.name}</h3>
            <h3>{mail.subject} <span>{mail.body}</span></h3>
            <h3>{mail.sentAt}</h3>
        </div>

    )
}