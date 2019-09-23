import level0 from './level0'

let levels = {
    level0
}

export const levelFnc = (level) => (levels[level].fnc)
export const initialLevelState = (level) => (levels[level].initialState)