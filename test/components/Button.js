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
    expect(el.nodeName).equal('BUTTON');
  });

  it('Should default prop className be correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(instance.props.className).equal(Button.DEFAULT);
  });  

  it('Should default prop label be correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(instance.props.label).equal('');
  });

  it('Should be "trash" button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button icon={Button.TRASH} />
    );

    expect(instance.props.icon).equal(Button.TRASH);

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');    
    expect(el.getAttribute('class')).contain('glyphicon');
    expect(el.getAttribute('class')).contain('glyphicon-trash');
  });

  it('Should be "edit" button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button icon={Button.EDIT} />
    );

    expect(instance.props.icon).equal(Button.EDIT);

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    expect(el.getAttribute('class')).contain('glyphicon');
    expect(el.getAttribute('class')).contain('glyphicon-pencil');
  });    

  it('Should be labeled button', () => {
    const label = 'Add new item';

    let instance = ReactTestUtils.renderIntoDocument(
      <Button label={label} />
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    expect(el.textContent).equal(label);
  });  

  it('Should be labeled + icon button', () => {
    const label = 'Add new item';

    let instance = ReactTestUtils.renderIntoDocument(
      <Button label={label} icon={Button.EDIT} />      
    );

    const spans = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'span');
    expect(spans[0].textContent).equal(label);
    expect(spans[1].getAttribute('class')).contain('glyphicon');
    expect(spans[1].getAttribute('class')).contain('glyphicon-pencil');
  });  

  it('Should be capture onClick event on button', (done) => {
    let onClick = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Button icon={Button.TRASH} onClick={onClick}/>
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

});
