import echo from './echo'
import prompt from './prompt'
import {pop as stackPop} from './stack'

export default prompt((cmd, args, state) =>  {
    switch (cmd) {
        case 'help': return echo(["These are possible commands: ", ...state.availableCommands], state)
        case 'show': 
            let label = args[0] || 'unread'
            let emails = state.emails.filter( (email) => ( email.labels.includes(label) ) )
            let result = emails.map( (email) => ( JSON.stringify(email) ) ).reduce( (res, email) => (res + "\n" + email), "")
            return echo (result, state)
        case 'quit': 
            return stackPop(state, "email")
        default: return echo("bad command", state)
    }
})

let initialState = {
    prompt: "email>",
    output: [],
    fnc: 'email',
    availableCommands: ['help', 'show', 'send'],
    emails: []
}

export {initialState}

export const addEmail = (currentState, email) => {
    return {...currentState, emails: [...currentState.emails, email]}
}




