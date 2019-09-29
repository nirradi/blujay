import echo, {prettify} from './echo'
import prompt from './prompt'
import {push as stackPush, pop as stackPop} from './stack'
import {now} from './shell'
import moment from 'moment'

const markAsRead = (state, label) => {
    let markedEmails = state.emailState.emails.map( (email) => {
        if (email.labels.includes(label) && email.labels.includes('unread'))
            return {
                ...email, 
                labels: email.labels.filter( (label) => (label !== 'unread'))
            }
        else
            return email
    })

    return {...state, emailState: {...state.emailState, emails: markedEmails} }
}


export const email = prompt((cmd, args, state) =>  {
    let emailState = state.emailState
    switch (cmd) {
        case 'help': 
            switch (args[0]) {
                case 'show':
                    return echo("show [unread|inbox|sent|failed]", state)
                default: 
                    return echo(["These are possible commands: ", ...state.availableCommands], state)
            }
            
        case 'send': 
            return stackPush(state, "emailEditor")
        case 'show': 
            let label = args[0] || 'unread'
            let emails = emailState.emails.filter( (email) => ( email.labels.includes(label) ) )
            let result = emails.map( (email) => ( prettify(email, ["To", "From", "Sent", "Subject", "Content"]) ) ).reduce( (res, email) => (res + email), "")
            
            return echo (result, markAsRead(state, label) )
        case 'quit': 
            return stackPop(state, "email")
        default: 
            return echo("bad command", state)
    }
})

let initialState = {
    emails: [],
    config: {
        encryptor: "v1.4",
        server: "admantech vanilla 1",
        clock: "from server"
    },
}

export {initialState}

export const addEmail = (state, email) => {

    if (!email.sent) {
        let sent = state.emailState.config.clock === "from server" ? moment().format() : now(state)
        email = {...email, sent}
    }
        
    return {...state, emailState: {...state.emailState, emails: [...state.emailState.emails, email]} } 
    
}

export const onEmailStart = (state, args) => {
    let newState = {
        ...state, 
        prompt: "email>",
        availableCommands: ['help', 'show', 'send', 'quit'],
    }

    if (!args) {
        let unreadEmails = newState.emailState.emails.filter((email) => (email.labels.includes('unread')) ).length
        return echo(`There ${unreadEmails > 1 ? "are" : "is"} ${unreadEmails} unread ${unreadEmails > 1 ? "emails" : "email"}`, newState)
    }

    switch (args[0]) {
        case 'send': return addEmail(newState, args[1])
        default:
            return newState
    }
    
}

export const sendEmails = (state, emailWhiteList) => {

    let updated = false

    emailWhiteList = emailWhiteList.map( (email) => (email.toLowerCase()))
    let newEmails = state.emailState.emails.map( (email) => {
        if (email.labels.includes('outbox')) {
            updated = true
            if (emailWhiteList.includes(email.to.toLowerCase())) {
                return {
                    ...email, 
                    labels: ['sent']
                }
            }
            else {
                return {
                    ...email,
                    labels: ['failed']
                }
            }
        }
        else {
            return email
        }
    })

    return updated ? {...state, emailState: {...state.emailState, emails: newEmails} } : state
}
