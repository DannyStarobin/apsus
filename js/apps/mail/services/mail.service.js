import { storageService } from "../../../services/storage.service.js"

export const mailService = {
    query,
}

const KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const gMails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133910594,
        from: 'user@appsus.com',
        name: 'Lola'
    },
    {
        id: 'e102',
        subject: 'Municipal tax!',
        body: 'Pay your taxes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'user@appsus.com',
        name: 'Maale yosef'
    },
    {
        id: 'e103',
        subject: 'Come to...',
        body: 'Have you been...?',
        isRead: false,
        sentAt: 1551133950594,
        from: 'user@appsus.com',
        name: 'Best vacations'
    },
    {
        id: 'e104',
        subject: 'Wtf?',
        body: 'What the fuck?',
        isRead: false,
        sentAt: 1551133970594,
        from: 'user@appsus.com',
        name: 'Holly wtf project'
    },
    {
        id: 'e105',
        subject: 'Amazon order is on the way',
        body: 'hello Apsus your...',
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Amazon'
    },

]


_createMails()

function query() {
    const mails = _loadMailsFromStorage()
    return Promise.resolve(mails)
}


function _createMails() {
    var mails = _loadMailsFromStorage()
    if (!mails || !mails.length) {
        mails = gMails
    }

    _saveMailsToStorage(mails);
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}