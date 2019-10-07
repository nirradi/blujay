import React from 'react';
import App from '../App';
import {run} from './helpers'
import { mount} from 'enzyme';


describe ( 'level0', () => {

    const div = document.createElement('div');
    window.domNode = div;
    document.body.appendChild(div);

    const wrapper = mount(<App/>,{ attachTo: window.domNode });
    run (wrapper, ['levelme level1'])

    it('triggers defobbing', () => {
        
        run (wrapper, [
            'disktools',
            'defob 13 2',
        ])
    
        expect(wrapper.state().currentLevelProgress["defobbed"]).toBe(true)
    
    });


   
})
