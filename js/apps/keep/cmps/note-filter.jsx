export class NoteFilter extends React.Component {
    state ={
        filterBy: {
            searchStr: ''
        },
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
            console.log(this.state.filterBy);
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }
    cleanForm = () => {
        this.setState({ filterBy: { searchStr: ''} })
    }


    render() {
        const {searchStr} = this.state.filterBy
        return (
            <form className="note-filter" onSubmit={this.onSubmitFilter}>
            <label
                htmlFor="by-searchStr">Search Note:</label>
            <input
                placeholder="Search Note"
                type="text"
                id="by-searchStr"
                name="searchStr"
                value={searchStr}
                onChange={this.handleChange} />
        </form>
        )
    }
}