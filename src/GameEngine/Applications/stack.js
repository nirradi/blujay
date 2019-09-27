import {getRunFunc, getInitFunc} from './applications'

export const run = (cmd, args, state) => {
    return getRunFunc(state.stack[0])(cmd, args, state)
}

export const pop = (state, args) => {
    let newState = {...state, stack: [...state.stack.slice(1)]}
    return getInitFunc(newState.stack[0])(newState, args)
}

export const push = (state, nextApp, args) => {
    let newState = {...state, stack: [nextApp, ...state.stack] }
    return getInitFunc(newState.stack[0])(newState, args)
}
