import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    query,
    removeMail,
    getMailById,
    toggleStar,
    setMailIsRead,
    getTimeForDisplay,
    saveMail
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
        body: utilService.makeLorem(150),
        isRead: false,
        sentAt: 1551133910594,
        from: 'lola@bmail.com',
        name: 'Lola',
        isStared: false,
        type: null
    },
    {
        id: 'e102',
        subject: 'Municipal tax!',
        body: utilService.makeLorem(100),
        isRead: false,
        sentAt: 1551133930594,
        from: 'myosef@zalla.com',
        name: 'Maale yosef',
        isStared: false,
        type: null
    },
    {
        id: 'e103',
        subject: 'Come to...',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: 1551133950594,
        from: 'bestv@abmail.com',
        name: 'Best vacations',
        isStared: false,
        type: null
    },
    {
        id: 'e104',
        subject: 'Wtf?',
        body: utilService.makeLorem(150),
        isRead: false,
        sentAt: 1551133970594,
        from: 'holly@gsus.com',
        name: 'Holly wtf project',
        isStared: false,
        type: null
    },
    {
        id: 'e105',
        subject: 'Amazor order is on the way',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: 1551133990594,
        from: 'amazor@service.com',
        name: 'Amazor',
        isStared: false,
        type: null
    },
    {
        id: 'e106',
        subject: 'Tell me more about wtf',
        body: utilService.makeLorem(250),
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,
        type: null
    },
    {
        id: 'e107',
        subject: 'Interested in your holidays',
        body: utilService.makeLorem(100),
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,
        type: null
    },
    {
        id: 'e108',
        subject: 'order didnt arived',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: 1551133990594,
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,
        type: null
    },

]

_createMails()

function query(filterBy) {
    let { txt, type } = filterBy;
    if (!type) type = 'inbox'
    const mails = _loadMailsFromStorage();
    const sortedMails = _getSortedMails(mails, type)
    if (!txt) return Promise.resolve(sortedMails);
    const filteredMails = _getFilteredMails(sortedMails, txt);
    return Promise.resolve(filteredMails);
}

function _getFilteredMails(sortedMails, txt) {

    return sortedMails.filter((mail) => {
        if ((mail.subject.toLowerCase().includes(txt.toLowerCase())) ||
            (mail.body.toLowerCase().includes(txt.toLowerCase())) ||
            (mail.from.toLowerCase().includes(txt.toLowerCase())) ||
            (mail.name.toLowerCase().includes(txt.toLowerCase()))) return mail
    })
}


function _getSortedMails(mails, type) {
    return mails.filter((mail) => {
        if (type === 'sent') {
            if (mail.from === loggedinUser.email) return mail
        }
        if (type === 'inbox') {
            if (mail.from !== loggedinUser.email) return mail
        }
        if (type === 'isStared') {
            if (mail.isStared) return mail
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

function saveMail(mailToSave) {
    
    return mailToSave.id ? _updateMail(mailToSave) : _addMail(mailToSave)
}

function _addMail(mailToSave) {
    let mails = _loadMailsFromStorage()
    var mail = _createMail(mailToSave)
    mails = [mail, ...mails]
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function _updateMail(mailToSave) {
    const mails = _loadMailsFromStorage()
    var mailIdx = mails.findIndex(function (mail) {
        return mail.id === mailToSave.id;
    })
    mails[mailIdx] = mailToSave
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function _createMail(mailToSave) {
    // if (!mailToSave.speed) mailToSave.speed = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        subject: mailToSave.subject,
        body: utilService.makeLorem(150),
        isRead: false,
        sentAt: Date.now(),
        from:'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,
        type: null

    } 
}

function _createMails() {
    var mails = _loadMailsFromStorage()
    if (!mails || !mails.length) {
        mails = gMails
    }

    _saveMailsToStorage(mails);
}

function getTimeForDisplay(timeStamp) {
    const now = Date.now()
    const diff = ((((now - timeStamp) / 1000) / 60) / 60)

    if (diff < 24) {
        const Hours = new Date(timeStamp).getHours().toString()
        const Min = new Date(timeStamp).getMinutes().toString()
        const Time = (Hours + ':' + Min)
        return Time
    } else if (diff < 8760) {
        const Month = new Date(timeStamp).getMonth().toString()
        const Day = new Date(timeStamp).getDay().toString()
        const Time = (Month + ' ' + Day);
        return Time

    } else {
        const Year = new Date(timeStamp).getFullYear().toString()
        const Month = new Date(timeStamp).getMonth().toString()
        const Day = new Date(timeStamp).getDay().toString()
        const Time = (Day + '/' + Month + '/' + Year);
        return Time
    }
}

function removeMail(mailId) {
    let mails = _loadMailsFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveMailsToStorage(mails);
    return Promise.resolve()
}

function toggleStar(mailId) {
    const mails = _loadMailsFromStorage()
    const mail = mails.find(mail => {
        return mail.id === mailId
    })
    mail.isStared = !mail.isStared
    _saveMailsToStorage(mails)
    return Promise.resolve()
}

function setMailIsRead(mailId) {
    const mails = _loadMailsFromStorage()
    const mail = mails.find(mail => {
        return mail.id === mailId
    })
    if (!mail.isRead) mail.isRead = true
    _saveMailsToStorage(mails)
    return Promise.resolve()
}


function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}