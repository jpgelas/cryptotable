import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import CryptoHeader from './CryptoHeader';
import CryptoTable from './CryptoTable';

import * as serviceWorker from './serviceWorker';

 const symbolList = ['BTC', 'ETH',  'BCH', 'LTC', 'XRP', 'XLM', 
'ADA', 'EOS', 'XMR', 'TRX', 'MIOTA', 'DASH', 'BNB', 'NEO', 'XEM', 
'ZRX', 'BAT',]

ReactDOM.render(
    <div>
        <CryptoHeader />
        <CryptoTable symbolList={symbolList} />
    </div>, document.getElementById('root'));
//ReactDOM.render(<CryptoTable symbolList={symbolList} />, document.getElementById('root'));

//

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
