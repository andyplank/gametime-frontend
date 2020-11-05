import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from 'react-bootstrap/Modal';
import TeamManagementContent from './TeamManagementContent';

Enzyme.configure({ adapter: new Adapter() });

describe('<TeamManagementContent />', () => {
  const dispatchTeamEdit = jest.fn();
    const wrapper = Enzyme.mount(
      <TeamManagementContent dispatchTeamEdit={dispatchTeamEdit} teamId='1' playerId='1' />
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