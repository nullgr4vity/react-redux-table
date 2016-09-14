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

  it('Should capture onAddRow event', (done) => {
    let onClick = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={true} onAddRow={onClick}/>
      </Provider>
    );

    const btns = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
    // there is 1 + 2 * rows buttons in whole component
    // btns[0] => 'add new item' button
    ReactTestUtils.Simulate.click(btns[0]); 
  });

  it('Should capture onEditRow event', (done) => {
    let onClick = (rowId) => {
      expect(rowId).equal(0);
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={true} onEditRow={onClick}/>
      </Provider>
    );

    const btns = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
    // there is 1 + 2 * rows buttons in whole component
    // btns[1] => first row, trash button
    ReactTestUtils.Simulate.click(btns[1]); 
  });

  it('Should capture onDeleteRow event', (done) => {
    let onClick = (rowId) => {
      expect(rowId).equal(0);
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={true} onDeleteRow={onClick}/>
      </Provider>
    );

    const btns = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
    // there is 1 + 2 * rows buttons in whole component
    // btns[2] => first row, trash button
    ReactTestUtils.Simulate.click(btns[2]); 
  });

  it('Should capture onSelectRow event', (done) => {
    let onClick = (rowId) => {
      expect(rowId).equal(5);
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Table tools={true} onSelectRow={onClick}/>
      </Provider>
    );

    const rows = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr');
    // no header provided to the table so row 5 is 5
    ReactTestUtils.Simulate.click(rows[5]); 
  });    

});
