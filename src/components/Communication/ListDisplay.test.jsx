import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListDisplay from './ListDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('<ListDisplay />', () => {
  const testMembers = [{ name: 'Andy', id: '1' }, { name: 'Jim', id: '2' }, { name: 'Daniel', id: '3' }, { name: 'Jon', id: '4' }];
  const clickFn = jest.fn();
  const wrapper = Enzyme.shallow(
    <ListDisplay
      items={testMembers}
      selected={testMembers[0]}
      setSelected={clickFn}
    />,
  );

  it('clicking item should set selected', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });

  it('item should be highlighted when selected', () => {
    const item = wrapper.find('button').at(0);
    expect(item.hasClass('selected')).toBe(true);
    expect(item.hasClass('click')).toBe(false);
  });

  it('item shouldnt be highlighted when not selected', () => {
    const items = wrapper.find('button').slice(1);
    items.forEach((item) => {
      expect(item.hasClass('selected')).toBe(false);
      expect(item.hasClass('click')).toBe(true);
    });
  });
});
