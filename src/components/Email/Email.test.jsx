import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Email from './Email'

Enzyme.configure({ adapter: new Adapter() });

describe('<Email />', () => {
    const mockStore = configureStore();
    const initialState = {};
    const wrapper = Enzyme.shallow(
      <Provider store={mockStore(initialState)}>
        <Email />
      </Provider>
    );

    it('should not render', () => {
        expect(wrapper.instance() == null)
    });
});