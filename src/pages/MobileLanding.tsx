import React from 'react';

const MobileLanding: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container max-w-md mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-foreground">
          Welcome to LINE Yield
        </h1>
        <p className="text-muted-foreground mb-8">
          Your mobile yield farming platform
        </p>
      </div>
    </div>
  );
};

export default MobileLanding;