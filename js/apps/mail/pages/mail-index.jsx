export class MailIndex extends React.Component {

    componentDidMount() {

    }

    loadMails = () => {
        mailService.query().then()
  }



    render() {
        return (
            <section className="about">
                <h1>MissEmail</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit earum tenetur, accusantium adipisci, provident reprehenderit eaque similique quia nemo commodi et laboriosam ab est sunt dolor velit repellat illum placeat.</p>
            </section>
        )
    }

}