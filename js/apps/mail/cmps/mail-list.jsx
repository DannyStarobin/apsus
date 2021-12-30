import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onSelectMail, selectedMail, onRemoveMail, onToggleStar }) {
    if (!mails || !mails.length) return <div>loading...</div>
    
    return (
        <React.Fragment>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail}  onSelectMail={onSelectMail} selectedMail={selectedMail} onRemoveMail={onRemoveMail} onToggleStar={onToggleStar}/>)}
        </React.Fragment>
    )
}  