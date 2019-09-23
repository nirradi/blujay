import React, { Component } from 'react';
import Terminal from './GameEngine/Framework/Terminal'
import applications from './GameEngine/Applications/applications'
import {levelFnc, initialLevelState} from './Levels'
import './Style/main.scss'
class App extends Component {

    constructor() {
        super();

        this.state = {
            currentApp: initialLevelState('level0'),
            currentLevel: 'level0'
        }
      
        this.onEnter = this.onEnter.bind(this)
    }

    onEnter(cmd, args) {
        let newAppState = applications(this.state.currentApp.fnc)(cmd, args, this.state.currentApp)
        newAppState = levelFnc(this.state.currentLevel)(newAppState)
        this.setState({
            currentApp: newAppState
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