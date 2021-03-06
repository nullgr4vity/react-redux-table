import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import PaginationItem from './../../src/components/PaginationItem';

describe('<PaginationItem>', () => {

  it('Should output node name LI', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.PREV_LABEL} />
    );

    expect(ReactDOM.findDOMNode(instance).nodeName).equal('LI');
  });

  it('Should output a pagination item with value content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={`test`} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    expect(el.textContent).equal('test');
  });

  it('Should output a ITEM pagination item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem status={PaginationItem.ACTIVE} />
    );

    let node = ReactDOM.findDOMNode(instance);
    expect(node.getAttribute('class')).to.contain(PaginationItem.ACTIVE);
  });

  it('Should output PREV pagination item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.PREV_LABEL} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    expect(el.textContent).equal(PaginationItem.PREV_LABEL);

    let node = ReactDOM.findDOMNode(instance);
    expect(node.getAttribute('class')).equal(PaginationItem.PLACEBO);
  });

  it('Should output NEXT pagination item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.NEXT_LABEL} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    expect(el.textContent).equal('»');

    let node = ReactDOM.findDOMNode(instance);
    expect(node.getAttribute('class')).equal(PaginationItem.PLACEBO);
  });

  it('Should output disabled NEXT pagination item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.NEXT_LABEL} status={PaginationItem.DISABLED} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    expect(el.textContent).equal(PaginationItem.NEXT_LABEL);

    let node = ReactDOM.findDOMNode(instance);
    expect(node.getAttribute('class')).to.contain(PaginationItem.DISABLED);
  });

  it('Should output disabled PREV pagination item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.PREV_LABEL} status={PaginationItem.DISABLED} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    expect(el.textContent).equal(PaginationItem.PREV_LABEL);

    let node = ReactDOM.findDOMNode(instance);
    expect(node.getAttribute('class')).to.contain(PaginationItem.DISABLED);
  });

  it('should call parent onClick with page index == 1', (done) => {
    let onClick = (pid) => {
      expect(pid).equal(1);
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem onClick={onClick} pid={1} />
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('should call parent onClick func on PREV item', (done) => {
    let onClick = (pid) => {
      expect(pid).to.not.exist;
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.PREV_LABEL} onClick={onClick} />
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('should not call parent onClick func on disabled PREV item', (done) => {
    let onClick = (pid) => {
      assert.ok(false);
      done();
    };

    setTimeout(() => {
      assert.ok(true);
      done();
    }, 500);

    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem 
        value={PaginationItem.PREV_LABEL}
        status={PaginationItem.DISABLED}
        onClick={onClick}
      />
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });


  it('should call parent onClick func on NEXT item', (done) => {
    let onClick = (pid) => {
      expect(pid).to.not.exist;
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem value={PaginationItem.NEXT_LABEL} onClick={onClick} />
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('should not call parent onClick func on disabled NEXT item', (done) => {
    let onClick = (pid) => {
      assert.ok(false);
      done();
    };

    setTimeout(() => {
      assert.ok(true);
      done();
    }, 500);

    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationItem 
        value={PaginationItem.NEXT_LABEL}
        status={PaginationItem.DISABLED}
        onClick={onClick}
      />
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

})