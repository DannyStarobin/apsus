import { SearchInput } from "./search-input.jsx"

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
                <div className="logo">
                    <p>Apps Place</p>
                    <img className="logo-img" src="assets/img/logo.png" />
                    </div>
                <nav className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                    <NavLink to="/email">Mail</NavLink>
                    <NavLink to="/book">Book</NavLink>
                    <NavLink to="/keep">Keep</NavLink>
                </nav>
            </header>
        )
    }
}

