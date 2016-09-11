import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Button from './../src/components/Button';

describe('<Button>', () => {
  it('Should be element type button', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(ReactDOM.findDOMNode(instance).nodeName).equal('A');
  });

  it('Should be all default props correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Button />
    );

    expect(instance.props.title).equal('');
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
    let instance = ReactTestUtils.renderIntoDocument(
      <Button title='Add new item'/>
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    console.log(el.textContent);
    expect(el.textContent).not.equal('');
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

  it('Should be capture onClick event on TRASH button', (done) => {
    let onClick = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <Button type={Button.EDIT} onClick={onClick}/>
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });
});
