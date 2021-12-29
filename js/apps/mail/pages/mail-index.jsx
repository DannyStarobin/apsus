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
                <button>Compose</button>
            </div>
            <div className="mail-box"></div>
            </section>
        )
    }

}