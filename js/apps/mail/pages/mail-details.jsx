import { mailService } from '../services/mail.service.js'
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
        console.log('mailId in mailDetails', mailId);
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

    render() {
        const { mail } = this.state
        if (!mail) return   <React.Fragment></React.Fragment>
        return (
            <section className="mail-details" >
                <Link className="primary-btn clean-link" to={`/mail/edit/${mail.id}`}>Edit mail</Link>

               
                <h3>{mail.name}</h3>
                <h3>{mail.subject} <span>-{mail.body}</span></h3>
                <h3>{mail.sentAt}</h3>


                    < button className="primary-btn" onClick={this.onGoBack}>Go back</button>
                <button className="primary-btn" onClick={this.mail}>Remove mail</button>
                {/* <Link className="primary-btn clean-link" to={`/mail/${mail.getNextMailId(mail.id)}`}>Next mail</Link> */}
            </section>
        )
    }
}