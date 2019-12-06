import React from 'react'
import { Jumbotron, Button, Spinner, Container } from 'react-bootstrap';

class CryptoHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { global: {} };
  }

  componentDidMount() {
      this.fetchGlobal()
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  fetchGlobal() {
    this.sleep(1000).then(
      () => {
            fetch("https://api.coinmarketcap.com/v1/global/")
                  .then(function(response) {
                    return response.json();
                  })
                  .then(global => this.setState({ global })); 
    });
  }
  

  spinner() {
    return (
      <Button variant="secondary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          &nbsp;Loading...
      </Button>
    )
  }

  nospinner() {
    return (
      <Button variant="warning" size="sm" onClick={() => this.handleClick()}>Update</Button>
    )
  }

  handleClick() {
    this.props.onClickForceUpdate() // call handleClickForceUpdate() of CryptoMonitor component
    this.fetchGlobal()
  }

  render() {
    const global = this.state.global;
    
    return ( 
      <Jumbotron className="bg-dark text-white">
        <h1>CryptoTable</h1>
        <p>
          <b>Marketcap :</b> ${parseInt(global['total_market_cap_usd']).toLocaleString('EN-us')}<br/>
          <b>24h Vol :</b> ${parseFloat(global['total_24h_volume_usd']).toLocaleString('EN-us')}<br /> 
          <b>BTC Dominance :</b> {global['bitcoin_percentage_of_market_cap']}%
        </p>
        { this.props.update ? this.spinner() :  this.nospinner() }
        
      </Jumbotron>
    );
  }
}

//<Button variant="secondary" size="sm" onClick={this.props.onClick}>Update</Button>

export default CryptoHeader;

// {
//   "total_market_cap_usd": 335663109255.0, 
//   "total_24h_volume_usd": 68886653459.0, 
//   "bitcoin_percentage_of_market_cap": 59.25, 
//   "active_currencies": 887, 
//   "active_assets": 1360, 
//   "active_markets": 19005, 
//   "last_updated": 1561325548
// }
