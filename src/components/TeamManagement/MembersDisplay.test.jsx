import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MembersDisplay from './MembersDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('<MembersDisplay />', () => {
  const testMembers = [
    { userID: 1, firstName: 'Collin', lastName: 'Li' },
    { userID: 1, firstName: 'Jon', lastName: 'Huber' },
    { userID: 1, firstName: 'Raymond', lastName: 'Truong' },
    { userID: 1, firstName: 'Andy', lastName: 'Plank' },
  ];
  const wrapper = Enzyme.shallow(
    <MembersDisplay members={testMembers} />,
  );

  it('clicking item should set to on', () => {
    wrapper.instance().handleAdminChange = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find('.adminSwitch').at(0).simulate('change', { target: { value: true } });
    expect(wrapper.instance().handleAdminChange).toHaveBeenCalled();
  });

  it('item should be on when clicked', () => {
    wrapper.instance().forceUpdate();
    wrapper.update();
    const item = wrapper.find('.adminSwitch').at(0);
    expect(item.prop('checked')).toBe(true);
  });
});
