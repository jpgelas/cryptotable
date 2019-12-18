import React, {useState, useEffect} from 'react'
import { Jumbotron, Button, Spinner } from 'react-bootstrap';

function CryptoHeader ( props ) {

  const [ global, setGlobal ] = useState({}); 
  const [ isLoading, setIsLoading ] = useState(false);  

  useEffect(() => {
    //document.title = isLoading ? "Loading..." : "Crypto";
    fetchGlobal()
  }, []);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchGlobal() {
    setIsLoading(true);
    document.title =  "Loading..." 
    await sleep(1000) // Fake response time...
    console.log('Fetch global')
    const response = await fetch("https://api.coinmarketcap.com/v1/global/");
    const data = await response.json()
    setGlobal( data )
    setIsLoading(false)
    document.title =  "Crypto" 
  }
  
  function spinnerButton() {
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

  function updateButton() {
    return (
      <Button variant="warning" size="sm" onClick={
        () => { 
          props.onClickForceUpdate(); // call handleClickForceUpdate() of CryptoMonitor component
          fetchGlobal()
        }
      }>Update</Button>
    )
  }
  
  console.log('global = ', global);
  
  return ( 
      <Jumbotron className="bg-dark text-white">
        <h1>CryptoTable</h1>
        <p>
          <b>Marketcap :</b> ${parseInt(global['total_market_cap_usd']).toLocaleString('EN-us')}<br/>
          <b>24h Vol :</b> ${parseFloat(global['total_24h_volume_usd']).toLocaleString('EN-us')}<br /> 
          <b>BTC Dominance :</b> {global['bitcoin_percentage_of_market_cap']}%
        </p>
        { 
          isLoading ? spinnerButton() : updateButton() 
        }
      </Jumbotron>
  );
  
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
