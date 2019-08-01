import React from 'react';
import ReactDOM from 'react-dom';
import CryptoTable from './CryptoTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CryptoTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
