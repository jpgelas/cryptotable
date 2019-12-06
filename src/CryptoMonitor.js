import React from 'react';
//import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import CryptoHeader from './CryptoHeader';
import CryptoTable from './CryptoTable';

const symbolList =  [   
                        'BTC', 'ETH',  'BCH', 'LTC', 'XRP', 'XLM', 
                        'ADA', 'EOS', 'XMR', 'TRX', 'DASH', 
                        'BNB', 'NEO', 'XEM', 'ZRX', 'BAT',
                    ]

class CryptoMonitor extends React.Component {  

    constructor(props) {
        super(props);
        this.state = { 
            update : true, 
        }
    }    
    
    componentDidMount() {}

    handleClickForceUpdate() {
        this.setState({update: true })
    }

    resetUpdate = () => {
        this.setState( { update : false } )
    }

    render() {
        return (
            <div>
                <CryptoHeader   update={this.state.update} 
                                onClickForceUpdate={() => this.handleClickForceUpdate()} />

                <CryptoTable    symbolList={symbolList} 
                                update={this.state.update}  
                                resetUpdate={()=> this.resetUpdate()} />   
            </div>
        )
    }
}

export default CryptoMonitor;