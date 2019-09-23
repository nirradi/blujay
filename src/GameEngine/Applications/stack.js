export const pop = (state, currentApp) => {
    return {...state.stack[0], [currentApp+"State"]: state, stack: [...state.stack.slice(1)]}
}

export const push = (state, nextApp) => {
    return {...state[nextApp+"State"], stack: [state, ...state.stack] }
}
