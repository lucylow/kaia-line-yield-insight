# Lovable Integration Guide

This document explains how the LINE Yield Platform is configured for Lovable deployment.

## Overview

The LINE Yield Platform is a decentralized yield farming platform integrated with the LINE ecosystem. It features:

- **Wallet Integration**: Connect and manage crypto wallets
- **Yield Farming**: Multiple yield strategies with different risk levels
- **NFT Marketplace**: Buy, sell, and use NFTs as collateral
- **Referral System**: Invite friends and earn rewards
- **Transaction History**: Track all transactions and earnings

## Lovable Tags

The following components are tagged for Lovable:

### Main Components
- `@lovable:main-entry-point` - Main entry point (src/main.jsx)
- `@lovable:main-app-component` - Main app component (src/App-minimal.tsx)

### Feature Components
- `@lovable:dashboard-component` - Dashboard with yield data
- `@lovable:yield-strategies-component` - Yield farming strategies
- `@lovable:nft-marketplace-component` - NFT marketplace and collateral
- `@lovable:referral-system-component` - Referral and rewards system
- `@lovable:transaction-history-component` - Transaction tracking

### Core Components
- `@lovable:wallet-provider` - Wallet connection and management
- `@lovable:yield-data-hook` - Yield data fetching hook
- `@lovable:button-component` - Reusable button component
- `@lovable:card-component` - Card layout component
- `@lovable:error-boundary-component` - Error handling component

## Build Commands

```bash
# Standard build
npm run build

# Lovable-specific build
npm run build:lovable

# Development server
npm run dev
```

## Configuration

The project uses:
- **Vite** for building and development
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components

## Features

### Wallet Integration
- Mock wallet connection for demo purposes
- Balance display
- Connect/disconnect functionality

### Yield Strategies
- USDT Stable Pool (8.5% APY, Low Risk)
- Kaia Liquidity Mining (12.3% APY, Medium Risk)
- NFT Collateral Pool (15.7% APY, High Risk)
- Cross-Chain Bridge (6.2% APY, Low Risk)

### NFT Marketplace
- Browse available NFTs
- Buy NFTs with ETH
- Use NFTs as collateral for loans
- Track NFT collections

### Referral System
- Generate referral links
- Track referral earnings
- Tier-based commission structure
- Social sharing features

### Transaction History
- Complete transaction tracking
- Filter by transaction type
- Detailed transaction information
- Explorer integration

## Deployment

The application is ready for Lovable deployment with:
- Optimized production build
- Proper error handling
- Responsive design
- Component-based architecture

## Development

To run locally:
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open http://localhost:8080

The application will run with mock data and simulated wallet functionality.
