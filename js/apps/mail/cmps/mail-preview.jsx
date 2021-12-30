export function MailPreview({ mail, onSelectMail, selectedMail, onRemoveMail, onToggleStar }) {

    console.log('selectedMail:', selectedMail);

    const { Link } = ReactRouterDOM
    const starImg = (!mail.isStared) ? "assets/icons/star1.png" : 'assets/icons/star.png';
    const background = (mail.isRead) ? 'inherit' : '#77889962'

console.log('mail.isRead:', mail.isRead);


    const mailClosed =
        <div className="mail-preview" style={{background}} onClick={() => onSelectMail(mail.id)} >

            <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
            <h3 className="mail-name">{mail.name}</h3>
            <h3 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h3>
            <h3 className="mail-time">{mail.sentAt}</h3>
        </div>

    if (mail.id !== selectedMail) return mailClosed


    if (mail.id === selectedMail) return (

        <div>
            {mailClosed}
            <div className="mail-preview-extended">
                <Link className="clean-link" to={`/mail/${mail.id}`}><button><img src="assets/icons/expend.png" /></button></Link>
                <button onClick={() => onRemoveMail(mail.id)}><img src="assets/icons/bin.png" /></button>
                <button><img src="assets/icons/star1.png" /></button>
                <h2>{mail.subject}</h2>
                <h3>{mail.name} <span className="email-adrres">&#12296;{mail.from}&#12297;</span></h3>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )
}