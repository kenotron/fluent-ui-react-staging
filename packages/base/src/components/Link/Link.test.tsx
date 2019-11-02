import React from 'react';
import { configure, mount } from 'enzyme';
import { LinkBase } from './Link.base';
import { ILink } from './Link.types';

// TODO: Need to move this to some global configuration.
const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('LinkBase', () => {
  it('focuses correctly when focus is triggered via ILink interface', () => {
    const link1 = React.createRef<ILink>();
    const link2 = React.createRef<ILink>();
    const link3 = React.createRef<ILink>();

    const wrapper = mount(
      <div>
        <LinkBase componentRef={link1} href="#">Link 1</LinkBase>
        <LinkBase componentRef={link2} href="#">Link 2</LinkBase>
        <LinkBase componentRef={link3}>Link 3</LinkBase>
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