import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNavigation, DesktopSidebar } from '../MobileNavigation';

const MockWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
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
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    // Check that navigation items exist
    expect(screen.getAllByText('Home')).toHaveLength(3); // header, sidebar, bottom nav
    expect(screen.getAllByText('Dashboard')).toHaveLength(2); // sidebar and bottom nav
    expect(screen.getAllByText('Yield')).toHaveLength(2); // sidebar and bottom nav
    expect(screen.getAllByText('NFT')).toHaveLength(1); // only in sidebar (not in first 5 for bottom nav)
  });

  it('highlights active tab', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          activeTab="dashboard"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    // Find the dashboard button in the sidebar (not header or bottom nav)
    const dashboardButtons = screen.getAllByText('Dashboard');
    const sidebarButton = dashboardButtons.find(button => 
      button.closest('button')?.className.includes('bg-green-100')
    );
    expect(sidebarButton?.closest('button')).toHaveClass('text-green-700', 'bg-green-100');
  });

  it('calls onTabChange when navigation item is clicked', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    // Click on the Yield button in the bottom navigation
    const yieldButtons = screen.getAllByText('Yield');
    const bottomNavButton = yieldButtons.find(button => 
      button.closest('button')?.className.includes('flex-col')
    );
    fireEvent.click(bottomNavButton!);

    expect(mockOnTabChange).toHaveBeenCalledWith('strategies');
  });

  it('shows LINE Yield branding', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    expect(screen.getByText('LINE Yield')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(
      <MockWalletProvider>
        <MobileNavigation
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    // Should show navigation menu
    expect(screen.getByText('Navigation')).toBeInTheDocument();
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
          activeTab="nft"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    const nftButton = screen.getByText('NFT Marketplace').closest('button');
    expect(nftButton).toHaveClass('bg-green-100', 'text-green-700');
  });

  it('calls onTabChange when navigation item is clicked', () => {
    render(
      <MockWalletProvider>
        <DesktopSidebar
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
          activeTab="home"
          onTabChange={mockOnTabChange}
        />
      </MockWalletProvider>
    );

    expect(screen.getByText('LINE Yield')).toBeInTheDocument();
  });
});
