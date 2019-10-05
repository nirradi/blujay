import level0 from './level0'
import level1 from './level1'
let levels = {
    level0, 
    level1
}

export const levelFnc = (level) => {
    return (gameState, levelProgress) => {
        let newGameState = gameState
        let accumulatedProgress = levelProgress
        for (let trigger of levels[level].triggers) {
            let newLevelProgress
            [newGameState, newLevelProgress] = trigger(newGameState, levelProgress)
            if (newLevelProgress.currentLevel !== level) {
                accumulatedProgress = newLevelProgress
                break
            }

            accumulatedProgress = {...newLevelProgress, ...accumulatedProgress}
        }

        return [newGameState, accumulatedProgress]
    }
}

export const initialLevelState = (level) => (levels[level].initialState)

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) 
    {
        Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
            if (!(key in target))
            Object.assign(output, { [key]: source[key] });
            else
            output[key] = mergeDeep(target[key], source[key]);
        } else {
            Object.assign(output, { [key]: source[key] });
        }
        });
    }
    return output;
}

export const levelUp = (state, nextLevel) => {
    let newState = mergeDeep(state, initialLevelState(nextLevel))
    let newLevelProgress = { currentLevel: nextLevel }
    return [newState, newLevelProgress]
}