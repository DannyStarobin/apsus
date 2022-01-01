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


    let type
    if (mail.to === 'user@appsus.com' && !mail.isDraft) type = 'Inbox'
    else if (mail.to !== 'user@appsus.com' && !mail.isDraft) type = 'Sent'
    else if (mail.isDraft) type = 'Draft'


    const mainContant = <React.Fragment>
        <h3 className="mail-name">{mail.name}</h3>
        <h3 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h3>
        <h3 className="mail-time">{sentAt}</h3>
    </React.Fragment>

    const expendedContant = <React.Fragment>
        <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
        <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
        <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
        <h2>{mail.subject}</h2>
        <h3>{mail.name} <span className="email-adrres">&#12296;{mail.to}&#12297;</span></h3>
        <p>{mail.body.substr(0, 100) + '...'}</p>
    </React.Fragment>

    //INBOX

    if (mail.id !== selectedMail && !mail.isDraft && mail.to === 'user@appsus.com') return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)}>
            <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
            {mainContant}
        </div>
    )

    if (mail.id === selectedMail && !mail.isDraft) return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)}>
                {mainContant}
            </div>
            <div className="mail-preview-extended">
                <Link className="clean-link" to={`/mail/${mail.id}`}>
                    <button><img src="assets/icons/expend.png" /></button>
                </Link>
                {expendedContant}
            </div>
        </div >
    )

    //SENT

    if (mail.id !== selectedMail && !mail.isDraft && mail.to !== 'user@appsus.com') return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
            <h3>To: &#12296;{mail.to}&#12297;</h3>
            <h3 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h3>
            <h3 className="mail-time">{sentAt}</h3>
        </div>
    )

    if (mail.id === selectedMail && !mail.isDraft && mail.to !== 'user@appsus.com') return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >

                <p>Draft</p>
                <h3>To: &#12296;{mail.to}&#12297;</h3>
                <h3 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h3>
                <h3 className="mail-time">{sentAt}</h3>
            </div>
            <div className="mail-preview-extended">
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
                <h2>{mail.subject}</h2>
                <h3>To: &#12296;{mail.to}&#12297;</h3>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )

    //DRAFT

    if (mail.id !== selectedMail && mail.isDraft) return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
            <p>Draft</p>
            <h3>To: &#12296;{mail.to}&#12297;</h3>
            <h3 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h3>
            <h3 className="mail-time">{sentAt}</h3>
        </div>
    )



    if (mail.id === selectedMail && mail.isDraft) return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >

                <p>Draft</p>
                <h3>To: &#12296;{mail.to}&#12297;</h3>
                <h3 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h3>
                <h3 className="mail-time">{sentAt}</h3>
            </div>
            <div className="mail-preview-extended">
                {composeBtn}
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                <button onClick={() => onToggleStar(mail.id)}><img src={starImg} /></button>
                <h2>{mail.subject}</h2>
                <h3>To: &#12296;{mail.to}&#12297;</h3>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )


}