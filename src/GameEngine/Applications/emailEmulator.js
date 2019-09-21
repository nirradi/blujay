import { EmulatorState, FileSystem, CommandMapping, defaultCommandMapping } from 'javascript-terminal';

let createInbox = (items) => {

    let res = {
        '/inbox': {}
    }

    items.forEach((item) => {
        res['/inbox/subject: ' + item.subject] = { content: item.content }
    })

    return FileSystem.create(res)
}

export default (gameState, onUpdateStack) => ({
    emulator: EmulatorState.create({
        'commandMapping': CommandMapping.create({
            'show': {
                'function': (state, opts) => {
                    return defaultCommandMapping.ls.function(state, ['inbox'])
                },
                'optDef': {}
            },
            'quit': {
                'function': (state, opts) => {
                    return onUpdateStack()
                },
                'optDef': {}
            }
        }),
        'fs': createInbox(gameState.inbox)
    }),
    prompt: "email>"

}) 