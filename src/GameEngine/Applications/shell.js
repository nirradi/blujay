//import email from './emailEmulator.js'
import echo, {prettify} from './echo'
import prompt from './prompt'
import {createRoot, getContent, normalize} from './fs'
import {push as stackPush} from './stack'
import moment from 'moment'

moment.defaultFormat = 'YYYY MMMM DD, H:mm'

Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => ((res[key] = obj[key], res)), {} );


let startTime = moment().format()

let updateShellState = (state, obj) => {
    return {...state, shellState: { ...state.shellState, ...obj} }
}

export const shell = prompt((cmd, args, state) =>  {
    let shellState = state.shellState
    switch (cmd) {
        case 'help': 
            switch (args[0]) {
                case "system":
                    return echo ( "manage system properties, usage: system [show|config] [os|network|email] [parameter]", state )
                case "time": 
                    return echo("time [Year Month Day, hours:minutes]", state)
                default: 
                    return echo(["Type `help [command]` for more information\n" 
                                 + "These are possible commands: ", 
                                 ...state.availableCommands], 
                                state)
            }
            
        case 'ls': 
            let files = Object.filter(shellState.fs, (file) => (file.path === shellState.cwd))
            let names = Object.keys(files).map( (key, index) => (files[key].name))
            return echo(names, state)
        case 'cd': 
            let dirName = normalize(shellState.cwd, args[0])
            if (dirName[dirName.length -1] === "/")
                dirName = dirName.slice(0, -1)

            if (shellState.fs[dirName])
                return updateShellState(state, {cwd: dirName + "/"})
            else
                return echo ("bad directory", state)

        case 'cat': 
            let fileName = normalize(shellState.cwd, args[0])
            let content = getContent(shellState.fs, fileName)
            if (content === null)
                return echo("bad file", state)
            else
                return echo(content, state)
        case "":
            return state

        case "system": 
            let subcmd = args[0]
            switch (subcmd) {
                default:
                case "show": {
                    switch (args[1]) {
                        case "network": 
                        return echo ( prettify(shellState.network, ['location', 'type', 'ping']), state )
                        case "email": 
                            return echo ( prettify(state.emailState.config, ['encryptor', 'server', 'clock']), state )
                        default:
                        case "os":
                        case "":
                            return echo ( 
                                prettify(shellState.system, ['OS', 'build', 'version']), state )
                        }
                }
                case "config": {
                    switch (args[1]) {
                        case "email": 
                            switch (args[2]) {
                                case "clock": 
                                    let newClock = state.emailState.config.clock === 'from server' ? 'from local' :  'from server' 
                                    return echo ( "toggle clock ---> " + newClock, {...state, emailState: {...state.emailState, config: {...state.emailState.config, clock: newClock} }  } )
                                default:
                                case "":
                                    return echo ( "bad paramater or update not possible", state )
                            }
                        default:
                            return echo ( "no possible updates", state )
                    }
                }
                
                    
                
            }
        
        case "email": 
            return stackPush(state, "email")

        case "time": 
            
            if (typeof args[0] !== 'undefined' && args[0] !== "") 
                return updateShellState(state, { system: {...shellState.system, time: moment(args.join(" "), moment.defaultFormat)}} )
            else
                return echo (now(state), state)
            

        default: return echo("bad command: " + cmd , state)
    }
})


let root = createRoot()

let initialState = {
    fs: root,
    cwd: '/',
    system: {
        os: "BluJay",
        version: "451.7.16",
        build: "HappNapp--11",
        time: startTime
    },
    network: {
        location: "150112031334",
        type: "havocnet",
        ping: "---"
    },
}

export {initialState}

export const now = (state) => {
    let system = state.shellState.system
    return (system.time.add((moment().subtract(startTime).format()))).format();
}

export const onShellStart = (state, args) => {
    return {
        ...state, 
        prompt: "shell>",
        availableCommands: ['help', 'ls', 'cat', 'email', 'system', 'time'],
    }
}