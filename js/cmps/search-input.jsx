export class SearchInput extends React.Component {

    state = {
        app: null

    }

    componentDidMount() {
        this.setState({ app: this.props.app })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy);
        this.cleanForm();
    };



    handleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? +target.value : target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }




    render() {
        if (!this.state.app) return <React.Fragment></React.Fragment>
        return (
            <form className="book-filter" onSubmit={this.onSubmitFilter}>
                <label htmlFor="by-title">By Title:</label>
                <input
                    type="text"
                    id="by-title"
                    name="title"
                    // value={title}
                    onChange={this.handleChange}
                />
            </form>
        )
    }



}