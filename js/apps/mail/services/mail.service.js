import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    query,
    removeMail,
    getMailById,
    toggleStar,
    setMailIsRead,
    getTimeForDisplay,
    saveMail,
    toggleTrashMail,
    unreadCount
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
        isRead: true,
        sentAt: 1641079716477,
        to: 'user@appsus.com',
        from: 'lola@bmail.com',
        name: 'Lola',
        isStared: false,
    },
    {
        id: 'e102',
        subject: 'Municipal tax!',
        body: utilService.makeLorem(100),
        isRead: false,
        sentAt:1641075716477,
        to: 'user@appsus.com',
        from: 'myosef@zalla.com',
        name: 'Maale yosef',
        isStared: false,

    },
    {
        id: 'e103',
        subject: 'Come to...',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: 1640079716477,
        to: 'user@appsus.com',
        from: 'bestv@abmail.com',
        name: 'Best vacations',
        isStared: false,

    },
    {
        id: 'e104',
        subject: 'Wtf?',
        body: utilService.makeLorem(150),
        isRead: true,
        sentAt:1631079716477,
        to: 'user@appsus.com',
        from: 'holly@gsus.com',
        name: 'Holly wtf project',
        isStared: false,

    },
    {
        id: 'e105',
        subject: 'Amazor order is on the way',
        body: utilService.makeLorem(200),
        isRead: false,
        sentAt: 1630079716477,
        to: 'user@appsus.com',
        from: 'amazor@service.com',
        name: 'Amazor',
        isStared: false,

    },
    {
        id: 'e106',
        subject: 'Tell me more about wtf',
        body: utilService.makeLorem(250),
        isRead: false,
        sentAt: 1630009716477,
        to: 'holly@gsus.com',
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,

    },
    {
        id: 'e107',
        subject: 'Interested in your holidays',
        body: utilService.makeLorem(100),
        isRead: false,
        sentAt: 1629079716477,
        to: 'bestv@abmail.com',
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,

    },
    {
        id: 'e108',
        subject: 'order didnt arived',
        body: utilService.makeLorem(50),
        isRead: true,
        sentAt: 1625079716477,
        to: 'amazor@service.com',
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: true,

    },
    {
        id: 'e109',
        subject: 'order didnt arived',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: 1621079716477,
        to: 'user@appsus.com',
        from: 'Help@service.com',
        name: 'Please help',
        isStared: true,

    },
    {
        id: 'e110',
        subject: 'order didnt arived',
        body: utilService.makeLorem(50),
        isRead: true,
        sentAt: 1620079716477,
        to: 'user@appsus.com',
        from: 'reaction@service.com',
        name: 'Reaction action',
        isStared: false,
        isTrash:true

    },
    {
        id: 'e111',
        subject: 'Justify the content',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: 1615079716477,
        to: 'user@appsus.com',
        from: 'amazor@service.com',
        name: 'Balbazor',
        isStared: true,

    },
    {
        id: 'e112',
        subject: 'Wow something',
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: 1661079716477,
        to: 'amazor@service.com',
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,
        isDraft: true

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
            (mail.to.toLowerCase().includes(txt.toLowerCase())) ||
            (mail.name.toLowerCase().includes(txt.toLowerCase()))) return mail
    })
}


function _getSortedMails(mails, type) {
    return mails.filter((mail) => {
        if (type === 'sent') {
            if (mail.to !== loggedinUser.email && !mail.isDraft && !mail.isTrash) return mail
        }
        if (type === 'inbox') {
            if (mail.to === loggedinUser.email && !mail.isTrash) return mail
        }
        if (type === 'isStared' && !mail.isTrash) {
            if (mail.isStared) return mail
        }
        if (type === 'isDraft' && !mail.isTrash) {
            if (mail.isDraft) return mail
        }
        if (type === 'isTrash') {
            if (mail.isTrash) return mail
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
    return Promise.resolve(mail)
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
    return {
        id: utilService.makeId(),
        subject: mailToSave.subject,
        body: mailToSave.body,
        isRead: false,
        sentAt: Date.now(),
        to: '',
        from: 'user@appsus.com',
        name: 'Mahatma Appsus',
        isStared: false,
        isDraft: mailToSave.isDraft,
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
        let Hours = new Date(timeStamp).getHours().toString()
        let Min = new Date(timeStamp).getMinutes().toString()
        if (+Min < 10) Min = '0' + Min
        if (+Hours < 10) Hours = '0' + Hours
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

function toggleTrashMail(mailId) {
    console.log(' mailId from trash:', mailId);

    const mails = _loadMailsFromStorage()
    const mail = mails.find(mail => {
        return mail.id === mailId
    })
    if (!mail.isTrash) mail.isTrash = true
    else mail.isTrash = false
    console.log(mail.isTrash);
    _saveMailsToStorage(mails)
    return Promise.resolve()
}

function setMailIsRead(mailId) {
    const mails = _loadMailsFromStorage()
    const mail = mails.find(mail => {
        return mail.id === mailId
    })
    if (!mail.isRead) mail.isRead = true
    else mail.isRead = false
    _saveMailsToStorage(mails)
    return Promise.resolve()
}

function unreadCount() {
    const mails = _loadMailsFromStorage()
    let unreadMails = 0
    mails.map(mail => {
        if (!mail.isRead && mail.to === 'user@appsus.com') unreadMails++

    })
    return Promise.resolve(unreadMails)
}


function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}