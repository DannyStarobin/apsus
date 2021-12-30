import { storageService } from "../../../services/storage.service.js"

export const mailService = {
    query,
    removeMail,
    getMailById
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
        from: 'lola@bmail.com',
        name: 'Lola',
        stared: false,
        status: null
    },
    {
        id: 'e102',
        subject: 'Municipal tax!',
        body: 'Pay your taxes',
        isRead: false,
        sentAt: 1551133930594,
        from: 'myosef@zalla.com',
        name: 'Maale yosef',
        stared: false,
        status: null
    },
    {
        id: 'e103',
        subject: 'Come to...',
        body: 'Have you been...?',
        isRead: false,
        sentAt: 1551133950594,
        from: 'bestv@abmail.com',
        name: 'Best vacations',
        stared: false,
        status: null
    },
    {
        id: 'e104',
        subject: 'Wtf?',
        body: 'What the fuck?',
        isRead: false,
        sentAt: 1551133970594,
        from: 'holly@gsus.com',
        name: 'Holly wtf project',
        stared: false,
        status: null
    },
    {
        id: 'e105',
        subject: 'Amazor order is on the way',
        body: 'hello Apsus your...',
        isRead: false,
        sentAt: 1551133990594,
        from: 'amazor@service.com',
        name: 'Amazor',
        stared: false,
        status: null
    },
    {
        id: 'e106',
        subject: 'Tell me more about wtf',
        body: 'Hello how are you this days?...',
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        stared: false,
        status: null
    },
    {
        id: 'e107',
        subject: 'Interested in your holidays',
        body: 'I would like to receive some info about vications in march..',
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        stared: false,
        status: null
    },
    {
        id: 'e108',
        subject: 'order didnt arived',
        body: 'hello Amazor your...',
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        stared: false,
        status: null
    },

]


_createMails()

function query(filterBy) {
    // console.log('filterBy:', filterBy);
     const mails = _loadMailsFromStorage();
    if (!filterBy) return Promise.resolve(mails);
    const filteredMails = _getFilteredMails(mails, filterBy);
    return Promise.resolve(filteredMails);
}

function _getFilteredMails(mails, filterBy) {
    let { subject, inbox, stared, sentMail, drafts } = filterBy;    
    return mails.filter((mail) => {


        if (filterBy === subject) {
            if (mail.subject.toLowerCase().includes(subject.toLowerCase())) return mail
            else if (mail.body.toLowerCase().includes(subject.toLowerCase())) return mail
            else if (mail.from.toLowerCase().includes(subject.toLowerCase())) return mail
            else if (mail.name.toLowerCase().includes(subject.toLowerCase())) return mail
        }
        // console.log('loggedinUser.email:', loggedinUser.email);

        if (filterBy === 'inbox') {
            if (mail.from !== loggedinUser.email) return mail
        }

        if (filterBy === 'sent') {
            if (mail.from === loggedinUser.email) return mail
        }
    })
}

function getMailById(mailId) {
    const mails = _loadMailsFromStorage()
    var mail = mails.find(function (mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)
}

function _createMails() {
    var mails = _loadMailsFromStorage()
    if (!mails || !mails.length) {
        mails = gMails
    }

    _saveMailsToStorage(mails);
}

function removeMail(mailId) {
    let mails = _loadMailsFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}