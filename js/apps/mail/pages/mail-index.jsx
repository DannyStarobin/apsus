export class MailIndex extends React.Component {

    componentDidMount() {

    }

    loadMails = () => {
        mailService.query().then()
  }

    render() {
        return (
            <section className="mail-index">
            <div className="mail-filter">
                <button className="compose">+ Compose</button>
                <div className="filter-section">
                    <div className="inbox">Inbox</div>
                    <div className="sent">Sent</div>
                </div>
            </div>
            <div className="mail-box"></div>
            </section>
        )
    }

}