import echo from './echo'
import prompt from './prompt'
import {push as stackPush, pop as stackPop} from './stack'
import {initialState as emailEditorState} from './emailEditor'

export default prompt((cmd, args, state) =>  {
    switch (cmd) {
        case 'help': return echo(["These are possible commands: ", ...state.availableCommands], state)
        case 'send': 
            return stackPush(state, "emailEditor")
        case 'show': 
            let label = args[0] || 'unread'
            let emails = state.emails.filter( (email) => ( email.labels.includes(label) ) )
            let result = emails.map( (email) => ( JSON.stringify(email) ) ).reduce( (res, email) => (res + "\n" + email), "")
            return echo (result, state)
        case 'quit': 
            return stackPop(state, "email")
        default: 
            return echo("bad command", state)
    }
})

let initialState = {
    prompt: "email>",
    output: [],
    fnc: 'email',
    availableCommands: ['help', 'show', 'send'],
    emails: [],
    emailEditorState,
    onStartFnc: 'onEmailStart'
}

export {initialState}

export const addEmail = (currentState, email) => {
    return {...currentState, emails: [...currentState.emails, email]}
    
}

export const onEmailStart = (state, args) => {
    if (!args) {
        let unreadEmails = state.emails.filter((email) => (email.labels.includes('unread')) ).length
        return echo(`There ${unreadEmails > 1 ? "are" : "is"} ${unreadEmails} unread ${unreadEmails > 1 ? "emails" : "email"}`, state)
    }

    switch (args[0]) {
        case 'send': return addEmail(state, args[1])
        default:
            return state
    }
    
}


