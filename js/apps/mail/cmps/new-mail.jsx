import { mailService } from "../services/mail.service.js"

export class NewMail extends React.Component {

    state = {
        mail: {
            subject: '',
            body: '',
        },
    };

    inputRef = React.createRef();

    componentDidMount() {
        this.inputRef.current.focus();
    }

    onCloseMail = () => {
        this.props.history.push('/email')
    }


    
    onSendMail = (ev) => {
        ev.preventDefault();
        const { mail } = this.state;
        mailService.saveMail(mail).then(() => {
            this.props.history.push('/email')
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
        const { subject, body } = this.state.mail;
        return (

            <div className="new-mail">
                <h1>New Message</h1>
                <button className="close-mail-btn" onClick={this.onCloseMail}>X</button>
                <form onSubmit={this.onSendMail} >
                    <input
                        className="email-addres-input"
                        ref={this.inputRef}
                        placeholder="To:"
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