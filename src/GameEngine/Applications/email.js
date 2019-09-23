import echo from './echo'
import prompt from './prompt'
import {pop as stackPop} from './stack'

export default prompt((cmd, args, state) =>  {
    switch (cmd) {
        case 'help': return echo(["These are possible commands: ", ...state.availableCommands], state)
        case 'show': return echo ("emails", state)
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
    data: []
}

export {initialState}
