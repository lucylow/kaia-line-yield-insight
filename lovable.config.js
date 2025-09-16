export default {
  // Lovable configuration for Kaia LINE Yield Platform
  name: "Kaia LINE Yield Platform",
  description: "A comprehensive DeFi platform built on Kaia blockchain and leveraging Kaia-native USDT and stablecoin DeFi protocols",
  
  // Entry points
  entry: {
    main: "./apps/web/src/main.tsx",
    app: "./apps/web/src/App.tsx"
  },
  
  // Component tags for Lovable
  components: {
    main: "./apps/web/src/App.tsx",
    dashboard: "./apps/web/src/components/Dashboard.tsx",
    yieldStrategies: "./apps/web/src/components/YieldStrategies.tsx",
    nftMarketplace: "./apps/web/src/components/NFTMarketplace.tsx",
    referralSystem: "./apps/web/src/components/ReferralSystem.tsx",
    transactionHistory: "./apps/web/src/components/TransactionHistory.tsx",
    walletProvider: "./apps/web/src/providers/SimpleWalletProvider.tsx",
    button: "./apps/web/src/components/ui/button.tsx",
    card: "./apps/web/src/components/ui/card.tsx",
    errorBoundary: "./apps/web/src/components/ErrorBoundary.tsx",
    connectWallet: "./apps/web/src/components/ConnectWallet.tsx",
    walletConnect: "./apps/web/src/components/WalletConnectButton.tsx"
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
    errorHandling: true,
    analytics: true,
    trading: true,
    payments: true
  }
};
