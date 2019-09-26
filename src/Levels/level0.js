import {addItem} from '../GameEngine/Applications/fs'
import {initialState} from '../GameEngine/Applications/shell'
import {addEmail, sendEmails} from '../GameEngine/Applications/email'
import moment from 'moment'

let root = initialState.fs
root = addItem(root, '/README', 'file', 'this is the first file')
root = addItem(root, '/subdir', 'directory')
root = addItem(root, '/subdir/README', 'file', 'this is the second file')

let emailState = initialState.emailState
const ITfriend = 'Lisa Vanderblit'
let contacts = [ITfriend]

emailState = addEmail(emailState, {
    from: ITfriend,
    to: 'me',
    subject: 'hey where are you?',
    content: "You haven't been around the office, send me an email when you see this",
    labels: ['unread', 'inbox'],
    sent: moment().startOf('day')
})  


const outboxContainsEmailTo = (state, to) => {
    if (!state.emails)
        return false

    let foundEmails = state.emails.filter( (email) => {
        return (email.labels.includes('outbox') && email.to.toLowerCase() === to.toLowerCase())
    })

    return foundEmails.length > 0
    
}

let triggers = [

    (gameState, levelProgress) => {
        if (!levelProgress.sentFirstEmail && gameState.fnc === 'email') {

            if (outboxContainsEmailTo(gameState, ITfriend)) {
                gameState = addEmail({...gameState}, {
                    from: ITfriend,
                    to: 'me',
                    subject: 'so you went home.....',
                    content: "I'm glad to see you back reading emails. I can't really read what you wrote its all garbage, you haven't updated your email server yet, so your encryption engine is out dated. send me your NetLoc number and I'll fix it from here",
                    labels: ['unread', 'inbox'],
                    sent: moment()
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
        if (levelProgress.sentFirstEmail && !levelProgress.sendSecondEmail && gameState.fnc === 'email') {

            if (outboxContainsEmailTo(gameState, ITfriend)) {
                gameState = addEmail({...gameState}, {
                    from: ITfriend,
                    to: 'me',
                    subject: 'nice try',
                    content: "if you tried to send me the netloc #, then obviously you can't because the mail is still encrypted, so is the subject for that fact. That's going to be a problem!? I'll try to find your netloc# here somewhere while you try to figure out a way around the encryption.",
                    labels: ['unread', 'inbox'],
                    sent: moment()
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
        return [sendEmails(gameState, (contacts)), levelProgress]
    }
  
]

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
    initialState: {
        ...initialState, 
        emailState, 
        fs: root
    }
}