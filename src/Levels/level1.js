export default {
    fnc: (gameState, levelProgress) => {
        return [gameState, levelProgress]
    },
    initialState: {
        emailState: {
            contacts: [
                {
                    name: 'Lisa Vanderblit'
                }
            ]
        }
    }
}