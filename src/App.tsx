import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container max-w-md mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          Welcome to LINE Yield
        </h1>
        <p className="text-muted-foreground mb-8">
          Your DeFi yield farming platform
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold text-card-foreground">Yield Farming</h3>
            <p className="text-sm text-muted-foreground">Earn rewards on your crypto</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold text-card-foreground">Kaia Network</h3>
            <p className="text-sm text-muted-foreground">Built on Kaia blockchain</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;