import React, { useState, useEffect } from 'react';

const Market = () => {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarkets = async () => {
    try {
      const response = await fetch('/api/crypto/markets');
      const data = await response.json();
      if (data.success) {
        setMarkets(data.markets);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching markets:', error);
      setIsLoading(false);
    }
  };

  const getCryptoName = (symbol) => {
    const names = {
      'BTC/USDT': 'Bitcoin',
      'ETH/USDT': 'Ethereum',
      'BNB/USDT': 'Binance Coin',
      'SOL/USDT': 'Solana',
      'XRP/USDT': 'Ripple',
      'ADA/USDT': 'Cardano',
      'DOT/USDT': 'Polkadot',
      'DOGE/USDT': 'Dogecoin'
    };
    return names[symbol] || symbol;
  };

  if (isLoading) {
    return <div className="loading">Loading market data...</div>;
  }

  return (
    <div className="market">
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>📊 Crypto Markets</h2>
      
      <div className="market-list">
        {markets.map((crypto) => (
          <div key={crypto.symbol} className="crypto-item">
            <div className="crypto-info">
              <div className="crypto-symbol">{crypto.symbol.split('/')[0]}</div>
              <div className="crypto-name">{getCryptoName(crypto.symbol)}</div>
            </div>
            
            <div className="crypto-price">
              <div className="price">
                ${crypto.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 6 
                })}
              </div>
              <div className={`change ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
                {crypto.change24h >= 0 ? '↗' : '↘'} {Math.abs(crypto.change24h).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
