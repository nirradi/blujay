import React, { Component } from 'react';
import Terminal from './GameEngine/Framework/Terminal'
import {run} from './GameEngine/Applications/stack'
import {levelFnc, initialLevelState} from './Levels'
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
    }

    onEnter(cmd, args) {
        let newAppState = run(cmd, args, this.state.currentApp)
        const [finalAppState, levelProgress] = levelFnc(this.state.currentLevelProgress.currentLevel)(newAppState, this.state.currentLevelProgress)
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