export default (text, state) => {
    let arrayText = Array.isArray(text) ? text : [text]
    return Object.assign({}, state, {
        output: [...state.output, ...arrayText]
    })
}

