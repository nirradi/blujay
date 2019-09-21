import React, { Component } from 'react';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import './Terminal.scss'

class Terminal extends Component {
    componentDidUpdate() {
        var out = document.getElementById("terminal");
        out.scrollTop = out.scrollHeight - out.clientHeight; 
    }
    
    render() {
        
        return (
            <div id="terminal">
				<TerminalOutput value={this.props.output}/>
				<TerminalInput 
					prompt={this.props.prompt}
					disabled={this.props.inputDisabled} 
					inputValue={this.props.inputValue} 
					onEnter={this.props.inputEntered} 
					availableCommands={this.props.availableCommands}
				/>
			</div>
        );
    }
}

Terminal.defaultProps = {
	output: ['[no output]'],
	availableCommands: {'abc' : 123},
	inputEntered: () => {},
	inputDisabled: false,
	prompt: ">",
	
}

export default Terminal;