import React from 'react';
import { configure, mount } from 'enzyme';
import { LinkBase } from './Link.base';

// TODO: Need to move this to some global configuration.
const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('LinkBase', () => {
  it('focuses correctly when focus is triggered via ILink interface', () => {
    const link1 = React.createRef<HTMLElement>();
    const link2 = React.createRef<HTMLElement>();
    const link3 = React.createRef<HTMLElement>();

    const wrapper = mount(
      <div>
        <LinkBase ref={link1} href="#">Link 1</LinkBase>
        <LinkBase ref={link2} href="#">Link 2</LinkBase>
        <LinkBase ref={link3}>Link 3</LinkBase>
      </div>
    );

    const anchors = wrapper.getDOMNode().querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    const buttons = wrapper.getDOMNode().querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(anchors.length).toEqual(2);
    expect(buttons.length).toEqual(1);

    link1.current!.focus();
    expect(document.activeElement!).toBe(anchors[0]);

    link2.current!.focus();
    expect(document.activeElement!).toBe(anchors[1]);

    link3.current!.focus();
    expect(document.activeElement!).toBe(buttons[0]);
  });
});