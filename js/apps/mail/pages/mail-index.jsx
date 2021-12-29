import { SearchInput } from "../../../cmps/search-input.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
export class MailIndex extends React.Component {

    state = {
        mails: [],
        selectedMail: null,
        filterBy: 'inbox',
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy } = this.state;
        mailService.query(filterBy).then((mails) => {
            this.setState({ mails })
        })
    }

    onSelectMail = (selectedMail) => {
        selectedMail.isRead=true
        this.setState({ selectedMail })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId).then(() => {
            const newMails = this.state.mails.filter(mail => mail.id !== mailId)
            this.setState({ mails: newMails }, this.loadMails)
        })
    }

    render() {
        const { mails } = this.state
        return (
            <section className="mail-index">
                    <MailFilter onSetFilter={this.onSetFilter}/>
                <div className="mail-filter">
                    <button className="compose">+ Compose</button>
                    <div className="filter-section">
                       <button className="inbox" onClick={()=>this.onSetFilter('inbox')}>Inbox</button>
                        <div className="sent" onClick={()=>this.onSetFilter('sent')}>Sent</div>
                    </div>
                </div>
                <div className="mail-box">
                    <MailList mails={mails} onSelectMail={this.onSelectMail} selectedMail={this.state.selectedMail} onRemoveMail={this.onRemoveMail}/>
                    
                </div>
            </section>
        )
    }

}