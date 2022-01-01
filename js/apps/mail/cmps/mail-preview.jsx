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
        <h4 className="mail-name">{mail.name}</h4>
        <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
        <h4 className="mail-time">{sentAt}</h4>
    </React.Fragment>

    const expendedContant = <React.Fragment>
        <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
        <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
        <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
        <h2>{mail.subject}</h2>
        <h4>{mail.name} <span className="email-adrres">&#12296;{mail.to}&#12297;</span></h4>
        <p>{mail.body.substr(0, 100) + '...'}</p>
    </React.Fragment>

    //INBOX

    if (mail.id !== selectedMail && !mail.isDraft && mail.to === 'user@appsus.com') return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)}>
            <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
            {mainContant}
        </div>
    )

    if (mail.id === selectedMail && !mail.isDraft) return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)}>
            <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>

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
            <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
            <h4 className="mail-name">To:&lt;{mail.to}&gt;</h4>
            <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
            <h4 className="mail-time">{sentAt}</h4>
        </div>
    )

    if (mail.id === selectedMail && !mail.isDraft && mail.to !== 'user@appsus.com') return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>

              
                <h4>To:<span> &#12296;{mail.to}&#12297;</span></h4>
                <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
                <h4 className="mail-time">{sentAt}</h4>
            </div>
            <div className="mail-preview-extended">
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
                <h2>{mail.subject}</h2>
                <h4>To: &#12296;{mail.to}&#12297;</h4>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )

    //DRAFT

    if (mail.id !== selectedMail && mail.isDraft) return (
        <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
           
            <h4 className="mail-name">To: <span> &#12296;{mail.to}&#12297;</span></h4>
            <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
            <h4 className="mail-time">{sentAt}</h4>
        </div>
    )



    if (mail.id === selectedMail && mail.isDraft) return (
        <div>
            <div className="mail-preview" style={{ background }} onClick={() => onSelectMail(mail.id, mail.isRead)} >
            <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>

                <h4>Draft: <span> &#12296;{mail.to}&#12297;</span></h4>
                <h4 className="mail-subject">{mail.subject} <span className="mail-body-short">-{mail.body.substr(0, 50) + '...'}</span></h4>
                <h4 className="mail-time">{sentAt}</h4>
            </div>
            <div className="mail-preview-extended">
                {composeBtn}
                <button className="primary-btn" onClick={() => onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'} /></button>
                <button onClick={() => onToggleTrash(mail.id)}><img src={trashIMg} /></button>
                <button onClick={(event) => onToggleStar(event, mail.id)}><img src={starImg} /></button>
                <h2>{mail.subject}</h2>
                <h4>Draft: &#12296;{mail.to}&#12297;</h4>
                <p>{mail.body.substr(0, 100) + '...'}</p>
            </div>
        </div >

    )


}