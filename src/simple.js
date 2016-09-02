import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Table from './../src/components/Table';
import { configureStore } from './store';

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

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Table data={data} header={header} page={0} />
  </Provider>,
  document.getElementById('table'));
