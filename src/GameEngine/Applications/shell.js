//import email from './emailEmulator.js'
import echo from './echo'
import prompt from './prompt'
import {createRoot, addItem, getContent, getDirectoryContents, normalize} from './fs'
import {initialState as emailState} from './email'
import {push as stackPush} from './stack'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );


export default prompt((cmd, args, state) =>  {
    switch (cmd) {
        case 'help': return echo(["These are possible commands: ", ...state.availableCommands], state)
        case 'ls': 
            let files = Object.filter(state.fs, (file) => (file.path === state.cwd))
            let names = Object.keys(files).map( (key, index) => (files[key].name))
            return echo(names, state)
        case 'cd': 
            let dirName = normalize(state.cwd, args[0])
            if (dirName[dirName.length -1] === "/")
                dirName = dirName.slice(0, -1)

            if (state.fs[dirName])
                return {...state, cwd: dirName + "/"}
            else
                return echo ("bad directory", state)

        case 'cat': 
            let fileName = normalize(state.cwd, args[0])
            let content = getContent(state.fs, fileName)
            if (content === null)
                return echo("bad file", state)
            else
                return echo(content, state)
        case "":
            return state
        
        case "email": 
            return stackPush(state, "email")

        default: return echo("bad command", state)
    }
})


let root = createRoot()
root = addItem(root, '/README', 'file', 'this is the first file')
root = addItem(root, '/subdir', 'directory')
root = addItem(root, '/subdir/README', 'file', 'this is the second file')

let initialState = {
    prompt: "shell>",
    output: [],
    fnc: 'shell',
    availableCommands: ['help', 'ls', 'cat', 'email'],
    fs: root,
    cwd: '/',
    emailState: emailState,
    stack: []
}

export {initialState}
