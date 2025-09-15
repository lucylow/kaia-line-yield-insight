# LINE Yield Web App Architecture

## Overview

This document outlines the comprehensive frontend architecture for the LINE Yield Web version that seamlessly integrates with the existing LIFF Mini-DApp version via shared components and hooks. The architecture follows a monorepo structure with shared components, platform detection, and environment-specific configurations.

## 🏗️ Architecture Overview

The project uses a monorepo structure with two main packages:

- **`packages/shared/`** - Shared components, hooks, and services
- **`packages/web-app/`** - Standard web application

## 🚀 Key Features

### Platform Detection
- Automatic detection of LIFF vs Web environment
- Platform-specific UI adaptations
- Touch-friendly optimizations for mobile LIFF

### Universal Wallet Integration
- Works with MetaMask (Web) and LINE Wallet (LIFF)
- Cross-platform account linking
- Persistent wallet state

### Gasless Transactions
- LIFF version uses relayer for gasless transactions
- Web version uses direct wallet transactions
- Unified API for both platforms

### Shared Component Library
- Platform-aware components that adapt to environment
- Consistent UI/UX across both versions
- Responsive design for mobile and desktop

## 📁 Project Structure

```
packages/
├── shared/                 # Shared components and logic
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ConnectWallet.tsx
│   │   │   ├── BalanceDisplay.tsx
│   │   │   └── TransactionHistory.tsx
│   │   ├── hooks/         # React hooks
│   │   │   ├── usePlatform.ts
│   │   │   ├── useUniversalWallet.ts
│   │   │   └── useLineYield.ts
│   │   ├── utils/         # Utility functions
│   │   │   └── cn.ts
│   │   └── index.ts       # Main exports
│   ├── package.json
│   └── tsconfig.json
└── web-app/               # Web application
    ├── src/
    │   ├── components/     # Web-specific components
    │   │   └── Layout.tsx
    │   ├── pages/         # Page components
    │   │   ├── LandingPage.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── YieldStrategies.tsx
    │   │   ├── NFTMarketplace.tsx
    │   │   ├── ReferralSystem.tsx
    │   │   ├── TransactionHistory.tsx
    │   │   └── AnalyticsDashboard.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── index.html
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- pnpm

### Installation
```bash
# Install all dependencies
pnpm install:all

# Start shared package in watch mode
pnpm dev:shared

# Start web app development server
pnpm dev:web
```

### Build Commands
```bash
# Build shared package
pnpm build:shared

# Build web app
pnpm build:web

# Build everything
pnpm build:all
```

## 🔧 Configuration

### Vite Configuration (Web-specific)

```typescript
// packages/web-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../shared/src'),
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.VITE_APP_MODE': JSON.stringify('web'),
    'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wallet: ['ethers', '@web3-react/core'],
        },
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

## 🎨 Shared Components Usage

### Example: Dashboard Component

```typescript
import React from 'react';
import { 
  Button, 
  ConnectWallet, 
  BalanceDisplay, 
  TransactionHistory,
  useLineYield 
} from '@shared';

const Dashboard: React.FC = () => {
  const { vaultData, deposit, withdraw, isLoading, isDepositing, isWithdrawing } = useLineYield();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">LINE Yield Dashboard</h1>

      <ConnectWallet />

      {vaultData && (
        <>
          <BalanceDisplay 
            balance={vaultData.userAssets} 
            earned={vaultData.earnedYield} 
          />

          <div className="my-4 flex space-x-4">
            <Button 
              loading={isDepositing} 
              onClick={() => deposit('10')} 
              fullWidth
            >
              Deposit 10 USDT
            </Button>
            <Button 
              variant="secondary" 
              loading={isWithdrawing} 
              onClick={() => withdraw('5')} 
              fullWidth
            >
              Withdraw 5 USDT
            </Button>
          </div>

          <TransactionHistory transactions={vaultData.transactions} />
        </>
      )}

      {isLoading && <p>Loading vault data...</p>}
    </div>
  );
};

export default Dashboard;
```

## 🔌 Platform Detection Hook

```typescript
import { usePlatform } from '@shared';

const { isLiff, isWeb, isMobile, isDesktop } = usePlatform();

if (isWeb) {
  // Enable web-specific interactions or integrations
}
```

## 💳 Universal Wallet Hook

```typescript
import { useUniversalWallet } from '@shared';

const { wallet, connectWallet, disconnectWallet } = useUniversalWallet();

return (
  <div>
    {!wallet.isConnected ? (
      <button onClick={() => connectWallet({ type: 'metamask' })}>
        Connect MetaMask
      </button>
    ) : (
      <div>
        <p>Connected: {wallet.address}</p>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    )}
  </div>
);
```

## 🌱 LINE Yield Hook

```typescript
import { useLineYield } from '@shared';

const {
  vaultData,
  deposit,
  withdraw,
  isLoading,
  isDepositing,
  isWithdrawing,
} = useLineYield();

// deposit('amount') and withdraw('amount') handle transaction relaying etc.
```

## 🎯 Landing Page Features

### Hero Section
- Gradient background with floating elements
- Clear value proposition
- Call-to-action buttons
- Wallet connection integration

### Features Section
- 6 key features with icons and descriptions
- Hover effects and animations
- Responsive grid layout

### Statistics Section
- Platform metrics with gradient background
- Real-time data display
- Professional presentation

### How It Works
- 3-step process explanation
- Visual icons and clear descriptions
- User journey guidance

### Footer
- Comprehensive links and information
- Social media integration
- Legal and policy links

## 📱 Responsive Design

The landing page is fully responsive with:

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Great experience on tablets
- **Desktop Optimization**: Full-featured desktop experience
- **Touch-Friendly**: All interactions work on touch devices

## 🚀 Deployment

### Web Deployment
- Runs on port 3001
- Static hosting compatible
- Environment-specific configurations
- Optimized build output

### Environment Variables
```bash
# Wallet Integration
VITE_REOWN_PROJECT_ID=your_project_id
VITE_APP_URL=http://localhost:3001

# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000

# Smart Contracts
VITE_USDT_CONTRACT_ADDRESS=0x...
VITE_LOAN_MANAGER_CONTRACT_ADDRESS=0x...
VITE_NFT_CONTRACT_ADDRESS=0x...
VITE_MARKETPLACE_CONTRACT_ADDRESS=0x...
VITE_STAKING_CONTRACT_ADDRESS=0x...
```

## 🔒 Security Features

- **Error Boundaries**: Comprehensive error catching
- **Loading States**: Loading indicators for all async operations
- **Network Error Handling**: Graceful handling of network issues
- **User-Friendly Messages**: Clear error messages for users

## 📊 Performance Optimizations

- **Code Splitting**: Automatic chunk splitting for vendor and wallet libraries
- **Lazy Loading**: Components loaded on demand
- **Source Maps**: Development debugging support
- **Tree Shaking**: Unused code elimination

## 🌐 Cross-Platform Compatibility

- **Browser Support**: All modern browsers
- **Mobile Optimization**: Touch-friendly interfaces
- **Accessibility**: WCAG compliance
- **SEO**: Meta tags and structured data

## 📈 Analytics Integration

- **Performance Monitoring**: Built-in performance tracking
- **User Analytics**: User behavior tracking
- **Error Reporting**: Comprehensive error logging
- **Custom Events**: Platform-specific event tracking

## 🎨 Design System

- **Consistent Colors**: Unified color palette
- **Typography**: Consistent font hierarchy
- **Spacing**: Standardized spacing system
- **Components**: Reusable UI components
- **Icons**: Lucide React icon library

## 🔄 State Management

- **React Hooks**: Modern state management
- **Context Providers**: Global state sharing
- **Local Storage**: Persistent user preferences
- **Session Storage**: Temporary data storage

## 📝 Documentation

- **Component Documentation**: Comprehensive component docs
- **API Reference**: Hook and utility documentation
- **Usage Examples**: Real-world implementation examples
- **Best Practices**: Development guidelines

## 🧪 Testing Strategy

- **Unit Tests**: Component and hook testing
- **Integration Tests**: Cross-component testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load and stress testing

## 🚀 Future Enhancements

- **PWA Support**: Progressive Web App features
- **Offline Support**: Offline functionality
- **Push Notifications**: Real-time notifications
- **Advanced Analytics**: Enhanced tracking and reporting

## 📞 Support

For questions or issues with the web app architecture:

- **Documentation**: Check the README files in each package
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Join community discussions
- **Contributions**: Submit pull requests for improvements

This architecture provides a solid foundation for the LINE Yield platform with room for future growth and enhancements.
