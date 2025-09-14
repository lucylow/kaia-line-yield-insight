import React from 'react';

const MobileDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your yield farming dashboard
        </p>
      </div>
    </div>
  );
};

export default MobileDashboard;