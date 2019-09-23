import applications from './applications'

let startApp = (state, args) => {
    if (state.onStartFnc)
        return applications(state.onStartFnc)(state, args)
    else
        return state
}

export const pop = (state, currentApp, args) => {
    let newState = {...state.stack[0], [currentApp+"State"]: state, stack: [...state.stack.slice(1)]}
    return startApp(newState, args)
}

export const push = (state, nextApp, args) => {
    let newState = {...state[nextApp+"State"], stack: [state, ...state.stack] }
    return startApp(newState, args)
}
