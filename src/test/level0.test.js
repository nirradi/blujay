import React from 'react';
import App from '../App';
import {run} from './helpers'
import { mount} from 'enzyme';


describe ( 'level0', () => {

    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);

    const wrapper = mount(<App/>,{ attachTo: window.domNode });


    it('triggers first email when sending', () => {
        
        run (wrapper, [
            'email',
            'send',
            'Lisa Vanderblit',
            'abc',
            '123'
        ])
    
        expect(wrapper.state().currentLevelProgress["sentFirstEmail"]).toBe(true)
    
    });

    it('triggers second email when sending', () => {
        
        run (wrapper, [
            'send',
            'Lisa Vanderblit',
            'abc',
            '123'
        ])
        expect(wrapper.state().currentLevelProgress["sendSecondEmail"]).toBe(true)
    
    });

    it('triggers complete when currecly setting time', () => {
        
        run (wrapper, [
            'quit',
            'system config email clock',
            'time 1501 December 03, 13:34',
            'email',
            'send',
            'Lisa Vanderblit',
            'abc',
            '123'
        ])
        expect(wrapper.state().currentLevelProgress["currentLevel"]).toBe('level1')
    
    });


   
})
