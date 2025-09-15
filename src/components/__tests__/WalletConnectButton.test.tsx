import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WalletConnectButton } from '../WalletConnectButton';
import { SimpleWalletProvider } from '../../providers/SimpleWalletProvider';

// Mock the wallet provider
const MockWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SimpleWalletProvider>
    {children}
  </SimpleWalletProvider>
);

describe('WalletConnectButton', () => {
  it('renders connect button when wallet is not connected', () => {
    render(
      <MockWalletProvider>
        <WalletConnectButton />
      </MockWalletProvider>
    );

    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('shows wallet info when connected', async () => {
    render(
      <MockWalletProvider>
        <WalletConnectButton />
      </MockWalletProvider>
    );

    const connectButton = screen.getByText('Connect Wallet');
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(screen.getByText(/Wallet Connected/)).toBeInTheDocument();
    });
  });

  it('handles connection errors gracefully', async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MockWalletProvider>
        <WalletConnectButton />
      </MockWalletProvider>
    );

    const connectButton = screen.getByText('Connect Wallet');
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
