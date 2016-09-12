import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import FilterInput from './../../src/components/FilterInput';

describe('<FilterInput>', () => {
  it('Should be correct element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FilterInput />
    );

    let el = ReactDOM.findDOMNode(instance);
    expect(el.nodeName).equal('INPUT');
  });

  it('Should call onKeyUp with current content', (done) => {
    let onKeyUp = (value) => {
      // ReactTestUtils doesn't change input value on keyDown or keyUp
      // so we can test only event fire 
      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <FilterInput onKeyUp={onKeyUp} />
    );

    let el = ReactDOM.findDOMNode(instance);
    ReactTestUtils.Simulate.keyUp(el, {key: 'a', keyCode: 65, which: 65});
  });  
});
