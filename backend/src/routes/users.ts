import { Router, Request, Response } from 'express';
import { supabaseService } from '../services/supabase-service';
import { Logger } from '../utils/logger';

const router = Router();
const logger = new Logger('UserRoutes');

/**
 * GET /api/users/:userId
 * Get user profile by ID
 */
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const user = await supabaseService.getUserById(userId);

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    logger.error('Error fetching user:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/users/wallet/:walletAddress
 * Get user profile by wallet address
 */
router.get('/wallet/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Wallet address is required'
      });
    }

    const user = await supabaseService.getUserByWalletAddress(walletAddress);

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    logger.error('Error fetching user by wallet address:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * PUT /api/users/:userId
 * Update user profile
 */
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Validate allowed fields
    const allowedFields = [
      'display_name',
      'avatar_url',
      'wallet_address',
      'total_deposited',
      'total_withdrawn',
      'total_earned',
      'current_balance',
      'apy'
    ];

    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {} as any);

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }

    const updatedUser = await supabaseService.updateUser(userId, filteredUpdates);

    res.json({
      success: true,
      data: updatedUser
    });

  } catch (error) {
    logger.error('Error updating user:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/users
 * Create new user
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Validate required fields
    if (!userData.id || !userData.email) {
      return res.status(400).json({
        success: false,
        error: 'User ID and email are required'
      });
    }

    const newUser = await supabaseService.createUser(userData);

    res.status(201).json({
      success: true,
      data: newUser
    });

  } catch (error) {
    logger.error('Error creating user:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/users/:userId/stats
 * Get user statistics
 */
router.get('/:userId/stats', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const stats = await supabaseService.getUserStats(userId);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    logger.error('Error fetching user stats:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/users/:userId/transactions
 * Get user transaction history
 */
router.get('/:userId/transactions', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit = '50', offset = '0' } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const transactions = await supabaseService.getTransactionsByUserId(
      userId,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    res.json({
      success: true,
      data: transactions
    });

  } catch (error) {
    logger.error('Error fetching user transactions:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/users/:userId/notifications
 * Get user notifications
 */
router.get('/:userId/notifications', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit = '20', offset = '0' } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const notifications = await supabaseService.getNotificationsByUserId(
      userId,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    res.json({
      success: true,
      data: notifications
    });

  } catch (error) {
    logger.error('Error fetching user notifications:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notifications',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * PUT /api/users/:userId/notifications/:notificationId/read
 * Mark notification as read
 */
router.put('/:userId/notifications/:notificationId/read', async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        error: 'Notification ID is required'
      });
    }

    const notification = await supabaseService.markNotificationAsRead(notificationId);

    res.json({
      success: true,
      data: notification
    });

  } catch (error) {
    logger.error('Error marking notification as read:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to mark notification as read',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/users/:userId/vault-data
 * Get user vault data
 */
router.get('/:userId/vault-data', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const vaultData = await supabaseService.getVaultData(userId);

    res.json({
      success: true,
      data: vaultData
    });

  } catch (error) {
    logger.error('Error fetching vault data:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vault data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * PUT /api/users/:userId/vault-data
 * Update user vault data
 */
router.put('/:userId/vault-data', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Validate allowed fields
    const allowedFields = [
      'total_assets',
      'user_shares',
      'user_assets',
      'apy',
      'earned_yield',
      'strategies'
    ];

    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {} as any);

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }

    const updatedVaultData = await supabaseService.updateVaultData(userId, filteredUpdates);

    res.json({
      success: true,
      data: updatedVaultData
    });

  } catch (error) {
    logger.error('Error updating vault data:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to update vault data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
