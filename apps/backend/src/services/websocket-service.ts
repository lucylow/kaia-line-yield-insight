import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { Logger } from '../utils/logger';
import { supabaseService } from './supabase-service';

export interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'data' | 'error' | 'ping' | 'pong';
  channel?: string;
  data?: any;
  timestamp?: number;
}

export interface ClientSubscription {
  userId?: string;
  channels: Set<string>;
  lastPing: number;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<WebSocket, ClientSubscription> = new Map();
  private logger: Logger;
  private pingInterval: NodeJS.Timeout;
  private dataUpdateInterval: NodeJS.Timeout;

  constructor(server: Server) {
    this.logger = new Logger('WebSocketService');
    
    this.wss = new WebSocketServer({ 
      server,
      path: '/ws'
    });

    this.setupWebSocketServer();
    this.startPingInterval();
    this.startDataUpdateInterval();
    
    this.logger.info('WebSocket service initialized');
  }

  private setupWebSocketServer(): void {
    this.wss.on('connection', (ws: WebSocket, request) => {
      this.logger.info('New WebSocket connection established');
      
      // Initialize client subscription
      this.clients.set(ws, {
        channels: new Set(),
        lastPing: Date.now()
      });

      // Handle incoming messages
      ws.on('message', (data: Buffer) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          this.handleMessage(ws, message);
        } catch (error) {
          this.logger.error('Error parsing WebSocket message:', error);
          this.sendError(ws, 'Invalid message format');
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        this.logger.info('WebSocket connection closed');
        this.clients.delete(ws);
      });

      // Handle errors
      ws.on('error', (error) => {
        this.logger.error('WebSocket error:', error);
        this.clients.delete(ws);
      });

      // Send welcome message
      this.sendMessage(ws, {
        type: 'data',
        channel: 'system',
        data: { message: 'Connected to LINE Yield WebSocket service' },
        timestamp: Date.now()
      });
    });
  }

  private handleMessage(ws: WebSocket, message: WebSocketMessage): void {
    const client = this.clients.get(ws);
    if (!client) return;

    switch (message.type) {
      case 'subscribe':
        this.handleSubscribe(ws, message, client);
        break;
      
      case 'unsubscribe':
        this.handleUnsubscribe(ws, message, client);
        break;
      
      case 'ping':
        this.handlePing(ws, client);
        break;
      
      default:
        this.sendError(ws, `Unknown message type: ${message.type}`);
    }
  }

  private handleSubscribe(ws: WebSocket, message: WebSocketMessage, client: ClientSubscription): void {
    if (!message.channel) {
      this.sendError(ws, 'Channel is required for subscription');
      return;
    }

    // Validate channel
    const validChannels = [
      'market-data',
      'user-transactions',
      'yield-updates',
      'notifications',
      'portfolio-updates',
      'system-status'
    ];

    if (!validChannels.includes(message.channel)) {
      this.sendError(ws, `Invalid channel: ${message.channel}`);
      return;
    }

    // Add channel to client subscriptions
    client.channels.add(message.channel);
    
    this.logger.info(`Client subscribed to channel: ${message.channel}`);
    
    this.sendMessage(ws, {
      type: 'data',
      channel: 'system',
      data: { message: `Subscribed to ${message.channel}` },
      timestamp: Date.now()
    });

    // Send initial data for the channel
    this.sendInitialChannelData(ws, message.channel);
  }

  private handleUnsubscribe(ws: WebSocket, message: WebSocketMessage, client: ClientSubscription): void {
    if (!message.channel) {
      this.sendError(ws, 'Channel is required for unsubscription');
      return;
    }

    client.channels.delete(message.channel);
    
    this.logger.info(`Client unsubscribed from channel: ${message.channel}`);
    
    this.sendMessage(ws, {
      type: 'data',
      channel: 'system',
      data: { message: `Unsubscribed from ${message.channel}` },
      timestamp: Date.now()
    });
  }

  private handlePing(ws: WebSocket, client: ClientSubscription): void {
    client.lastPing = Date.now();
    
    this.sendMessage(ws, {
      type: 'pong',
      timestamp: Date.now()
    });
  }

  private async sendInitialChannelData(ws: WebSocket, channel: string): Promise<void> {
    try {
      switch (channel) {
        case 'market-data':
          await this.sendMarketData(ws);
          break;
        
        case 'system-status':
          await this.sendSystemStatus(ws);
          break;
        
        case 'yield-updates':
          await this.sendYieldUpdates(ws);
          break;
      }
    } catch (error) {
      this.logger.error(`Error sending initial data for channel ${channel}:`, error);
    }
  }

  private async sendMarketData(ws: WebSocket): Promise<void> {
    // Simulate market data - in production, this would come from real market feeds
    const marketData = {
      usdt: {
        price: 1.00,
        change24h: 0.001,
        volume24h: 1250000
      },
      kaia: {
        price: 0.25,
        change24h: 0.05,
        volume24h: 850000
      },
      totalValueLocked: 2500000,
      activeUsers: 1250,
      timestamp: Date.now()
    };

    this.sendMessage(ws, {
      type: 'data',
      channel: 'market-data',
      data: marketData,
      timestamp: Date.now()
    });
  }

  private async sendSystemStatus(ws: WebSocket): Promise<void> {
    const systemStatus = {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      connections: this.clients.size,
      timestamp: Date.now()
    };

    this.sendMessage(ws, {
      type: 'data',
      channel: 'system-status',
      data: systemStatus,
      timestamp: Date.now()
    });
  }

  private async sendYieldUpdates(ws: WebSocket): Promise<void> {
    const yieldData = {
      strategies: [
        {
          name: 'USDT Stable Pool',
          apy: 8.5,
          tvl: 1200000,
          risk: 'Low'
        },
        {
          name: 'Kaia Liquidity Mining',
          apy: 12.3,
          tvl: 800000,
          risk: 'Medium'
        },
        {
          name: 'NFT Collateral Pool',
          apy: 15.7,
          tvl: 500000,
          risk: 'High'
        }
      ],
      timestamp: Date.now()
    };

    this.sendMessage(ws, {
      type: 'data',
      channel: 'yield-updates',
      data: yieldData,
      timestamp: Date.now()
    });
  }

  private sendMessage(ws: WebSocket, message: WebSocketMessage): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private sendError(ws: WebSocket, error: string): void {
    this.sendMessage(ws, {
      type: 'error',
      data: { error },
      timestamp: Date.now()
    });
  }

  private startPingInterval(): void {
    this.pingInterval = setInterval(() => {
      const now = Date.now();
      const timeout = 30000; // 30 seconds

      this.clients.forEach((client, ws) => {
        if (now - client.lastPing > timeout) {
          this.logger.info('Client ping timeout, closing connection');
          ws.close();
          this.clients.delete(ws);
        } else {
          this.sendMessage(ws, {
            type: 'ping',
            timestamp: now
          });
        }
      });
    }, 10000); // Ping every 10 seconds
  }

  private startDataUpdateInterval(): void {
    this.dataUpdateInterval = setInterval(() => {
      this.broadcastToChannel('market-data', {
        usdt: {
          price: 1.00 + (Math.random() - 0.5) * 0.002,
          change24h: (Math.random() - 0.5) * 0.01,
          volume24h: 1250000 + Math.random() * 100000
        },
        kaia: {
          price: 0.25 + (Math.random() - 0.5) * 0.01,
          change24h: (Math.random() - 0.5) * 0.1,
          volume24h: 850000 + Math.random() * 50000
        },
        totalValueLocked: 2500000 + Math.random() * 100000,
        activeUsers: 1250 + Math.floor(Math.random() * 50),
        timestamp: Date.now()
      });

      this.broadcastToChannel('system-status', {
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        connections: this.clients.size,
        timestamp: Date.now()
      });
    }, 5000); // Update every 5 seconds
  }

  public broadcastToChannel(channel: string, data: any): void {
    const message: WebSocketMessage = {
      type: 'data',
      channel,
      data,
      timestamp: Date.now()
    };

    this.clients.forEach((client, ws) => {
      if (client.channels.has(channel)) {
        this.sendMessage(ws, message);
      }
    });
  }

  public broadcastToUser(userId: string, channel: string, data: any): void {
    const message: WebSocketMessage = {
      type: 'data',
      channel,
      data,
      timestamp: Date.now()
    };

    this.clients.forEach((client, ws) => {
      if (client.userId === userId && client.channels.has(channel)) {
        this.sendMessage(ws, message);
      }
    });
  }

  public sendNotification(userId: string, notification: any): void {
    this.broadcastToUser(userId, 'notifications', notification);
  }

  public sendTransactionUpdate(userId: string, transaction: any): void {
    this.broadcastToUser(userId, 'user-transactions', transaction);
  }

  public sendPortfolioUpdate(userId: string, portfolio: any): void {
    this.broadcastToUser(userId, 'portfolio-updates', portfolio);
  }

  public getConnectionCount(): number {
    return this.clients.size;
  }

  public getChannelSubscribers(channel: string): number {
    let count = 0;
    this.clients.forEach(client => {
      if (client.channels.has(channel)) {
        count++;
      }
    });
    return count;
  }

  public shutdown(): void {
    this.logger.info('Shutting down WebSocket service');
    
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    
    if (this.dataUpdateInterval) {
      clearInterval(this.dataUpdateInterval);
    }

    this.clients.forEach((client, ws) => {
      ws.close();
    });
    
    this.wss.close();
  }
}
