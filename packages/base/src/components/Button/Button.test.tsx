import React from 'react';
import { configure, mount } from 'enzyme';
import { ButtonBase } from './Button.base';
import { IButton } from './Button.types';

// TODO: Need to move this to some global configuration.
const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('ButtonBase', () => {
  it('focuses correctly when focus is triggered via IButton interface', () => {
    const button1 = React.createRef<IButton>();
    const button2 = React.createRef<IButton>();
    const button3 = React.createRef<IButton>();

    const wrapper = mount(
      <div>
        <ButtonBase componentRef={button1}>Button 1</ButtonBase>
        <ButtonBase componentRef={button2}>Button 2</ButtonBase>
        <ButtonBase componentRef={button3}>Button 3</ButtonBase>
      </div>
    );

    const buttons = wrapper.getDOMNode().querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toEqual(3);

    button1.current!.focus();
    expect(document.activeElement!).toBe(buttons[0]);

    button2.current!.focus();
    expect(document.activeElement!).toBe(buttons[1]);

    button3.current!.focus();
    expect(document.activeElement!).toBe(buttons[2]);
  });
});