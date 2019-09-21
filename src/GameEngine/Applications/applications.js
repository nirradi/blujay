import shell from './shell'

let funcs = {
    shell,
}

export default (funcName) => (funcs[funcName]) 