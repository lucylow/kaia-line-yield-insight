import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { WebSocketServer } from 'ws';
import { Server } from 'http';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      service: 'line-yield-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'LINE Yield API',
      version: '1.0.0',
      description: 'LINE Yield Platform API',
      endpoints: {
        health: '/health',
        websocket: '/ws'
      },
      documentation: 'https://docs.line-yield.com/api',
      support: 'https://support.line-yield.com'
    }
  });
});

// Mock user endpoints
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  
  res.json({
    success: true,
    data: {
      id: userId,
      email: 'user@example.com',
      display_name: 'Test User',
      wallet_address: '0x1234567890123456789012345678901234567890',
      total_deposited: '1000.00',
      total_withdrawn: '0.00',
      total_earned: '50.00',
      current_balance: '1050.00',
      apy: '8.5',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  });
});

app.get('/api/users/:userId/transactions', (req, res) => {
  const { userId } = req.params;
  const { limit = '50', offset = '0' } = req.query;
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        user_id: userId,
        type: 'deposit',
        amount: '1000.00',
        hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        status: 'confirmed',
        gas_fee: '0.001',
        block_number: '12345678',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: userId,
        type: 'claim',
        amount: '50.00',
        hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        status: 'confirmed',
        gas_fee: '0.002',
        block_number: '12345679',
        created_at: new Date().toISOString()
      }
    ]
  });
});

app.get('/api/users/:userId/notifications', (req, res) => {
  const { userId } = req.params;
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        user_id: userId,
        type: 'success',
        title: 'Deposit Successful',
        message: 'Your deposit of 1000 USDT has been confirmed',
        read: false,
        action_url: null,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: userId,
        type: 'info',
        title: 'Yield Earned',
        message: 'You earned 50 USDT in yield rewards',
        read: false,
        action_url: null,
        created_at: new Date().toISOString()
      }
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(500).json({
    success: false,
    error: isDevelopment ? error.message : 'Internal server error',
    ...(isDevelopment && { stack: error.stack }),
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  });
});

// Start server
const startServer = async () => {
  try {
    const host = '0.0.0.0';

    const server = app.listen(port, host, () => {
      console.log(`🚀 Server started on http://${host}:${port}`);
      console.log(`📊 Health check: http://${host}:${port}/health`);
      console.log(`📚 API docs: http://${host}:${port}/api`);
      console.log(`🔌 WebSocket: ws://${host}:${port}/ws`);
    });

    // Initialize WebSocket service
    const wss = new WebSocketServer({ 
      server,
      path: '/ws'
    });

    wss.on('connection', (ws) => {
      console.log('New WebSocket connection established');
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: 'data',
        channel: 'system',
        data: { message: 'Connected to LINE Yield WebSocket service' },
        timestamp: Date.now()
      }));

      // Handle incoming messages
      ws.on('message', (data: Buffer) => {
        try {
          const message = JSON.parse(data.toString());
          console.log('Received message:', message);
          
          // Handle ping
          if (message.type === 'ping') {
            ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
            return;
          }
          
          // Handle subscription
          if (message.type === 'subscribe' && message.channel) {
            console.log(`Client subscribed to channel: ${message.channel}`);
            
            // Send initial data based on channel
            if (message.channel === 'market-data') {
              ws.send(JSON.stringify({
                type: 'data',
                channel: 'market-data',
                data: {
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
                },
                timestamp: Date.now()
              }));
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          ws.send(JSON.stringify({
            type: 'error',
            data: { error: 'Invalid message format' },
            timestamp: Date.now()
          }));
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });

    // Send periodic market data updates
    setInterval(() => {
      const marketData = {
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
      };

      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({
            type: 'data',
            channel: 'market-data',
            data: marketData,
            timestamp: Date.now()
          }));
        }
      });
    }, 5000); // Update every 5 seconds
    
    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`Received ${signal}. Starting graceful shutdown...`);
      
      server.close(() => {
        console.log('HTTP server closed');
        wss.close();
        console.log('WebSocket service closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
