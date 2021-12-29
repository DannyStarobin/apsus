import {AppHome} from './pages/home.jsx'
import {MissBook} from './pages/MissBook.jsx'
import {MissEmail} from './pages/MissEmail.jsx'
import {MissKeep} from './pages/MissKeep.jsx'

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
                    <Route component={MissBook} path="/book" />
                    <Route component={MissEmail} path="/email" />
                    <Route component={MissKeep} path="/keep" />
                </Switch>
            </main>
        </Router>
    </section>
}

