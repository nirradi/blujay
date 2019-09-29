import keycode from 'keycode'

export const put = (wrapper, text) => {
    let input = wrapper.find('input')
    input.simulate('change', { target: { value: text} });
    input.simulate('keydown', { keyCode: keycode('enter') });
}

export const run = (wrapper, steps) => {

    steps.forEach( (step) => {
        put(wrapper, step)
    })
}

export const levelProgressHas = (state, field) => {
    expect(state.levelProgress).to.have.property(field) && expect(state.levelProgress[field]).to.be.true
}