import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from '@material-ui/core/Switch';
import PlayersDisplay from './PlayersDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('<PlayersDisplay />', () => {
  const testPlayers = [
    { userID: 1, firstName: 'Collin', lastName: 'Li' },
    { userID: 2, firstName: 'Jon', lastName: 'Huber' },
    { userID: 3, firstName: 'Raymond', lastName: 'Truong' },
    { userID: 4, firstName: 'Andy', lastName: 'Plank' },
  ];
  const refresh = jest.fn();
  const wrapper = Enzyme.shallow(
    <PlayersDisplay team_id='1' players={testPlayers} refresh={refresh} />,
  );

  it('clicking item should call the handler', () => {
    wrapper.instance().handleAdminChange = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.update();
    wrapper.find(Switch).at(0).simulate('change', { target: { checked: true } });
    expect(wrapper.instance().handleAdminChange).toHaveBeenCalled();
  });

  it('All switches are off by default', () => {
    const items = wrapper.find(Switch);
    items.forEach((item) => {
      expect(item.props().checked).toBe(false);
    })
  });
});
