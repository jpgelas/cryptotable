import React from 'react'
import { Jumbotron } from 'react-bootstrap';

class CryptoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { global: {} };
  }

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/global/")
      .then(function(response) {
        return response.json();
      })
      .then(item => this.setState({ global : item })); 
  }
  
  render() {
    const global = this.state.global;
    return ( 
      <Jumbotron>
      <h1>CryptoTable</h1>
      <p>
        <b>Marketcap :</b> ${parseInt(global['total_market_cap_usd']).toLocaleString('EN-us')}<br/>
        <b>24h Vol :</b> ${parseFloat(global['total_24h_volume_usd']).toLocaleString('EN-us')} <br /> 
        <b>BTC Dominance :</b> {global['bitcoin_percentage_of_market_cap']}%

      </p>
      </Jumbotron>
    );
  }
}

export default CryptoHeader

// {
//   "total_market_cap_usd": 335663109255.0, 
//   "total_24h_volume_usd": 68886653459.0, 
//   "bitcoin_percentage_of_market_cap": 59.25, 
//   "active_currencies": 887, 
//   "active_assets": 1360, 
//   "active_markets": 19005, 
//   "last_updated": 1561325548
// }
