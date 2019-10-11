import React from 'react'
import {addItem} from '../GameEngine/Applications/fs'
import {initialState as shellState} from '../GameEngine/Applications/shell'
import {initialState as emailState} from '../GameEngine/Applications/email'
import {addEmail, sendEmails} from '../GameEngine/Applications/email'
import {push as pushToStack} from '../GameEngine/Applications/stack'
import {levelUp} from './index'
import {defer} from '../GameEngine/Framework/defer'
import echo from '../GameEngine/Applications/echo'
import moment from 'moment'


let welcomeMessage = [
    "BluJay OS started",
    "-----------------",
    "drivers: .....ok",
    "hardware: ......ok",
    "network: ......ok",
    <p className='blinking'>WARNING: email server is not up-to-date! Please contact your system administrator</p>,
    "All systems nominal",
    "-----------------",
    "type `help` for possible commands",
]

let state = {
    shellState: { 
        ...shellState,
        availableApps: ['email']
    },
    emailState, 
    output: welcomeMessage,
    stack: [],
    defferedActions: []
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
    content: "You haven't been around the office, send me an email when you see this, I need your help with something really important",
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

                gameState = defer(gameState, (state) => {
                    state = addEmail({...state}, {
                        from: ITfriend,
                        to: 'me',
                        subject: 'so you went home.....',
                        content: "I'm glad to see that you're back reading emails. I can't really read what you wrote, it looks like random bits on this end. I'm assuming you haven't updated your email server yet, so your encryption engine is out dated. send me your NetLoc number and I'll fix it from here",
                        labels: ['unread', 'inbox'],
                        sent: moment().format()
                    })

                    state = echo("New Mail!", state)
                    return state

                }, 3)


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
                    content: "if you tried to send me the netloc #, then obviously you can't because the mail is still encrypted, so is the subject. That's going to be a problem :( I'll try to find your netloc# here somewhere while you try to figure out a way around the encryption.",
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
                    content: "I got your netloc number! How did you think of that!? \nlisten, I need your help with something ummm sensitive. Its about that jerk from accounting, Rich. I think he stole money from the company and I can prove it. I'll send you an email in a few seconds with more details after I update your email client",
                    labels: ['unread', 'inbox'],
                    sent: moment().format()
                })

                levelProgress = {
                    ...levelProgress,
                    emailUnencrypted: true,
                    currentLevel: 'level1'
                }

                return levelUp(gameState, 'level1')
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

        return [gameState, levelProgress]
    },

    (gameState, levelProgress) => {
        return [sendEmails(gameState, (contacts)), levelProgress]
    }
  
]

state = pushToStack(state, 'shell')

export default {
    triggers: triggers,
    initialState: state
}