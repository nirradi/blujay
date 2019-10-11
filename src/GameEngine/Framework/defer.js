export const actionLoop = (state) => {

    let actions = [...state.defferedActions]
    actions.forEach( (defered) => {
        if (defered.time === 0) {
            state = defered.func(state)
        }
    })

    return {
        ...state,  
        defferedActions: state.defferedActions.filter( (defered) => (defered.time >= 0) ).map( (defered) => ( {...defered, time: defered.time - 1} ) )
    }
}

export const defer = (state, func, time) => {
    return {
        ...state,
        defferedActions: [...state.defferedActions, { func, time }]
    }
}