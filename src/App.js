import React, { Component } from 'react';
import Terminal from './GameEngine/Framework/Terminal'
import {initialState} from './GameEngine/Applications/shell'
import applications from './GameEngine/Applications/applications'
// import level0 from './Levels/level0'
import './Style/main.scss'
class App extends Component {

    constructor() {
        super();

        let gameState = {
            currentApp: initialState,
        }

        this.state = gameState
      
        this.onEnter = this.onEnter.bind(this)
    }

    onEnter(cmd, args) {
        let newAppState = applications(this.state.currentApp.fnc)(cmd, args, this.state.currentApp)
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