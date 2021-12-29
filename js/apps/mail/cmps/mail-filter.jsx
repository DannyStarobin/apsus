

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            subject: '',
            Inbox: '',
            stared: '',
            sentMail: '',
            drafts: ''

        },
    };

    onSubmitFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy);
        this.cleanForm();
    };

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    cleanForm = () => {
        this.setState({ filterBy: { subject: '', Inbox: '', stared: '', sentMail: '', drafts: '' } })
    }

    render() {
        const {
            filterBy: { subject, Inbox, stared, sentMail, drafts } } = this.state;

        return (
            <form className="mail-filter-input" onSubmit={this.onSubmitFilter}>
                
                <input
                    type="text"
                    id="by-subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <button>&#128270;</button>
            </form>
        );
    }
}