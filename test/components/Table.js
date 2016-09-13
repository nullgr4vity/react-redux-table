import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { Provider } from 'react-redux';
import Table from './../../src/components/Table';

const storeFake = (state) => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => (state)
});

describe('<Table>', () => {
  let store;

  beforeEach(() => {
    let data = [0,1,2,3,4,5,6,7,8,9].map( (index) => { return [`data-${index}`]; });
    store = storeFake({ table: { data }});

  });

  it('should have correct structure without header', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={false} />
      </Provider>
    );

    const rows = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr');
    assert.equal(rows.length, 10);
  });

  it('should have correct structure with header', () => {
    store.getState().table.header = [`header-1`];

    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={false} />
      </Provider>
    );

    const rows = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr');
    assert.equal(rows.length, 11); // 10 rows + 1 header
  });

  it('should have correct structure with toolbox column', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={true} />
      </Provider>
    );

    const rows = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'td');
    assert.equal(rows.length, 20); // 2 (cols) x 10 (rows)
  });

});