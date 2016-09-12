import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Pagination from './../src/components/Pagination';

describe('<Pagination>', () => {

  it('should show the correct active button (without prev & next)', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        size={5}
        items={5}
        active={3}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    assert.equal(pageButtons.length, 5);
    console.log(pageButtons[2]);
    pageButtons[3].className.should.match(/\bactive\b/);
  })

  it('should show the correct active button (with prev and next)', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination
        size={5}
        items={10}
        active={3}
      />
    );
    const pageButtons = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
    assert.equal(pageButtons.length, 7);
    pageButtons[3].className.should.match(/\bactive\b/);
  })

  it('should call onChange when page is selected', (done) => {
    const onChange = (index) => {
      assert.equal(index, 1);
      done();
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Pagination items={5} onChange={onChange} />
    );

    let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(items[1]);      
  });
});