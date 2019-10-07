import {shell, onShellStart} from './shell'
import {email, onEmailStart} from './email'
import {emailEditor, onEmailEditorStart} from './emailEditor'
import {diskTools, onDiskToolsStart} from './disktools'

let runs = {
    shell, 
    email,
    emailEditor,
    disktools: diskTools
}

let inits = {
    shell: onShellStart,
    email: onEmailStart,
    emailEditor: onEmailEditorStart,
    disktools: onDiskToolsStart
}

export const getRunFunc = (funcName) => (runs[funcName]) 
export const getInitFunc = (funcName) => (inits[funcName]) 

