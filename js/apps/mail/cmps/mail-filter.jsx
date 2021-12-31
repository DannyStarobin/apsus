

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
            type: '',
        },
    };

    onSubmitFilter = (ev) => {
        console.log('hi:', hi);

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
        this.setState({ filterBy: { txt: '', type } })
    }

    render() {
        const {
            filterBy: { txt, type } } = this.state;

        return (
            <div>

                <form className="mail-filter-input" onSubmit={this.onSubmitFilter}>
                    <input
                        type="text"
                        id="by-txt"
                        name="txt"
                        value={txt}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <button>&#128270;</button>
                </form>
                <div className="filter-btns">
                    <button className="mail-filter-btn" name="type" value="inbox" onClick={this.handleChange}><img className="img-btn" src={'assets/icons/inbox.png'} />Inbox</button>
                    <button className="mail-filter-btn" name="type" value="sent" onClick={this.handleChange}><img className="img-btn" src={'assets/icons/sent.png'}/>Sent</button>
                    <button className="mail-filter-btn" name="type" value="isStared" onClick={this.handleChange}><img className="img-btn" src={'assets/icons/star1.png'}/>Stared</button>
                    <button className="mail-filter-btn" name="type" value="isStared" onClick={this.handleChange}><img className="img-btn" src={'assets/icons/draft.png'}/>Drafts</button>
                </div>
            </div >
        );
    }
}