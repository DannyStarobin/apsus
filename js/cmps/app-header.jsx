
const { NavLink, withRouter } = ReactRouterDOM

export class AppHeader extends React.Component {

    state = {
    }



    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {

        return (
            <header className="app-header" >
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                    <NavLink to="/mail">Mail</NavLink>
                    <NavLink to="/book">book</NavLink>
                    <NavLink to="/keep">keep</NavLink>
                </nav>
            </header>
        )
    }
}
