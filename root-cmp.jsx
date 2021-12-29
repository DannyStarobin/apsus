import {Home} from './pages/home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <section className="app">
        <Router>
            <header>
                <h1>AppSus</h1>
            </header>
            <main>
                <Switch>
                    <Route component={Home} path="/" />
                </Switch>
            </main>
        </Router>
    </section>
}

