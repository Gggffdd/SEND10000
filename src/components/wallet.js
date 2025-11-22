
import React, { useState } from 'react';

const Wallet = ({ user }) => {
  const [activeTab, setActiveTab] = useState('transactions');

  // Симуляция истории транзакций
  const [transactions] = useState([
    { id: 1, type: 'deposit', amount: 10000, currency: 'USDT', timestamp: new Date('2024-01-15'), status: 'completed' },
    { id: 2, type: 'trade', amount: -500, currency: 'USDT', description: 'Bought 0.01 BTC', timestamp: new Date('2024-01-16'), status: 'completed' },
    { id: 3, type: 'trade', amount: 250, currency: 'USDT', description: 'Sold 0.1 ETH', timestamp: new Date('2024-01-17'), status: 'completed' },
    { id: 4, type: 'withdrawal', amount: -1000, currency: 'USDT', timestamp: new Date('2024-01-18'), status: 'pending' }
  ]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="wallet">
      <div className="wallet-balance">
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>Available Balance</div>
        <div style={{ fontSize: '32px', fontWeight: '700' }}>
          ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>USDT</div>
      </div>

      <div className="wallet-actions">
        <button className="btn btn-deposit">Deposit</button>
        <button className="btn btn-withdraw">Withdraw</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
          style={{ 
            padding: '10px 20px', 
            background: activeTab === 'transactions' ? '#667eea' : '#2a2f35',
            border: 'none',
            color: 'white',
            borderRadius: '8px',
            marginRight: '10px'
          }}
        >
          Transactions
        </button>
        <button 
          className={activeTab === 'assets' ? 'active' : ''}
          onClick={() => setActiveTab('assets')}
          style={{ 
            padding: '10px 20px', 
            background: activeTab === 'assets' ? '#667eea' : '#2a2f35',
            border: 'none',
            color: 'white',
            borderRadius: '8px'
          }}
        >
          Assets
        </button>
      </div>

      {activeTab === 'transactions' && (
        <div className="transaction-history">
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div>
                <div className={`transaction-type ${transaction.type}`}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1
