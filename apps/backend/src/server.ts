import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { CONFIG } from './config';
import { Logger } from './utils/logger';
import { WebSocketService } from './services/websocket-service';
import { supabaseService } from './services/supabase-service';

// Import working routes
import userRoutes from './routes/users';

const app = express();
const logger = new Logger('Server');

// Middleware
app.use(helmet());
app.use(cors({
  origin: CONFIG.frontendUrl || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await supabaseService.healthCheck();
    
    res.json({
      success: true,
      data: {
        status: 'healthy',
        service: 'line-yield-api',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: CONFIG.nodeEnv,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        database: dbHealth ? 'connected' : 'disconnected'
      }
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(500).json({
      success: false,
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// API routes
app.use('/api/users', userRoutes);

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
        users: '/api/users',
        websocket: '/ws'
      },
      documentation: 'https://docs.line-yield.com/api',
      support: 'https://support.line-yield.com'
    }
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
  logger.error('Unhandled error:', error);
  
  const isDevelopment = CONFIG.nodeEnv === 'development';
  
  res.status(500).json({
    success: false,
    error: isDevelopment ? error.message : 'Internal server error',
    ...(isDevelopment && { stack: error.stack }),
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    const port = CONFIG.port;
    const host = '0.0.0.0';

    const server = app.listen(port, host, () => {
      logger.info(`🚀 Server started on http://${host}:${port}`);
      logger.info(`📊 Health check: http://${host}:${port}/health`);
      logger.info(`📚 API docs: http://${host}:${port}/api`);
      logger.info(`🔌 WebSocket: ws://${host}:${port}/ws`);
    });

    // Initialize WebSocket service
    const wsService = new WebSocketService(server);
    
    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);
      
      server.close(() => {
        logger.info('HTTP server closed');
        
        wsService.shutdown();
        logger.info('WebSocket service closed');
        
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
