import { SearchInput } from "../../../cmps/search-input.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

const { NavLink, Route } = ReactRouterDOM

export class MailIndex extends React.Component {

    state = {
        mails: [],
        selectedMail: null,
        filterBy: '',
        newMail: {
            to: '',
            txt: '',
        },
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy } = this.state;
        mailService.query(filterBy).then((mails) => {
            // console.log('mails:', mails);

            this.setState({ mails })
        })
    }

    onSelectMail = (selectedMail) => {
        selectedMail.isRead = true
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

    mail = () => {
        return (

            <div className="new-mail">
                <h1>New Message</h1>
                <form onSubmit={this.onSaveMail} className="review-form">
                    <input
                        ref={this.inputRef}
                        placeholder="To:"
                        name="fullName"
                        type="text"
                        id="by-fullname"
                        // value={fullName}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />


                    <textarea
                        name="txt"
                        cols="30"
                        rows="10"
                        // value={txt}
                        onChange={this.handleChange}
                    ></textarea>
                    <button>Send</button>
                </form>
            </div>

        )
    }

    render() {
        const { mails } = this.state
        return (
            <section className="mail-index">
                <MailFilter onSetFilter={this.onSetFilter} />
                <div className="mail-filter">
                    <NavLink className="compose" activeClassName="my-active" to="/email/team">+ Compose</NavLink>
                    <Route component={this.Team} path="/email/team" />
                    <div className="filter-section"></div>
                </div>
                <div className="mail-box">
                    <MailList mails={mails} onSelectMail={this.onSelectMail} selectedMail={this.state.selectedMail} onRemoveMail={this.onRemoveMail} />
                </div>
            </section>
        )
    }

}