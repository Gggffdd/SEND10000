import React, { useState, useEffect } from 'react';
import Wallet from './components/Wallet';
import Trading from './components/Trading';
import Portfolio from './components/Portfolio';
import Market from './components/Market';
import Auth from './components/Auth';
import { initTelegramApp } from './utils/telegram';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('market');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await initTelegramApp();
      // Авторизация через Telegram WebApp
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.enableClosingConfirmation();
      
      // Проверяем авторизацию
      if (tg.initDataUnsafe.user) {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: tg.initData })
        });
        
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading Crypto App...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Crypto Trader</h1>
        <div className="user-info">
          <span>👤 {user.firstName}</span>
          <span className="balance">${user.balance.toLocaleString()}</span>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'market' ? 'active' : ''}
          onClick={() => setActiveTab('market')}
        >
          📊 Market
        </button>
        <button 
          className={activeTab === 'trading' ? 'active' : ''}
          onClick={() => setActiveTab('trading')}
        >
          📈 Trade
        </button>
        <button 
          className={activeTab === 'portfolio' ? 'active' : ''}
          onClick={() => setActiveTab('portfolio')}
        >
          💼 Portfolio
        </button>
        <button 
          className={activeTab === 'wallet' ? 'active' : ''}
          onClick={() => setActiveTab('wallet')}
        >
          🏦 Wallet
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'market' && <Market />}
        {activeTab === 'trading' && <Trading user={user} />}
        {activeTab === 'portfolio' && <Portfolio user={user} />}
        {activeTab === 'wallet' && <Wallet user={user} />}
      </main>
    </div>
  );
}

export default App;
