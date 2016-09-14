import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Button from './../../src/components/Button';
import { BUTTON_WARNING_LABEL_MISSING } from './../../src/components/Button';

describe('<Button>', () => {
  it('Should be element type button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    let el = ReactDOM.findDOMNode(instance);
    expect(el.nodeName).equal('A');
  });

  it('Should default prop type be correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(instance.props.type).equal(Button.DEFAULT);
  });  

  it('Should default prop title be correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(instance.props.title).equal(BUTTON_WARNING_LABEL_MISSING);
  });

    it('Should default prop class be correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(instance.props.cn).equal(' btn-default');
  });

  it('Should be "trash" button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button type={Button.TRASH} />
    );

    expect(instance.props.type).equal(Button.TRASH);

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');    
    expect(el.getAttribute('class')).contain('glyphicon');
    expect(el.getAttribute('class')).contain('glyphicon-trash');
  });

  it('Should be "edit" button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button type={Button.EDIT} />
    );

    expect(instance.props.type).equal(Button.EDIT);

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    expect(el.getAttribute('class')).contain('glyphicon');
    expect(el.getAttribute('class')).contain('glyphicon-pencil');
  });    

  it('Should be "new item" button', () => {
    const label = 'Add new item';

    let instance = ReactTestUtils.renderIntoDocument(
      <Button title={label} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    expect(el.textContent).equal(label);
  });  

  it('Should be capture onClick event on TRASH button', (done) => {
    let onClick = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Button type={Button.TRASH} onClick={onClick}/>
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

});
