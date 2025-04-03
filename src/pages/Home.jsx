import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {

  const {allcoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setinput] = useState('');

  const inputHandler = (e) =>{
    setinput(e.target.value);
    if(e.target.value===""){
      setDisplayCoin(allcoin);
    }
  }

  const searchHandler = async (e) =>{
    e.preventDefault();
    const coins = await allcoin.filter((item) =>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  useEffect(() =>{
    setDisplayCoin(allcoin);
  },[allcoin])
  

 
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largets <br/> Crypto MarketPlace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Signup to explore more</p>
        <form onSubmit={searchHandler}>

          <input  onChange={inputHandler} list='coinlist' value={input}type="text" placeholder="Search crypto.." required/>
          <datalist id="coinlist">
            {allcoin.map((item, index)=>(<option key={index} value={item.name}/>))}
            </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>coins</p>
          <p>price</p>
          <p style={{textAlign: 'center'}}>24hr chnge</p>
          <p className='marketcap'>marketcap</p>
        </div>
      
      {
      displayCoin.slice(0, 10).map((coins, index) => (

        <Link to={`/coin/${coins.id}`} className='table-layout' key={index}>
          <p>{coins.market_cap_rank}</p>
          <div>
            <img src={coins.image} alt="" />
            <p>{coins.name +' - '+ coins.symbol}</p>
          </div>
         
          <p>{currency.symbol} {coins.current_price.toLocaleString()}</p>

          <p className={coins.price_change_percentage_24h>0? "green": "red"}>
            {Math.floor(coins.price_change_percentage_24h*100)/100}
            </p>

          <p className='marketcap'>{currency.symbol} {coins.market_cap.toLocaleString()}</p>
          
          </Link>
      ))}
    
      </div>
      
    </div>
  )
}

export default Home
