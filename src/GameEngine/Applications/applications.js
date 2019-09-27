import {shell, onShellStart} from './shell'
import {email, onEmailStart} from './email'
import {emailEditor, onEmailEditorStart} from './emailEditor'

let runs = {
    shell, 
    email,
    emailEditor,
}

let inits = {
    shell: onShellStart,
    email: onEmailStart,
    emailEditor: onEmailEditorStart
}

export const getRunFunc = (funcName) => (runs[funcName]) 
export const getInitFunc = (funcName) => (inits[funcName]) 

