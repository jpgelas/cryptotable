import React from 'react';
import { Table, Spinner } from 'react-bootstrap';
import './CryptoTable.css';

class CryptoTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { tickers: [] };
    //this.handleSort = this.handleSort.bind(this)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount() {    
  }

  fetchTickers() {
    this.sleep(1000).then(
      () => {

        fetch("https://api.coinmarketcap.com/v1/ticker/?limit=50")
        .then(function(response) {
          return response.json();
        })
        .then(tickers => this.setState({ tickers }));

        // console.log("Tickers fetched :-)")
        this.props.resetUpdate()
      }
    )
     
  }

  handleSort(event, sortKey){ 
    const tickers = this.state.tickers;
    tickers.sort((a,b) => sortKey === 'rank' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey] )
    this.setState({tickers})
  }

  spinner() {
    return (  
      <div>
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }

  nospinner() {
    return (
      <div># &nbsp;</div>
    )
  }


  render() {
      const tickers = this.state.tickers;
      
      const footerStyle = {color: 'grey', 'textAlign': 'center'};
      
      const date = new Date();
      const currDate = date.toDateString();
      const currTime = date.toLocaleTimeString();

      if (this.props.update === true) { 
        this.fetchTickers()
      }

      const tableHeaders = (
        <thead>
          <tr>             
            <th className='text-warning' onClick={e => this.handleSort(e, 'rank')} 
              style={{cursor: 'pointer'}} >
              { this.props.update ? this.spinner() :  this.nospinner() }
            </th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th className='text-warning' onClick={e => this.handleSort(e, 'percent_change_1h')} style={{cursor: 'pointer'}}>% 1h</th>
            <th className='text-warning' onClick={e => this.handleSort(e, 'percent_change_24h')} style={{cursor: 'pointer'}}>% 24h</th>
            <th className='text-warning' onClick={e => this.handleSort(e, 'percent_change_7d')} style={{cursor: 'pointer'}}>% 7d</th>
          </tr>
        </thead>
      );
      
      const tableBody = (
        <tbody>
          { tickers.map(ticker => 
            {
              if(this.props.symbolList.includes(ticker['symbol']))
                return <TickerItem ticker={ticker} key={ticker['id']}/>
              else
                return undefined // or null IS IT CORRECT ???
            })
          }
          <tr><td colSpan="7" style={footerStyle}> 
            Data provided by <a href="https://coinmarketcap.com">coinmarketcap.com</a>&nbsp;-&nbsp; 
            {currDate} {currTime} </td>
          </tr>
        </tbody>
      ); 
      
      return (
        <Table striped bordered hover size="sm" variant="dark" width="100%">             
          {tableHeaders}
          {tableBody}
        </Table>
      )
  }
}

class TickerItem extends React.Component {

  render() {
    const { ticker } = this.props;
    
    const redStyle = {color: 'red'};
    const greenStyle = {color: 'green'}
    const tickerLink = "https://coinmarketcap.com/currencies/" + ticker['id']

    return (
      <tr key={ticker['id']}>
        <td> {ticker['rank']}</td>
        <td> <a href={tickerLink}>{ticker['name']}</a> </td>
        <td> {ticker['symbol']} </td>
        <td> {Number(ticker['price_usd']).toFixed(4)}</td>
        <td style={ ticker['percent_change_1h']  >= 0 ? greenStyle : redStyle }> {ticker['percent_change_1h']}</td>
        <td style={ ticker['percent_change_24h'] >= 0 ? greenStyle : redStyle }> {ticker['percent_change_24h']}</td>
        <td style={ ticker['percent_change_7d']  >= 0 ? greenStyle : redStyle }> {ticker['percent_change_7d']}</td>
      </tr>
    );
  }

}

export default CryptoTable;

// https://stackoverflow.com/questions/44375407/how-to-make-a-table-in-reactjs-sortable

// [
//   {
//       "id": "bitcoin", 
//       "name": "Bitcoin", 
//       "symbol": "BTC", 
//       "rank": "1", 
//       "price_usd": "10733.8292199", 
//       "price_btc": "1.0", 
//       "24h_volume_usd": "25723544166.6", 
//       "market_cap_usd": "190792741001", 
//       "available_supply": "17774900.0", 
//       "total_supply": "17774900.0", 
//       "max_supply": "21000000.0", 
//       "percent_change_1h": "-0.27", 
//       "percent_change_24h": "-0.07", 
//       "percent_change_7d": "17.82", 
//       "last_updated": "1561276048"
//   }, ...
