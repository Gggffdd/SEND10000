import React from 'react';

const Auth = ({ onLogin }) => {
  const handleDemoLogin = () => {
    // Демо-логин для тестирования
    const demoUser = {
      id: 123456789,
      username: 'demo_user',
      firstName: 'Demo',
      balance: 10000,
      portfolio: {}
    };
    onLogin(demoUser);
  };

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      background: '#1e2328',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: '#2a2f35',
        padding: '40px 30px',
        borderRadius: '20px',
        maxWidth: '350px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px'
        }}>
          💰
        </div>
        
        <h1 style={{
          fontSize: '28px',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>
          Crypto Trader
        </h1>
        
        <p style={{
          color: '#8a8f95',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Trade cryptocurrencies in real-time with virtual money. Build your portfolio and master trading strategies.
        </p>

        <button
          onClick={handleDemoLogin}
          style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          🚀 Start Trading Demo
        </button>

        <div style={{
          fontSize: '12px',
          color: '#8a8f95'
        }}>
          By continuing, you agree to our Terms of Service
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        color: '#8a8f95',
        fontSize: '12px'
      }}>
        This is a simulation. No real money is involved.
      </div>
    </div>
  );
};

export default Auth;
