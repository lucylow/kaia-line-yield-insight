# LINE Yield Web App

The web version of LINE Yield platform - a comprehensive DeFi platform integrated with LINE ecosystem on Kaia blockchain.

## Features

- **Modern Landing Page**: Beautiful, responsive landing page with comprehensive feature showcase
- **Universal Wallet Support**: Connect with MetaMask (web) or LINE Wallet (LIFF)
- **Yield Farming**: Multiple yield strategies with different risk levels
- **NFT Marketplace**: Buy, sell, and trade NFTs
- **Referral System**: Earn rewards by inviting friends
- **Analytics Dashboard**: Real-time portfolio tracking and market insights
- **Transaction History**: Complete transaction tracking and management

## Architecture

This web app uses the shared component library (`@line-yield/shared`) for:

- **UI Components**: Button, Card, ConnectWallet, BalanceDisplay, TransactionHistory
- **Hooks**: usePlatform, useUniversalWallet, useLineYield
- **Platform Detection**: Automatic detection of web vs LIFF environment
- **Universal Wallet**: Seamless switching between MetaMask and LINE Wallet

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install:all

# Start development server
pnpm dev:web

# Build for production
pnpm build:web
```

### Environment Variables

Create a `.env` file in the web-app directory:

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

## Project Structure

```
packages/web-app/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Main layout with navigation
│   ├── pages/
│   │   ├── LandingPage.tsx     # Comprehensive landing page
│   │   ├── Dashboard.tsx       # Portfolio dashboard
│   │   ├── YieldStrategies.tsx # Yield farming strategies
│   │   ├── NFTMarketplace.tsx  # NFT trading
│   │   ├── ReferralSystem.tsx  # Referral program
│   │   ├── TransactionHistory.tsx # Transaction tracking
│   │   └── AnalyticsDashboard.tsx # Analytics and charts
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── index.html               # HTML template
```

## Key Components

### Landing Page
- Hero section with call-to-action
- Feature showcase with icons and descriptions
- Platform statistics
- How it works section
- Comprehensive footer

### Dashboard
- Portfolio overview with balance display
- Quick action buttons for deposits/withdrawals
- Statistics cards
- Transaction history

### Universal Wallet Integration
- Automatic platform detection (web vs LIFF)
- MetaMask integration for web users
- LINE Wallet integration for LIFF users
- Persistent wallet state

## Deployment

The web app is configured to run on port 3001 and can be deployed to any static hosting service:

```bash
# Build for production
pnpm build:web

# The built files will be in packages/web-app/dist/
```

## Integration with Shared Package

The web app seamlessly integrates with the shared package:

```typescript
import { 
  Button, 
  Card, 
  ConnectWallet, 
  BalanceDisplay,
  usePlatform,
  useUniversalWallet,
  useLineYield 
} from '@shared';
```

This ensures consistency across web and LIFF versions while maintaining platform-specific optimizations.
