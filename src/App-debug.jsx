import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
    // Also try to display the error in the DOM
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="padding: 20px; background: #fee; border: 1px solid #fcc; margin: 20px;">
        <h2>React Error Caught:</h2>
        <p><strong>Error:</strong> ${error.toString()}</p>
        <pre>${error.stack}</pre>
        <p><strong>Component Stack:</strong></p>
        <pre>${errorInfo.componentStack}</pre>
      </div>
    `;
    document.body.appendChild(errorDiv);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee', border: '1px solid #fcc', margin: '20px' }}>
          <h2>Something went wrong in React:</h2>
          <p><strong>Error:</strong> {this.state.error?.toString()}</p>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function SimpleApp() {
  console.log('SimpleApp rendering...');
  
  // Add error handling for any potential issues
  try {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Debug App - React is Working!</h1>
        <p>If you can see this, React is rendering correctly.</p>
        <button onClick={() => alert('Button clicked!')}>
          Test Button
        </button>
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
          <p>Current time: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in SimpleApp render:', error);
    return (
      <div style={{ padding: '20px', background: '#fee' }}>
        <h2>Error in SimpleApp:</h2>
        <p>{error.toString()}</p>
      </div>
    );
  }
}

function App() {
  console.log('App component loading...');
  
  return (
    <ErrorBoundary>
      <SimpleApp />
    </ErrorBoundary>
  );
}

export default App;
