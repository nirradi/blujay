import prompt from './prompt'
import echo from './echo'

export const dataRecover = prompt((cmd, args, state) =>  {
    return echo("disk recovery tool", state)
})

export const onDataRecoverStart = (state, args) => {
    return state
}