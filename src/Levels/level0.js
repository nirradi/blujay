import {addItem} from '../GameEngine/Applications/fs'
import {initialState as shellState} from '../GameEngine/Applications/shell'
import {initialState as emailState} from '../GameEngine/Applications/email'
import {addEmail, sendEmails} from '../GameEngine/Applications/email'
import {push as pushToStack} from '../GameEngine/Applications/stack'
import moment from 'moment'

let state = {
    shellState,
    emailState, 
    output: [],
    stack: [],
}

let root = state.fs
root = addItem(root, '/README', 'file', 'this is the first file')
root = addItem(root, '/subdir', 'directory')
root = addItem(root, '/subdir/README', 'file', 'this is the second file')

state = { 
    ...state, 
    shellState: {
        ...state.shellState,
        fs: root
    }
}

const ITfriend = 'Lisa Vanderblit'
let contacts = [ITfriend]

state = addEmail(state, {
    from: ITfriend,
    to: 'me',
    subject: 'hey where are you?',
    content: "You haven't been around the office, send me an email when you see this",
    labels: ['unread', 'inbox'],
    sent: moment().startOf('day').format()
})  

const outboxContainsEmailTo = (state, to) => {
    
    let foundEmails = state.emailState.emails.filter( (email) => {
        return (email.labels.includes('outbox') && email.to.toLowerCase() === to.toLowerCase())
    })

    return foundEmails.length > 0
    
}

let triggers = [

    (gameState, levelProgress) => {
        if (!levelProgress.sentFirstEmail) {

            if (outboxContainsEmailTo(gameState, ITfriend)) {
                gameState = addEmail({...gameState}, {
                    from: ITfriend,
                    to: 'me',
                    subject: 'so you went home.....',
                    content: "I'm glad to see you back reading emails. I can't really read what you wrote its all garbage, you haven't updated your email server yet, so your encryption engine is out dated. send me your NetLoc number and I'll fix it from here",
                    labels: ['unread', 'inbox'],
                    sent: moment().format()
                })

                levelProgress = {
                    ...levelProgress,
                    sentFirstEmail: true
                }
            }
        }
                
        return [gameState, levelProgress]
    },

    (gameState, levelProgress) => {
        if (levelProgress.sentFirstEmail && !levelProgress.sendSecondEmail) {

            if (outboxContainsEmailTo(gameState, ITfriend)) {
                gameState = addEmail({...gameState}, {
                    from: ITfriend,
                    to: 'me',
                    subject: 'nice try',
                    content: "if you tried to send me the netloc #, then obviously you can't because the mail is still encrypted, so is the subject for that fact. That's going to be a problem!? I'll try to find your netloc# here somewhere while you try to figure out a way around the encryption.",
                    labels: ['unread', 'inbox'],
                    sent: moment().format()
                })

                levelProgress = {
                    ...levelProgress,
                    sendSecondEmail: true,
                }
            }
        }
                
        return [gameState, levelProgress]
    },

    (gameState, levelProgress) => {
        if (!levelProgress.emailUnencrypted && levelProgress.sentFirstEmail) {

            let foundEmails = gameState.emailState.emails.filter( (email) => {
                return (email.labels.includes('outbox') && email.to.toLowerCase() === ITfriend.toLowerCase() && email.sent === "1501 December 03, 13:34")
            })

            if (foundEmails.length > 0) {
                gameState = addEmail({...gameState}, {
                    from: ITfriend,
                    to: 'me',
                    subject: 'WOW I see what you did there!',
                    content: "How did you think of that!? anyway, I got your email updated - and now we should be able to talk about... you won't believe what Richards (aka toilet-breaks) got away with today!",
                    labels: ['unread', 'inbox'],
                    sent: moment().format()
                })

                levelProgress = {
                    ...levelProgress,
                    emailUnencrypted: true,
                }

                alert("game over")
            }

            
        }
                
        return [gameState, levelProgress]
    },

    (gameState, levelProgress) => {
        if (!levelProgress.emailUnencrypted) {
            let encryptedOutgoing = gameState.emailState.emails.map( (email) => {
                if (email.labels.includes('outbox')) {
                    return {
                        ...email,
                        subject: "***********************",
                        content: "***********************"
                    }
                }
                else {
                    return email
                }
            })
            return [{...gameState, emailState: {...gameState.emailState, emails: encryptedOutgoing}}, levelProgress]
        }
    },

    (gameState, levelProgress) => {
        return [sendEmails(gameState, (contacts)), levelProgress]
    }
  
]

state = pushToStack(state, 'shell')

export default {
    fnc: (gameState, levelProgress) => {
        let newGameState = gameState
        let accumulatedProgress = levelProgress
        triggers.forEach( (trigger) => {
            let newLevelProgress
            [newGameState, newLevelProgress] = trigger(newGameState, levelProgress)
            accumulatedProgress = {...newLevelProgress, ...accumulatedProgress}
        })

        return [newGameState, accumulatedProgress]
    },
    initialState: state
}