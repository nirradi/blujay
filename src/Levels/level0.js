import {addItem} from '../GameEngine/Applications/fs'
import {initialState} from '../GameEngine/Applications/shell'
import {addEmail} from '../GameEngine/Applications/email'

let root = initialState.fs
root = addItem(root, '/README', 'file', 'this is the first file')
root = addItem(root, '/subdir', 'directory')
root = addItem(root, '/subdir/README', 'file', 'this is the second file')

let emailState = initialState.emailState

emailState = addEmail(emailState, {
    from: 'Lisa Vanderblit',
    to: 'me',
    subject: 'hey where are you?',
    content: "You haven't been around the office, send me an email when you see this",
    labels: ['unread', 'inbox']
})  

let triggers = [
    (gameState, levelProgress) => {
        if (!levelProgress.sentFirstEmail && gameState.fnc === 'email') {
            let found = false
            let updated = false
            let newEmails = gameState.emails.map( (email) => {
                if (email.labels.includes('outbox')) {
                    updated = true
                    if (email.to.toLowerCase() === 'Lisa Vanderblit'.toLowerCase()) {
                        found = true
                        return {
                            ...email, 
                            labels: ['sent']
                        }
                    }
                    else {
                        return {
                            ...email,
                            labels: ['failed']
                        }
                    }
                }
                else {
                    return email
                }
            })

            if (found) {
                return [
                    addEmail({...gameState, emails: newEmails}, {
                        from: 'Lisa Vanderblit',
                        to: 'me',
                        subject: 'so you went home.....',
                        content: "I'm glad to see you back reading emails. I can't really read what you wrote its all garbage, you haven't updated your email server yet. send me your NetLoc number and I'll fix it from here",
                        labels: ['unread', 'inbox']
                    }),
                    {
                        ...levelProgress,
                        sentFirstEmail: true
                    }
                ]
            }
            else if (updated) {
                return [{...gameState, emails: newEmails}, levelProgress]
            }
        }

                
        return [gameState, levelProgress]
    }
]

export default {
    fnc: (gameState, levelProgress) => {
        let newGameState = gameState
        let newLevelProgress = levelProgress
        triggers.forEach( (trigger) => {
            [newGameState, newLevelProgress] = trigger(gameState, levelProgress)
        })

        return [newGameState, newLevelProgress]
    },
    initialState: {
        ...initialState, 
        emailState, 
        fs: root
    }
}