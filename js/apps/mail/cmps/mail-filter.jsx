

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
            type: ''
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
                    />
                    <button>&#128270;</button>
                </form>
                <input className="mail-filter-btn"
                    type="button"
                    name="type"
                    value="inbox"
                    onClick={this.handleChange}/>

                <input className="mail-filter-btn"
                    type="button"
                    name="type"
                    value="sent"
                    onClick={this.handleChange} />
            </div >
        );
    }
}