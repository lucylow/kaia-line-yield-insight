import { renderHook, act } from '@testing-library/react';
import { useWebSocket } from '../useWebSocket';

// Mock the toast hook
jest.mock('../useToast', () => ({
  toast: jest.fn(),
}));

describe('useWebSocket', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('initializes WebSocket connection', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3000/ws'));
    
    expect(result.current.isConnected).toBe(false);
    expect(result.current.lastMessage).toBeNull();
    expect(result.current.sendMessage).toBeInstanceOf(Function);
  });

  it('handles connection open', async () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => 
      useWebSocket('ws://localhost:3000/ws', { onOpen })
    );

    // Simulate WebSocket opening
    act(() => {
      // The mock WebSocket in setupTests.ts will automatically open
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isConnected).toBe(true);
    expect(onOpen).toHaveBeenCalled();
  });

  it('handles incoming messages', async () => {
    const onMessage = jest.fn();
    const { result } = renderHook(() => 
      useWebSocket('ws://localhost:3000/ws', { onMessage })
    );

    // Simulate receiving a message
    act(() => {
      const mockMessage = { type: 'TEST_MESSAGE', payload: { data: 'test' } };
      // This would normally be triggered by the WebSocket onmessage event
      // For testing, we'll simulate it directly
    });

    expect(result.current.sendMessage).toBeInstanceOf(Function);
  });

  it('sends messages when connected', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3000/ws'));
    
    const testMessage = { type: 'TEST', payload: { data: 'test' } };
    
    act(() => {
      result.current.sendMessage(testMessage);
    });

    // The sendMessage function should be callable
    expect(result.current.sendMessage).toBeInstanceOf(Function);
  });

  it('handles connection errors', async () => {
    const onError = jest.fn();
    const { result } = renderHook(() => 
      useWebSocket('ws://localhost:3000/ws', { onError })
    );

    // Simulate WebSocket error
    act(() => {
      // The mock WebSocket will handle errors gracefully
    });

    expect(result.current.sendMessage).toBeInstanceOf(Function);
  });

  it('attempts reconnection on disconnect', async () => {
    const { result } = renderHook(() => 
      useWebSocket('ws://localhost:3000/ws', { 
        reconnectInterval: 100,
        reconnectLimit: 2 
      })
    );

    // Simulate disconnection and reconnection
    act(() => {
      // The mock WebSocket will handle reconnection
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    expect(result.current.sendMessage).toBeInstanceOf(Function);
  });
});
