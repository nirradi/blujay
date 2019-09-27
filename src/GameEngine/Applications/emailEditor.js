import prompt from './prompt'
import {pop as stackPop} from './stack'


let updateEditorState = (state, currentVal, nextPrompt) => {
    let currentState = (!state.emailState.emailEditorState) ? {} : state.emailState.emailEditorState
    return {...state, prompt: nextPrompt, emailState: {...state.emailState, emailEditorState: { ...currentState, [state.prompt]: currentVal} } }
}

export const emailEditor = prompt((cmd, args, state) =>  {
    switch (cmd) {
        default: 
            let val = [cmd, ...args].join(' ')
            switch (state.prompt) {
                case "to": return updateEditorState(state, val, "subject")
                case "subject": return updateEditorState(state, val, "content")
                case "content": 
                    return stackPop(state, ['send', {
                        from: 'me',
                        to: state.emailState.emailEditorState.to,
                        subject: state.emailState.emailEditorState.subject,
                        content: val,
                        labels: ['outbox']
                    }])
                default:
                    return state
            }
    }
})

export const onEmailEditorStart = (state, args) => ({
    ...state, 
    prompt: "to", 
    availableCommands: []
    })






