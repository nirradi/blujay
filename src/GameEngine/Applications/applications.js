import shell from './shell'
import email from './email'
import {onEmailStart} from './email'
import emailEditor from './emailEditor'
import {onEmailEditorStart} from './emailEditor'

let funcs = {
    shell, 
    email,
    emailEditor,
    onEmailStart,
    onEmailEditorStart
}

export default (funcName) => (funcs[funcName]) 

