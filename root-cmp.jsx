import { AppHome } from './js/pages/app-home.jsx'

import { MissBook } from './js/apps/book/pages/book-index.jsx'
import {MissEmail} from './js/apps/mail/pages/mail-index.jsx'
import { MissKeep } from './js/apps/keep/pages/note-index.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <section className="app">
        <Router>
            <main>
                <Switch>
                    <Route component={AppHome} path="/" />
                    <Route component={MissBook} path="/book" />
                    <Route component={MissEmail} path="/email" />
                    <Route component={MissKeep} path="/keep" />
                </Switch>
            </main>
        </Router>
    </section>
}

