# Wallet Connection Feature Guide

## Overview

The wallet connection feature provides a comprehensive solution for connecting users to the Kaia LINE Yield Platform through multiple wallet types, including social logins and crypto wallets. The implementation matches the design shown in the provided image with a clean, modern modal interface.

## Features

### Supported Wallet Types

#### Social Login Wallets
- **Google** - Connect with Google account
- **LINE** - Connect with LINE account  
- **Apple** - Connect with Apple ID
- **Naver** - Connect with Naver account
- **Kakao** - Connect with Kakao account

#### Crypto Wallets
- **Kaia Wallet** - Native Kaia blockchain wallet
- **OKX Wallet** - Multi-chain crypto wallet
- **Bitget Wallet** - Exchange-based wallet

### Key Components

#### 1. WalletConnectModal
The main modal component that displays all available wallet connection options.

**Location:** `src/components/WalletConnectModal.tsx`

**Features:**
- Clean, modern UI matching the provided design
- Support for multiple wallet types
- Loading states during connection
- Error handling with user-friendly messages
- Integration with existing wallet providers

#### 2. WalletConnectButton
A reusable button component that can be used throughout the application.

**Location:** `src/components/WalletConnectButton.tsx`

**Props:**
- `variant`: Button style variant ('default' | 'outline' | 'ghost' | 'link')
- `size`: Button size ('default' | 'sm' | 'lg' | 'icon')
- `className`: Additional CSS classes
- `showAddress`: Whether to show connected wallet address
- `showDisconnect`: Whether to show disconnect button

#### 3. useWalletConnectModal Hook
A custom hook for managing wallet connection state.

**Location:** `src/hooks/useWalletConnectModal.ts`

**Returns:**
- `isModalOpen`: Boolean indicating if modal is open
- `walletConnection`: Current wallet connection state
- `openModal`: Function to open the modal
- `closeModal`: Function to close the modal
- `handleWalletConnected`: Function to handle successful connection
- `disconnectWallet`: Function to disconnect wallet

## Usage Examples

### Basic Usage

```tsx
import { WalletConnectButton } from '@/components/WalletConnectButton';

function MyComponent() {
  return (
    <div>
      <WalletConnectButton />
    </div>
  );
}
```

### Custom Styling

```tsx
import { WalletConnectButton } from '@/components/WalletConnectButton';

function MyComponent() {
  return (
    <div>
      <WalletConnectButton 
        variant="outline"
        size="lg"
        className="w-full"
        showAddress={true}
        showDisconnect={true}
      />
    </div>
  );
}
```

### Using the Hook Directly

```tsx
import { useWalletConnectModal } from '@/hooks/useWalletConnectModal';
import WalletConnectModal from '@/components/WalletConnectModal';

function MyComponent() {
  const { 
    isModalOpen, 
    walletConnection, 
    openModal, 
    closeModal, 
    handleWalletConnected 
  } = useWalletConnectModal();

  return (
    <div>
      <button onClick={openModal}>
        Connect Wallet
      </button>
      
      {walletConnection?.isConnected && (
        <p>Connected to: {walletConnection.address}</p>
      )}
      
      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onWalletConnected={handleWalletConnected}
      />
    </div>
  );
}
```

## Integration with Existing Systems

### Wallet Provider SDK Integration

The wallet connection feature integrates with the existing `WalletProviderSDK` for crypto wallet connections:

```tsx
// In WalletConnectModal.tsx
const walletSDK = new WalletProviderSDK();

// For crypto wallets
const connection = await walletSDK.connectWallet(walletType);
```

### Kaia Wallet Integration

For Kaia wallet connections, the feature uses the existing `useKaiaWallet` hook:

```tsx
// In WalletConnectModal.tsx
const { connectWallet } = useKaiaWallet();
const address = await connectWallet();
```

## Demo and Testing

### Demo Page

A comprehensive demo page is available at the "Wallet Demo" tab in the main application.

**Location:** `src/pages/WalletConnectDemo.tsx`

**Features:**
- Interactive wallet connection demo
- Feature showcase
- Integration examples
- Code examples

### Example Component

An example component showing various integration patterns:

**Location:** `src/components/WalletIntegrationExample.tsx`

## Styling and Design

The wallet connection modal matches the design from the provided image with:

- Clean white modal with rounded corners
- Green accent color for the Mini Dapp icon
- Proper spacing and typography
- Loading states with spinning icons
- External link indicators for external wallets
- Responsive design for mobile devices

## Error Handling

The implementation includes comprehensive error handling:

- Connection failures with user-friendly messages
- Loading states during connection attempts
- Toast notifications for success/error states
- Graceful fallbacks for unsupported wallets

## Security Considerations

- All wallet connections use secure authentication methods
- Social logins follow OAuth best practices
- Crypto wallet connections use standard Web3 protocols
- Private keys are never stored or transmitted

## Future Enhancements

Potential future improvements:

1. **Additional Wallet Support**
   - MetaMask integration
   - WalletConnect v2 support
   - More social login providers

2. **Enhanced Features**
   - Wallet switching
   - Multi-account support
   - Transaction signing

3. **UI Improvements**
   - Dark mode support
   - Custom themes
   - Animation enhancements

## Troubleshooting

### Common Issues

1. **Wallet Not Found**
   - Ensure the wallet extension is installed
   - Check browser compatibility
   - Verify wallet is unlocked

2. **Connection Failed**
   - Check network connectivity
   - Verify wallet permissions
   - Try refreshing the page

3. **Modal Not Opening**
   - Check for JavaScript errors
   - Verify component imports
   - Ensure proper state management

### Debug Mode

Enable debug logging by setting the environment variable:
```
REACT_APP_DEBUG_WALLET=true
```

## Contributing

When contributing to the wallet connection feature:

1. Follow the existing code style and patterns
2. Add proper TypeScript types
3. Include error handling
4. Write tests for new functionality
5. Update documentation

## Support

For issues or questions regarding the wallet connection feature:

1. Check the demo page for examples
2. Review the integration examples
3. Check the browser console for errors
4. Verify wallet compatibility
5. Contact the development team for assistance
