import React, { useState, useEffect } from 'react';

const Portfolio = ({ user }) => {
  const [holdings, setHoldings] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange, setTotalChange] = useState(0);

  useEffect(() => {
    calculatePortfolio();
  }, [user]);

  const calculatePortfolio = () => {
    // Симуляция данных портфеля
    const simulatedHoldings = [
      { symbol: 'BTC/USDT', amount: 0.1, avgPrice: 42000 },
      { symbol: 'ETH/USDT', amount: 2, avgPrice: 2300 },
      { symbol: 'SOL/USDT', amount: 10, avgPrice: 95 }
    ];

    let total = 0;
    let totalInvestment = 0;

    const holdingsWithValue = simulatedHoldings.map(holding => {
      const currentPrice = getCurrentPrice(holding.symbol);
      const value = holding.amount * currentPrice;
      const investment = holding.amount * holding.avgPrice;
      const change = ((value - investment) / investment) * 100;

      total += value;
      totalInvestment += investment;

      return {
        ...holding,
        currentPrice,
        value,
        change
      };
    });

    setHoldings(holdingsWithValue);
    setTotalValue(total);
    setTotalChange(((total - totalInvestment) / totalInvestment) * 100);
  };

  const getCurrentPrice = (symbol) => {
    const prices = {
      'BTC/USDT': 43450.25,
      'ETH/USDT': 2380.75,
      'SOL/USDT': 102.34
    };
    return prices[symbol] || 0;
  };

  return (
    <div className="portfolio">
      <div className="portfolio-summary">
        <div style={{ fontSize: '14px', opacity: 0.8 }}>Total Portfolio Value</div>
        <div className="total-value">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className={`portfolio-change ${totalChange >= 0 ? 'positive' : 'negative'}`}>
          {totalChange >= 0 ? '↗' : '↘'} {Math.abs(totalChange).toFixed(2)}%
        </div>
      </div>

      <h3 style={{ marginBottom: '15px' }}>Your Holdings</h3>
      
      <div className="holdings-list">
        {holdings.map((holding, index) => (
          <div key={index} className="holding-item">
            <div className="holding-info">
              <div className="crypto-symbol">{holding.symbol.split('/')[0]}</div>
              <div className="holding-amount">
                {holding.amount} {holding.symbol.split('/')[0]}
              </div>
            </div>
            
            <div className="holding-value">
              <div className="price">
                ${holding.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`change ${holding.change >= 0 ? 'positive' : 'negative'}`}>
                {holding.change >= 0 ? '↗' : '↘'} {Math.abs(holding.change).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {holdings.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8a8f95' }}>
          No holdings yet. Start trading to build your portfolio!
        </div>
      )}
    </div>
  );
};

export default Portfolio;
