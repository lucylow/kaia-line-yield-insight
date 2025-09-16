export default {
  // Lovable configuration for LINE Yield Platform
  name: "LINE Yield Platform",
  description: "A decentralized yield farming platform integrated with LINE ecosystem",
  
  // Entry points
  entry: {
    main: "./src/main.tsx",
    app: "./src/App-minimal.tsx"
  },
  
  // Component tags for Lovable
  components: {
    main: "./src/App-minimal.tsx",
    dashboard: "./src/components/Dashboard.tsx",
    yieldStrategies: "./src/components/YieldStrategies.tsx",
    nftMarketplace: "./src/components/NFTMarketplace.tsx",
    referralSystem: "./src/components/ReferralSystem.tsx",
    transactionHistory: "./src/components/TransactionHistory.tsx",
    walletProvider: "./src/providers/WalletProvider.tsx",
    button: "./src/components/ui/button.tsx",
    card: "./src/components/ui/card.tsx",
    errorBoundary: "./src/components/ErrorBoundary.tsx"
  },
  
  // Build configuration
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: false,
    minify: true
  },
  
  // Development server
  dev: {
    port: 8080,
    host: "::"
  },
  
  // Features
  features: {
    wallet: true,
    yieldFarming: true,
    nftMarketplace: true,
    referralSystem: true,
    transactionHistory: true,
    responsive: true,
    errorHandling: true
  }
};
