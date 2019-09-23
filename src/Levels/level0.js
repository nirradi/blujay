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

export default {
    fnc: (gameState) => {
        console.log("level0", gameState)
        return gameState
    },
    initialState: {
        ...initialState, 
        emailState, 
        fs: root
    }
}