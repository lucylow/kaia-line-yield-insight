function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>✅ LINE Yield Platform - Working!</h1>
      <p>React is now rendering correctly.</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => alert('Wallet connection feature coming soon!')}
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          🔗 Connect Wallet
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>🎉 Success!</h3>
        <p>The white page issue has been fixed. The React app is now rendering properly.</p>
        <ul>
          <li>✅ React is working</li>
          <li>✅ JavaScript is executing</li>
          <li>✅ Components are rendering</li>
          <li>✅ Ready to add wallet connection features</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
