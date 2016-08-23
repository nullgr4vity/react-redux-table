import React from 'react';
import ReactDOM from 'react-dom';
import Table from './../src/Table';

let data = [];
for (let r = 0; r < 100; r++) {
  let row = [];
  for (let c = 0; c < 10; c++) {
    row.push(`data-${r}-${c}`);
  }
  data.push(row);
}

let header = [];
for (let c = 0; c < 10; c++) {
  header.push(`header-${c}`);
}

ReactDOM.render(<Table data={data} header={header} page={0} />, document.getElementById('table'));
