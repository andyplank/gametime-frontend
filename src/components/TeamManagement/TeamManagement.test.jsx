import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from 'react-bootstrap/Modal';
import TeamManagement from './TeamManagement';

Enzyme.configure({ adapter: new Adapter() });

describe('<TeamManagement />', () => {
    const wrapper = Enzyme.shallow(
      <TeamManagement />,
    );

    it('clicking edit team opens edit modal', () => {
       wrapper.find('.btn-team').at(0).simulate('click');
       wrapper.update();
       expect(wrapper.find(Modal).at(0).prop('show')).toBe(true);
    });

    it('clicking invite link btn opens invite link modal', () => {
        wrapper.find('.btn-team').at(1).simulate('click');
        wrapper.update();
        expect(wrapper.find(Modal).at(0).prop('show')).toBe(true);
     });
});