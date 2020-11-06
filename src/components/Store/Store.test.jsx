import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import Store from './Store';

Enzyme.configure({ adapter: new Adapter() });

describe('<Store />', () => {
  
  it('No items will display for an empty store', () => {
    const wrapper = Enzyme.shallow(
      <MemoryRouter initialEntries={[ '/team/1/store' ]}>
        <Store />
      </MemoryRouter>,
    );
  
    expect(wrapper.find('#no-items')).toBeTruthy();
  });

  it('Error message when item not found', () => {
    const wrapper = Enzyme.shallow(
      <MemoryRouter initialEntries={[ '/team/1/store/item/1' ]}>
        <Store />
      </MemoryRouter>,
    );
  
    expect(wrapper.find('#item-not-found')).toBeTruthy();
  });

  it('Error message when there is an empty cart', () => {
    const wrapper = Enzyme.shallow(
      <MemoryRouter initialEntries={[ '/team/1/store/cart' ]}>
        <Store />
      </MemoryRouter>,
    );
  
    expect(wrapper.find('#empty-cart')).toBeTruthy();
  });

  it('Error message when you check out an empty cart', () => {
    const wrapper = Enzyme.shallow(
      <MemoryRouter initialEntries={[ '/team/1/store/checkout' ]}>
        <Store />
      </MemoryRouter>,
    );
  
    expect(wrapper.find('#empty-cart')).toBeTruthy();
  });

});
