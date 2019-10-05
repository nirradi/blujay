import {shell, onShellStart} from './shell'
import {email, onEmailStart} from './email'
import {emailEditor, onEmailEditorStart} from './emailEditor'
import {dataRecover, onDataRecoverStart} from './datarecover'

let runs = {
    shell, 
    email,
    emailEditor,
    datarecover: dataRecover
}

let inits = {
    shell: onShellStart,
    email: onEmailStart,
    emailEditor: onEmailEditorStart,
    datarecover: onDataRecoverStart
}

export const getRunFunc = (funcName) => (runs[funcName]) 
export const getInitFunc = (funcName) => (inits[funcName]) 

