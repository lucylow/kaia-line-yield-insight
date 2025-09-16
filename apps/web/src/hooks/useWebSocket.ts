import { useEffect, useRef, useState, useCallback } from 'react';

export interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'data' | 'error' | 'ping' | 'pong';
  channel?: string;
  data?: any;
  timestamp?: number;
}

export interface WebSocketHook {
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastMessage: WebSocketMessage | null;
  error: string | null;
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
  sendMessage: (message: WebSocketMessage) => void;
  reconnect: () => void;
}

export const useWebSocket = (url?: string): WebSocketHook => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const subscribedChannels = useRef<Set<string>>(new Set());
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = url || `ws://localhost:3000/ws`;
    setConnectionStatus('connecting');
    setError(null);

    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        setError(null);
        reconnectAttempts.current = 0;

        // Clear any existing reconnect timeout
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }

        // Start ping interval
        pingIntervalRef.current = setInterval(() => {
          if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
          }
        }, 30000); // Ping every 30 seconds

        // Resubscribe to channels
        subscribedChannels.current.forEach(channel => {
          ws.current?.send(JSON.stringify({
            type: 'subscribe',
            channel,
            timestamp: Date.now()
          }));
        });

        console.log('WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);

          // Handle pong messages
          if (message.type === 'pong') {
            // Connection is alive
            return;
          }

          // Handle ping messages
          if (message.type === 'ping') {
            ws.current?.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
            return;
          }

          // Handle error messages
          if (message.type === 'error') {
            setError(message.data?.error || 'Unknown WebSocket error');
            return;
          }

          // Handle data messages
          if (message.type === 'data') {
            console.log('WebSocket data received:', message);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
          setError('Failed to parse WebSocket message');
        }
      };

      ws.current.onclose = (event) => {
        setIsConnected(false);
        setConnectionStatus('disconnected');

        // Clear ping interval
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = null;
        }

        console.log('WebSocket disconnected:', event.code, event.reason);

        // Attempt to reconnect if not a manual close
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectDelay * reconnectAttempts.current);
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setConnectionStatus('error');
          setError('Failed to reconnect after multiple attempts');
        }
      };

      ws.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setConnectionStatus('error');
        setError('WebSocket connection error');
      };

    } catch (err) {
      console.error('Error creating WebSocket connection:', err);
      setConnectionStatus('error');
      setError('Failed to create WebSocket connection');
    }
  }, [url]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }

    if (ws.current) {
      ws.current.close(1000, 'Manual disconnect');
      ws.current = null;
    }

    setIsConnected(false);
    setConnectionStatus('disconnected');
    subscribedChannels.current.clear();
  }, []);

  const subscribe = useCallback((channel: string) => {
    if (!isConnected || !ws.current) {
      console.warn('WebSocket not connected, cannot subscribe to channel:', channel);
      return;
    }

    subscribedChannels.current.add(channel);
    
    ws.current.send(JSON.stringify({
      type: 'subscribe',
      channel,
      timestamp: Date.now()
    }));

    console.log('Subscribed to channel:', channel);
  }, [isConnected]);

  const unsubscribe = useCallback((channel: string) => {
    if (!isConnected || !ws.current) {
      console.warn('WebSocket not connected, cannot unsubscribe from channel:', channel);
      return;
    }

    subscribedChannels.current.delete(channel);
    
    ws.current.send(JSON.stringify({
      type: 'unsubscribe',
      channel,
      timestamp: Date.now()
    }));

    console.log('Unsubscribed from channel:', channel);
  }, [isConnected]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (!isConnected || !ws.current) {
      console.warn('WebSocket not connected, cannot send message');
      return;
    }

    ws.current.send(JSON.stringify(message));
  }, [isConnected]);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttempts.current = 0;
    setTimeout(connect, 1000);
  }, [connect, disconnect]);

  // Connect on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionStatus,
    lastMessage,
    error,
    subscribe,
    unsubscribe,
    sendMessage,
    reconnect
  };
};

// Hook for subscribing to specific channels
export const useWebSocketChannel = (channel: string, url?: string) => {
  const ws = useWebSocket(url);

  useEffect(() => {
    if (ws.isConnected && channel) {
      ws.subscribe(channel);
      
      return () => {
        ws.unsubscribe(channel);
      };
    }
  }, [ws.isConnected, channel, ws.subscribe, ws.unsubscribe]);

  return {
    ...ws,
    channelData: ws.lastMessage?.channel === channel ? ws.lastMessage.data : null
  };
};

// Hook for market data
export const useMarketData = (url?: string) => {
  return useWebSocketChannel('market-data', url);
};

// Hook for yield updates
export const useYieldUpdates = (url?: string) => {
  return useWebSocketChannel('yield-updates', url);
};

// Hook for system status
export const useSystemStatus = (url?: string) => {
  return useWebSocketChannel('system-status', url);
};

// Hook for user notifications
export const useUserNotifications = (userId: string, url?: string) => {
  const ws = useWebSocket(url);

  useEffect(() => {
    if (ws.isConnected && userId) {
      ws.subscribe('notifications');
      
      return () => {
        ws.unsubscribe('notifications');
      };
    }
  }, [ws.isConnected, userId, ws.subscribe, ws.unsubscribe]);

  return {
    ...ws,
    notifications: ws.lastMessage?.channel === 'notifications' ? ws.lastMessage.data : null
  };
};

// Hook for user transactions
export const useUserTransactions = (userId: string, url?: string) => {
  const ws = useWebSocket(url);

  useEffect(() => {
    if (ws.isConnected && userId) {
      ws.subscribe('user-transactions');
      
      return () => {
        ws.unsubscribe('user-transactions');
      };
    }
  }, [ws.isConnected, userId, ws.subscribe, ws.unsubscribe]);

  return {
    ...ws,
    transactions: ws.lastMessage?.channel === 'user-transactions' ? ws.lastMessage.data : null
  };
};

// Hook for portfolio updates
export const usePortfolioUpdates = (userId: string, url?: string) => {
  const ws = useWebSocket(url);

  useEffect(() => {
    if (ws.isConnected && userId) {
      ws.subscribe('portfolio-updates');
      
      return () => {
        ws.unsubscribe('portfolio-updates');
      };
    }
  }, [ws.isConnected, userId, ws.subscribe, ws.unsubscribe]);

  return {
    ...ws,
    portfolio: ws.lastMessage?.channel === 'portfolio-updates' ? ws.lastMessage.data : null
  };
};
