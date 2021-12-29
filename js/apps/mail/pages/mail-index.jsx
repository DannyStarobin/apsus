import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
export class MailIndex extends React.Component {

    state = {
        mails: [],
        selectedMail: null
    }


    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        // const { mails } = this.state
        mailService.query().then((mails) => {
            this.setState({ mails })
        })
    }


    onSelectMail = (selectedMail) => {
        selectedMail.isRead=true
        this.setState({ selectedMail })



    }

    render() {
        const { mails } = this.state
        return (
            <section className="mail-index">
                <div className="mail-filter">
                    <button className="compose">+ Compose</button>
                    <div className="filter-section">
                        <div className="inbox">Inbox</div>
                        <div className="sent">Sent</div>
                    </div>
                </div>
                <div className="mail-box">
                    <MailList mails={mails} onSelectMail={this.onSelectMail} selectedMail={this.state.selectedMail}/>
                </div>
            </section>
        )
    }

}