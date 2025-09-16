export default {
  // Lovable configuration for Kaia LINE Yield Platform
  name: "Kaia LINE Yield Platform",
  description: "A comprehensive DeFi platform built on Kaia blockchain and leveraging Kaia-native USDT and stablecoin DeFi protocols",
  
  // Entry points
  entry: {
    main: "./apps/web/src/main.tsx",
    app: "./apps/web/src/App-minimal.tsx"
  },
  
  // Component tags for Lovable - minimal configuration
  components: {
    main: "./apps/web/src/App-minimal.tsx"
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
  
  // Features - minimal for initial deployment
  features: {
    responsive: true
  }
};
