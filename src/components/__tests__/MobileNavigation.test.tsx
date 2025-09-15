import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNavigation, DesktopSidebar } from '../MobileNavigation';
import { SimpleWalletProvider } from '../../providers/SimpleWalletProvider';

const mockNavigationItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'realtime', label: 'Real-time', icon: '⚡' },
  { id: 'strategies', label: 'Yield Strategies', icon: '💼' },
  { id: 'nft', label: 'NFT Marketplace', icon: '🎨' },
  { id: 'referral', label: 'Referral', icon: '👥' },
  { id: 'transactions', label: 'Transaction History', icon: '📋' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'wallet-demo', label: 'Wallet Demo', icon: '👛' },
];

const MockWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SimpleWalletProvider>
    {children}
  </SimpleWalletProvider>
);

describe('MobileNavigation', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders navigation items', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Yield Strategies')).toBeInTheDocument();
    expect(screen.getByText('NFT Marketplace')).toBeInTheDocument();
  });

  it('highlights active tab', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          navigationItems={mockNavigationItems}
          activeTab="dashboard"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const dashboardButton = screen.getByText('Dashboard').closest('button');
    expect(dashboardButton).toHaveClass('text-emerald-600', 'bg-emerald-50');
  });

  it('calls onTabChange when navigation item is clicked', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const strategiesButton = screen.getByText('Yield Strategies');
    fireEvent.click(strategiesButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('strategies');
  });

  it('shows wallet connection status', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    // Should show connect wallet button when not connected
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('opens side sheet for more options', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const moreButton = screen.getByText('More');
    fireEvent.click(moreButton);

    // Should show all navigation items in the side sheet
    expect(screen.getByText('Referral')).toBeInTheDocument();
  });
});

describe('DesktopSidebar', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders navigation items', () => {
    render(
      <MockWalletProvider>
        <DesktopSidebar
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Yield Strategies')).toBeInTheDocument();
    expect(screen.getByText('NFT Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Referral')).toBeInTheDocument();
  });

  it('highlights active tab', () => {
    render(
      <MockWalletProvider>
        <DesktopSidebar
          navigationItems={mockNavigationItems}
          activeTab="nft"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const nftButton = screen.getByText('NFT Marketplace').closest('button');
    expect(nftButton).toHaveClass('bg-emerald-50', 'text-emerald-600');
  });

  it('calls onTabChange when navigation item is clicked', () => {
    render(
      <MockWalletProvider>
        <DesktopSidebar
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const referralButton = screen.getByText('Referral');
    fireEvent.click(referralButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('referral');
  });

  it('shows LINE Yield branding', () => {
    render(
      <MockWalletProvider>
        <DesktopSidebar
          navigationItems={mockNavigationItems}
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    expect(screen.getByText('LINE Yield')).toBeInTheDocument();
  });
});
