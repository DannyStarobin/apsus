import { SearchInput } from "../../../cmps/search-input.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { NewMail } from "../cmps/new-mail.jsx"

const { NavLink, Route } = ReactRouterDOM

export class MailIndex extends React.Component {

    state = {
        mails: [],
        selectedMail: '',
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
            this.setState({ mails })
        })
    }

    onSelectMail = (mailId, mailIsRead) => {
        if (this.state.selectedMail === mailId && mailIsRead) {
            this.setState({ selectedMail: null }, this.loadMails())
        } else if (this.state.selectedMail !== mailId && mailIsRead) {
            this.setState({ selectedMail: mailId })
            this.loadMails()
        } else {
            this.setState({ selectedMail: mailId })
            mailService.setMailIsRead(mailId).then(this.loadMails())
        }
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

    onToggleStar = (mailId) => {
        // event.stopPropagation()
        mailService.toggleStar(mailId).then(
            this.loadMails()
        )
    }

    onUnreadMail = (mailId) => {
        mailService.setMailIsRead(mailId).then(() => {
            this.setState({ selectedMail: '' })
            this.loadMails()
        })
    }

    onToggleTrash = (mailId) => {
        console.log('mailId:', mailId);
        mailService.toggleTrashMail(mailId).then(() => {
            this.setState({ selectedMail: '' })
            this.loadMails()
        })
    }

    render() {
        const { mails } = this.state
        return (
            <section className="mail-index">
                <div className="mail-filter">
                    <NavLink className="compose" activeClassName="my-active" to="/email/compose">➕ Compose</NavLink>
                    <Route component={NewMail} path="/email/compose/:mailId?" />
                    <MailFilter onSetFilter={this.onSetFilter} />
                    <div className="filter-section"></div>
                </div>
                <div className="mail-box">
                    <MailList
                        mails={mails}
                        onSelectMail={this.onSelectMail}
                        selectedMail={this.state.selectedMail}
                        onRemoveMail={this.onRemoveMail}
                        onToggleStar={this.onToggleStar}
                        onUnreadMail={this.onUnreadMail}
                        onToggleTrash={this.onToggleTrash}
                    />
                </div>
            </section>
        )
    }

}