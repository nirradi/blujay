import echo from './echo'
export default (func) => {
    return (cmd, args, state) => {
        let prompt = [state.prompt, cmd, args].join(' ')
        return func(cmd, args, echo(prompt, state))
    }
}