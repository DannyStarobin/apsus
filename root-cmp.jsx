import { AppHome } from './js/pages/app-home.jsx'
import { BookIndex } from './js/apps/book/pages/book-index.jsx'
import {MailIndex} from './js/apps/mail/pages/mail-index.jsx'
import { NoteIndex } from './js/apps/keep/pages/note-index.jsx'
import { AppHeader } from './js/cmps/app-header.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <section className="app">
        <Router>
            <AppHeader />
            <main>
                <Switch>
                    <Route component={BookIndex} path="/book" />
                    <Route component={MailIndex} path="/email" />
                    <Route component={NoteIndex} path="/keep" />
                    <Route component={AppHome} path="/" />
                </Switch>
            </main>
        </Router>
    </section>
}

