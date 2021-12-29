export function MailPreview({ mail }) {

    return (

        <div>
            <h2>Subject:{mail.subject}</h2>
            <h3>{mail.sentAt}</h3>
            <h3>From:{mail.to}</h3>
            <h3>{mail.body}</h3>
            <h3>{mail.isRead}</h3>
        </div>

    )
}