export function MailPreview({ mail, onSelectMail, selectedMail, onRemoveMail }) {


    const { Link } = ReactRouterDOM

    function getBcgColor() {
        return (mail.isRead) ? 'inherit' : '#77889962'
    }
    const mailClosed =
        <div className="mail-preview" style={{ backgroundColor: getBcgColor() }} onClick={() => onSelectMail(mail)} >
         
            <h3 className="mail-name"> <button><img src="assets/icons/star1.png" /></button> {mail.name}</h3>
            <h3>{mail.subject} <span className="mail-body-short">-{mail.body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, rem? Repellendus debitis enim illum atque</span></h3>
            <h3>{mail.sentAt}</h3>
        </div>

    if (mail !== selectedMail) return mailClosed


    if (mail === selectedMail) return (
        <div>
            {mailClosed}
            <div className="mail-preview-extended">
                <Link className="clean-link" to={`/mail/${mail.id}`}><button><img src="assets/icons/expend.png" /></button></Link>
                <button onClick={() => onRemoveMail(mail.id)}><img src="assets/icons/bin.png" /></button>
                <button><img src="assets/icons/star1.png" /></button>
                <h2>{mail.subject}</h2>
                <h3>{mail.name} <span className="email-adrres">&#12296;{mail.from}&#12297;</span></h3>
                <p>{mail.body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni deserunt a deleniti doloribus in! Ut laborum, facere, ex cumque ratione saepe reiciendis in ea adipisci, consequatur aliquid expedita accusamus natus nihil quas sunt! Praesentium dignissimos, modi distinctio doloribus doloremque ullam in sapiente eaque quis at velit nemo iusto numquam tempora dicta qui libero consequuntur soluta fuga nesciunt, nostrum laudantium optio labore aut. Corporis, autem! Mollitia eaque aut excepturi eius harum nam earum consequatur itaque incidunt. Dolorum tenetur in esse perspiciatis voluptatibus minima tempore mollitia expedita. Deleniti quasi ipsum beatae accusantium unde est sapiente delectus illo fugit quibusdam, repudiandae praesentium hic sint iusto nesciunt voluptates at dolorem non ullam tempore? Suscipit fugit dolor ea minima. Modi rerum rem est eius laudantium quaerat distinctio culpa tempora accusantium, unde molestias blanditiis, enim, magnam voluptates. Commodi, consequatur ipsa ipsam sunt fuga officia laudantium sit perferendis cumque possimus amet cum, maxime veniam harum placeat? Iure optio obcaecati iste odit dolor voluptate, eveniet earum quibusdam distinctio reprehenderit ducimus nesciunt minima officiis assumenda tempore facilis exercitationem, repudiandae quisquam? Odit officiis eius nostrum aperiam ullam molestias cumque dolores amet voluptates dolorem. Ipsam in, rerum laborum corporis illum sed consequuntur modi necessitatibus odit facilis sapiente? Consequatur quibusdam minus numquam... </p>
            </div>
        </div >
    )
}