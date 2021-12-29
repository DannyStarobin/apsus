import { AppHome } from './js/pages/app-home.jsx'
import { MissBook } from './js/apps/book/pages/book-index.jsx'
import {MissEmail} from './js/apps/mail/pages/mail-index.jsx'
import { MissKeep } from './js/apps/keep/pages/note-index.jsx'
import { AppHeader } from './js/cmps/app-header.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <section className="app">
        <Router>
            <AppHeader />
            <main>
                <Switch>
                    <Route component={MissBook} path="/book" />
                    <Route component={MissEmail} path="/email" />
                    <Route component={MissKeep} path="/keep" />
                    <Route component={AppHome} path="/" />
                </Switch>
            </main>
        </Router>
    </section>
}

