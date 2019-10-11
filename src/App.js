import React, { Component } from 'react';
import Terminal from './GameEngine/Framework/Terminal'
import {run} from './GameEngine/Applications/stack'
import {levelFnc, initialLevelState, levelUp} from './Levels'
import {actionLoop} from './GameEngine/Framework/defer'
import './Style/main.scss'
class App extends Component {

    constructor() {
        super();

        this.state = {
            currentApp: initialLevelState('level0'),
            currentLevelProgress: {
                currentLevel: 'level0'
            }
        }
      
        this.onEnter = this.onEnter.bind(this)

        setInterval( () => {
            let newState = this.state.currentApp
            
            this.setState({ currentApp: actionLoop(newState) })

        }, 1000);

    }

    onEnter(cmd, args) {
        cmd = cmd.toLowerCase()
        args = args.map( (arg) => (arg.toLowerCase()))
        let newAppState = run(cmd, args, this.state.currentApp)
        var [finalAppState, levelProgress] = levelFnc(this.state.currentLevelProgress.currentLevel)(newAppState, this.state.currentLevelProgress)

        if (cmd === 'levelme') {
            [finalAppState, levelProgress] = levelUp(finalAppState, args[0])
        }

        this.setState({
            currentApp: finalAppState,
            currentLevelProgress: levelProgress
        })
    }

    render() {
        let currentApp = this.state.currentApp
        return (
            <Terminal availableCommands={currentApp.availableCommands} inputEntered={this.onEnter} output={currentApp.output} prompt={currentApp.prompt}/>
        );
    }
}

export default App