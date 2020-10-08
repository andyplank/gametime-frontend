import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from '@material-ui/core/Switch';
import MembersDisplay from './MembersDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('<MembersDisplay />', () => {
  const testMembers = [
    { userID: 1, firstName: 'Collin', lastName: 'Li' },
    { userID: 1, firstName: 'Jon', lastName: 'Huber' },
    { userID: 1, firstName: 'Raymond', lastName: 'Truong' },
    { userID: 1, firstName: 'Andy', lastName: 'Plank' },
  ];
  const wrapper = Enzyme.mount(
    <MembersDisplay members={testMembers} />,
  );

  it('clicking item should call the handler', () => {
    wrapper.instance().handleAdminChange = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find(Switch).at(0).simulate('change', { target: { checked: true } });
    expect(wrapper.instance().handleAdminChange).toHaveBeenCalled();
  });

  it('item should be on when clicked', () => {
    const item = wrapper.find(Switch).at(0);
    expect(item('checkbox')).to.have.property('checked', true);
  });
});
