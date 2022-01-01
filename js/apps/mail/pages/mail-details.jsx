import { mailService } from '../services/mail.service.js'
import { MailIndex } from './mail-index.jsx';
import { MailFilter } from '../cmps/mail-filter.jsx';
// import { eventBusService } from "../services/event-bus.service.js";

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        console.log('props in mailDetails', this.props);
        this.loadMail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getMailById(mailId).then(mail => {
            if (!mail) return this.props.history.push('/')
            this.setState({ mail })
        })
    }

    onGoBack = () => {
        this.props.history.push('/email')
    }

    onRemoveMail = () => {
        const { id } = this.state.mail
        mailService.removeMail(id).then(() => {

            this.onGoBack()
        })
    }

    onToggleStar = (mailId) => {
        mailService.toggleStar(mailId).then(
            this.loadMail()
        )
    }

    onUnreadMail = (mailId) => {
        mailService.setMailIsRead(mailId).then(() => {
            this.setState({ selectedMail: '' })
            this.onGoBack()
        })
    }

    onToggleTrash = (mailId) => {
        this.props
        mailService.toggleTrashMail(mailId).then(() => {
            this.setState({ selectedMail: '' })
            this.onGoBack()
        })
    }

    render() {
        const { mail } = this.state
        if (!mail) return <React.Fragment></React.Fragment>

        const sentAt = mailService.getTimeForDisplay(mail.sentAt)
        const starImg = (!mail.isStared) ? "assets/icons/star1.png" : 'assets/icons/star.png';

        return (
            <section className="mail-details" >

                <div className="mail-options-bar">
                    <button className="primary-btn" onClick={this.onGoBack}><img src={'assets/icons/left-arrow.png'} /></button>
                    <button className="primary-btn" onClick={() => this.onToggleTrash(mail.id)}><img src={'assets/icons/bin.png'} /></button>
                    <button className="primary-btn" onClick={() => this.onUnreadMail(mail.id)}><img src={'assets/icons/unread-message.png'}  /></button>
                </div>

                <h2 className="mail-subject">{mail.subject} </h2>
                <div className="name-btns-container">
                    <h3 className="mail-name">{mail.name} <span className="email-adrres">&#12296;{mail.from}&#12297;</span></h3>
                    <div className="btns-time-container">
                        <button onClick={() => this.onToggleStar(mail.id)}><img src={starImg} /></button>
                        <h4 className="mail-date">{sentAt}</h4>
                
                    </div>
                </div>
                <p className className="mail-body">-{mail.body}</p>

                {/* <Link className="primary-btn clean-link" to={`/mail/${mail.getNextMailId(mail.id)}`}>Next mail</Link> */}
            </section>
        )
    }
}