import { mailService } from "../services/mail.service.js";

export function MailPreview({ mail, onSelectMail, selectedMail, onRemoveMail, onToggleStar, onUnreadMail, onToggleTrash }) {

    const { Link } = ReactRouterDOM
    const starImg = (!mail.isStared) ? "assets/icons/star1.png" : 'assets/icons/star.png';
    const trashIMg = (mail.isTrash) ? "assets/icons/file.png" : "assets/icons/bin.png"
    const background = (mail.isRead) ? 'inherit' : '#77889962'
    const sentAt = mailService.getTimeForDisplay(mail.sentAt)
    const composeBtn = (mail.isTrash) ? null : <Link className="primary-btn clean-link" to={`/email/compose/${mail.id}`}>
        <button><img src="assets/icons/contract.png" /></button>
    </Link>

    const toggleStar = <React.Fragment>
        <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
    </React.Fragment>

    const trashBtn = (mail.isTrash) ? <button onClick={() => onRemoveMail(mail.id)}><img src="assets/icons/bin.png" /></button> : null

    let type
    if (mail.to === 'user@appsus.com' && !mail.isDraft) type = 'Inbox'
    else if (mail.to !== 'user@appsus.com' && !mail.isDraft) type = 'Sent'
    else if (mail.isDraft) type = 'Draft'


    //INBOX

    if (mail.id !== selectedMail && !mail.isDraft && mail.to === 'user@appsus.com') return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)}>
            {toggleStar}
            <h4 className="mail-name">{mail.name}</h4>
            <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
            <h4 className="mail-time">{sentAt}</h4>
        </div>
    )

    if (mail.id === selectedMail && !mail.isDraft && mail.to === 'user@appsus.com') return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)}>
                {toggleStar}
                <h4 className="mail-name">{mail.name}</h4>
                <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
                <h4 className="mail-time">{sentAt}</h4>
            </div>
            <div className="mail-preview-extended">
                {trashBtn}
                <Link className="clean-link" to={`/mail/${mail.id}`}>
                    <button><img src="assets/icons/expend.png" /></button>
                </Link>
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                {toggleStar}
                <h3>{mail.subject}</h3>
                <h4>{mail.name} <span className="email-adrres">&#12296;{mail.from}&#12297;</span></h4>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >
    )

    //SENT

    if (mail.id !== selectedMail && !mail.isDraft && mail.to !== 'user@appsus.com') return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            {toggleStar}
            <h4 className="mail-name">To: &#12296;{mail.to}&#12297;</h4>
            <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
            <h4 className="mail-time">{sentAt}</h4>
        </div>
    )


    if (mail.id === selectedMail && !mail.isDraft && mail.to !== 'user@appsus.com') return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
                {toggleStar}
                <h4>To:<span> &#12296;{mail.to}&#12297;</span></h4>
                <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
                <h4 className="mail-time">{sentAt}</h4>
            </div>
            <div className="mail-preview-extended">
                {trashBtn}
                <Link className="clean-link" to={`/mail/${mail.id}`}>
                    <button><img src="assets/icons/expend.png" /></button>
                </Link>
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                {toggleStar}
                <h3>{mail.subject}</h3>
                <h4>To: &#12296;{mail.to}&#12297;</h4>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )

    //DRAFT

    if (mail.id !== selectedMail && mail.isDraft) return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            {toggleStar}
            <h4 className="mail-name">Draft: <span> &#12296;{mail.to}&#12297;</span></h4>
            <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
            <h4 className="mail-time">{sentAt}</h4>
        </div>
    )



    if (mail.id === selectedMail && mail.isDraft) return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
                {toggleStar}
                <h4>Draft: <span> &#12296;{mail.to}&#12297;</span></h4>
                <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
                <h4 className="mail-time">{sentAt}</h4>
            </div>
            <div className="mail-preview-extended">
                {trashBtn}
                {composeBtn}
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                {toggleStar}
                <h3>{mail.subject}</h3>
                <h4>Draft: <span>&#12296;{mail.to}&#12297;</span></h4>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )


}