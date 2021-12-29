
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
                <div className="logo">Apps Place</div>

                
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                    <NavLink to="/email">Mail</NavLink>
                    <NavLink to="/book">book</NavLink>
                    <NavLink to="/keep">keep</NavLink>
                </nav>
            </header>
        )
    }
}
