import React from 'react';

function App() {
  return React.createElement('div', null, 
    React.createElement('h1', null, 'Hello World!'),
    React.createElement('button', { onClick: () => alert('Clicked!') }, 'Click Me')
  );
}

export default App;
