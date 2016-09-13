import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import TableHeader from './../../../src/components/table/TableHeader';

describe('<TableHeader>', () => {

  it('Should default props be correct', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TableHeader />
    );

    expect(instance.props.cols).equal(undefined);
    expect(instance.props.sort).to.deep.equal({ columnIndex: -1, sortDirection: 0});
    expect(instance.props.onClick).equal(undefined);
    expect(instance.props.isToolbox).equal(true);
  });  

  it('Should build correct structure', () => {
    const labels = [0,1,2,3,4].map((value) => `th-${value}`);    
    let instance = ReactTestUtils.renderIntoDocument(
      <TableHeader cols={labels} isToolbox={false} />
    );

    const ths = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'th');
    expect(ths.length).equal(5);
  });  

});
