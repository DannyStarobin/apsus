export class CarFilter extends React.Component {
    state = {
        filterBy: {
            vendor: '',
            minSpeed: '',
            maxSpeed: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        this.setState({ filterBy: { vendor: '', minSpeed: '', maxSpeed: '' } })
    }

    render() {
        const { filterBy: { vendor, minSpeed, maxSpeed } } = this.state
        return (
            <form className="car-filter" onSubmit={this.onSubmitFilter}>
                <label
                    htmlFor="by-vendor">By Vendor:</label>
                <input
                    placeholder="Enter vendor"
                    type="text"
                    id="by-vendor"
                    name="vendor"
                    value={vendor}
                    onChange={this.handleChange} />
                <label htmlFor="by-min-speed">Min speed:</label>
                <input
                    placeholder="Enter minimum speed"
                    type="number"
                    min="0"
                    id="by-min-speed"
                    name="minSpeed"
                    value={minSpeed}
                    onChange={this.handleChange} />
                <label
                    htmlFor="by-max-speed">Max speed:</label>
                <input
                    placeholder="Enter maximum speed"
                    type="number"
                    min="0"
                    id="by-max-speed"
                    name="maxSpeed"
                    value={maxSpeed}
                    onChange={this.handleChange} />
                <button className="primary-btn">Filter</button>
            </form>
        )
    }
}