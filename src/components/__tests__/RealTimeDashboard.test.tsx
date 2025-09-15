import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RealTimeDashboard } from '../RealTimeDashboard';

// Mock the useWebSocket hook
jest.mock('../../hooks/useWebSocket', () => ({
  useWebSocket: () => ({
    isConnected: true,
    lastMessage: { type: 'MARKET_DATA_UPDATE', payload: { price: 1.05, volume: '100M', change24h: 0.02 } },
    sendMessage: jest.fn(),
  }),
}));

// Mock the AnimatedCounter component
jest.mock('../AnimatedCounter', () => ({
  AnimatedCounter: ({ to }: { to: number; precision?: number }) => <span>{to.toFixed(2)}</span>,
}));

// Mock the ProgressRing component
jest.mock('../ProgressRing', () => ({
  ProgressRing: ({ progress }: { progress: number }) => <div data-testid="progress-ring">{progress}%</div>,
}));

describe('RealTimeDashboard', () => {
  it('renders the dashboard title', () => {
    render(<RealTimeDashboard />);
    expect(screen.getByText('Real-time Platform Overview')).toBeInTheDocument();
  });

  it('displays market data cards', () => {
    render(<RealTimeDashboard />);
    
    expect(screen.getByText('USDT Price')).toBeInTheDocument();
    expect(screen.getByText('Total Value Locked (TVL)')).toBeInTheDocument();
    expect(screen.getByText('Average APY')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
  });

  it('shows connection status', () => {
    render(<RealTimeDashboard />);
    expect(screen.getByText('Connection Status')).toBeInTheDocument();
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });

  it('displays real-time data updates', async () => {
    render(<RealTimeDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('$1.05')).toBeInTheDocument();
      expect(screen.getByText('+0.02% (24h)')).toBeInTheDocument();
    });
  });

  it('handles WebSocket disconnection', () => {
    // Mock disconnected state
    jest.doMock('../../hooks/useWebSocket', () => ({
      useWebSocket: () => ({
        isConnected: false,
        lastMessage: null,
        sendMessage: jest.fn(),
      }),
    }));

    render(<RealTimeDashboard />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });
});
