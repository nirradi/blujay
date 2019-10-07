export default {
    triggers: [
        (gameState, levelProgress) => {
            if (!levelProgress.defobbed && gameState.diskToolsState.defobbed) {
                levelProgress = {...levelProgress, defobbed: true}
                gameState = {...gameState, 
                    diskToolsState: {
                        ...gameState.diskToolsState, 
                        recoveryFolders: [
                            '^til$*@$(%@',
                            '^^#(&@(a$%$#(',
                            '$&(%&g^^#!',
                            '*@&nne@!',
                            '*#!$%!gree(#^(',
                            '#$advi^$(',
                            '&yu@am@(&$ev$',
                            '^#@no$(!*and^',
                            '*ed%oost%!',
                            '(&^$^@($@$',
                            '@!lack#(^^#$^',
                            '^^((!!(*%%%',
                            '&&&#$',
                            '$*!@&oning$&',
                            '@^^(@@',
                            '^&#ocum(%%&'
                        ]
                    }
                }
            }

            return [gameState, levelProgress]
        }

    ],
    initialState: {
        shellState: {
            availableApps: ['disktools', 'email']
        },
        diskToolsState: {
            recoveryFolders: [
                    '^&@%$*@$(%@',
                    '^^#(&@(#$%$#(',
                    '$&(%&!^^#!',
                    '*@&(@@!',
                    '*#!$%!&@$(#^(',
                    '#$%%$$^$(',
                    '&!@@^#@(&$&&$',
                    '^#@^$(!*%%$^',
                    '*&$&!%#&#^&',
                    '(&^$^@($@$',
                    '@!(^&##(^^#$^',
                    '^^((!!(*%%%',
                    '&&&#$',
                    '$*!@&^$(^^$$&',
                    '@^^(@@',
                    '^&#(@((%%&'
            ]
        },
        emailState: {
            contacts: [
                {
                    name: 'Lisa Vanderblit'
                },
                {
                    name: 'Richard Payton'
                }
            ]
        }
    }
}