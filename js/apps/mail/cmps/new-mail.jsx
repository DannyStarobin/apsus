import { mailService } from "../services/mail.service.js"

export class NewMail extends React.Component {

    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
            isDraft: true,
            id: ''
        },
    };

    inputRef = React.createRef();
    gInterval

    componentDidMount() {
        this.inputRef.current.focus();
        this.loadMail()
        this.gInterval = setInterval(() => {
            this.onSaveDraft()
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.gInterval)
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        if (!mailId) return
        mailService.getMailById(mailId).then(mail => {
            if (!mail) return this.props.history.push('/email')
            this.setState({ mail })
        })
    }

    onCloseMail = () => {
        this.onSaveDraft()
        this.props.history.push('/email')
    }

    onSaveDraft = () => {
        const { mail } = this.state;
        mailService.saveMail(mail).then((newMail) => {
            if (mail.id) return
            this.setState((prevState) => ({
                mail: { ...prevState.mail, ...newMail },
            }));
        })
    }

    onSendMail = (ev) => {
        const { mail } = this.state;
        mail.isDraft = false
        mailService.saveMail(mail).then(() => {
            ev.persist()
            this.onCloseMail()
        })
    };

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            mail: { ...prevState.mail, [field]: value },
        }));
    };




    render() {
        const { subject, body, to } = this.state.mail;
        return (

            <div className="new-mail">
                <h1>New Message</h1>
                <button className="close-mail-btn" onClick={this.onCloseMail}>X</button>
                <form onSubmit={this.onSendMail} >
                    <input
                        className="email-addres-input"
                        ref={this.inputRef}
                        placeholder="To:"
                        name="to"
                        type="email"
                        value={to}
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />

                    <input
                        className="email-addres-input"
                        ref={this.inputRef}
                        placeholder="Subject:"
                        name="subject"
                        type="text"
                        value={subject}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />

                    <textarea
                        name="body"
                        value={body}
                        onChange={this.handleChange}
                        className="email-txt-input"
                    ></textarea>
                    <div className="mail-btns-container">
                        <button className="mail-send-btn">Send</button>
                    </div>
                </form>
            </div>

        )

    }
}