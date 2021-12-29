import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails }) {
    if (!mails || !mails.length) return <div>loading...</div>
    
    return (
        <React.Fragment>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </React.Fragment>
    )
}  