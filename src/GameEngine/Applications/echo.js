export default (text, state) => {
    let arrayText = Array.isArray(text) ? text : [text]
    return Object.assign({}, state, {
        output: [...state.output, ...arrayText]
    })
}

export const prettify = (obj, fields) => {
    let result = ""
    fields.forEach( (field) => {
        result += `${field}: ${obj[field.toLowerCase().replace(/\s/g,'')]}\n`
    })

    return result
}