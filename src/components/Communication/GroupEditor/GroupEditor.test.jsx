import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GroupEditor from './GroupEditor';

Enzyme.configure({ adapter: new Adapter() });

describe('<ListDisplay />', () => {
  const testMembers = [{ name: 'Andy', id: '1' }, { name: 'Jim', id: '2' }, { name: 'Daniel', id: '3' }, { name: 'Jon', id: '4' }];
  const setEditorVis = jest.fn();
  const wrapper = Enzyme.shallow(
    <GroupEditor
      editorVis
      setEditorVis={setEditorVis}
      members={testMembers}
    />,
  );

  it('clicking close button closes the editor', () => {
    wrapper.find('#closeGroupEditor').simulate('click');
    expect(setEditorVis).toHaveBeenCalledWith(false);
  });

  it('clicking save button disables the button', () => {
    let submitBtn = wrapper.find('#submitGroupEditor');
    expect(submitBtn.prop('disabled')).toBe(false);
    submitBtn.simulate('click');
    submitBtn = wrapper.find('#submitGroupEditor');
    expect(submitBtn.prop('disabled')).toBe(true);
  });
});
