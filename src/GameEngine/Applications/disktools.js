import prompt from './prompt'
import echo from './echo'
import {pop as stackPop} from './stack'

export const diskTools = prompt((cmd, args, state) =>  {
    switch (cmd) {
        case 'help': {
            switch (args[0]) {
                case "recover":
                    return echo ( "recovery tool can reconstruct trashed files, usage: recover [analyze|folder name]", state )
                case "defob":
                    return echo ( "defobs the hard drive head and disks to previous state (recommended before data recovery), usage: defob [head size] [disk count]", state )
                case "format": 
                    return echo("formats the hard drive, removing all files. WARNING: do not do this unless you have a recovery disk", state)
                default: 
                    return echo(["Type `help [command]` for more information\n" 
                                 + "These are possible commands: ", 
                                 ...state.availableCommands], 
                                state)
            }
        }
        case 'recover': {
            switch (args[0]) {
                case 'analyze':
                    return echo("recovery analysis done, output of head state for folder recovery: \n" + state.diskToolsState.recoveryFolders.join('\n'), state)
                default: 
                    return echo ("attempting to recover " + args[0], {...state, diskToolsState: {...state.diskToolsState, recoverAttempt: args[0]}})
            }
        }

        case 'defob': {
            if ((args[0] !== state.shellState.system.headsize) || (args[1] !== state.shellState.system.diskcount))
                return echo ("ERR41: incompatible arguments, please consult your system manual for more information", state)
            else
                return echo("Defobbing in process. Estimated finish time: 1 minute", {...state, diskToolsState: {...state.diskToolsState, defobbed: true}})
        }

        case 'quit':
            return stackPop(state, "email")

        default: 
            return echo("bad command: " + cmd , state)
    }
})

export const onDiskToolsStart = (state, args) => {
    return {
        ...state, 
        prompt: "disktools>",
        availableCommands: ['help', 'recover', 'defob', 'format'],
    }
}