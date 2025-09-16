export default {
  // Lovable configuration for Kaia LINE Yield Platform
  name: "Kaia LINE Yield Platform",
  description: "A comprehensive DeFi platform built on Kaia blockchain and leveraging Kaia-native USDT and stablecoin DeFi protocols",
  
  // Entry points
  entry: {
    main: "./apps/web/src/main.tsx",
    app: "./apps/web/src/App-lovable.tsx"
  },
  
  // Component tags for Lovable - simplified to avoid complex dependencies
  components: {
    main: "./apps/web/src/App-lovable.tsx",
    button: "./apps/web/src/components/ui/button.tsx",
    card: "./apps/web/src/components/ui/card.tsx"
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
  
  // Features - core functionality only
  features: {
    responsive: true,
    errorHandling: true
  }
};
