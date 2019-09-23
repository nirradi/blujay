import prompt from './prompt'
import {pop as stackPop} from './stack'

export default prompt((cmd, args, state) =>  {
    switch (cmd) {
        default: 
            let val = [cmd, ...args].join(' ')
            switch (state.prompt) {
                case "to": return {...state,  to: val, prompt: "subject"}
                case "subject": return {...state, subject: val, prompt: "content"}
                case "content": 
                    return stackPop(state, "emailEditor", ['send', {
                        from: 'me',
                        to: state.to,
                        subject: state.subject,
                        content: val,
                        labels: ['outbox']
                    }])
                default:
                    return state
            }
    }
})

let initialState = {
    output: [],
    fnc: 'emailEditor',
    availableCommands: [],
    onStartFnc: 'onEmailEditorStart'
}

export {initialState}

export const onEmailEditorStart = (state, args) => ({...state, prompt: "to", output: []})






