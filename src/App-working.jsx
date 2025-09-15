import React, { useState } from 'react';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setWalletAddress('0x1234...5678');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>LY</span>
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>LINE Yield</h1>
          </div>

          {/* Wallet Connection */}
          <div>
            {isConnected ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {walletAddress}
                </span>
                <button
                  onClick={disconnectWallet}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '6px', 
                    background: 'white', 
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            Welcome to LINE Yield Platform
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
            A comprehensive DeFi platform integrated with LINE ecosystem on Kaia blockchain
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', marginRight: '12px' }}>🔗</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Wallet Connection</h3>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Connect with multiple wallet types including social logins and crypto wallets
            </p>
            <button 
              onClick={() => alert('Wallet Demo - Coming Soon!')}
              style={{ 
                width: '100%',
                padding: '8px 16px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                background: 'white', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Try Wallet Demo
            </button>
          </div>

          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', marginRight: '12px' }}>📊</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Portfolio Dashboard</h3>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Track your investments, earnings, and portfolio performance
            </p>
            <button 
              onClick={() => alert('Dashboard - Coming Soon!')}
              style={{ 
                width: '100%',
                padding: '8px 16px', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              View Dashboard
            </button>
          </div>

          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px', marginRight: '12px' }}>🌱</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Yield Farming</h3>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Earn rewards by providing liquidity to various DeFi protocols
            </p>
            <button 
              onClick={() => alert('Yield Farming - Coming Soon!')}
              style={{ 
                width: '100%',
                padding: '8px 16px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                background: 'white', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Start Farming
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>$2.4M</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Total Value Locked</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>8.5%</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Average APY</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>1,247</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Active Users</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>15</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Yield Strategies</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
