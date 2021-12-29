import { SearchInput } from "../../../cmps/search-input.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
export class MailIndex extends React.Component {

    state = {
        mails: [],
        selectedMail: null,
        filterBy:null,
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

    render() {
        const { mails } = this.state
        return (
            <section className="mail-index">
                    <MailFilter onSetFilter={this.onSetFilter}/>
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