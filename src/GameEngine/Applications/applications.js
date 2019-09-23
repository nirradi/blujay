import shell from './shell'
import email from './email'

let funcs = {
    shell, 
    email
}

export default (funcName) => (funcs[funcName]) 