import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CONFIG } from '../config';
import { Logger } from '../utils/logger';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          wallet_address: string | null;
          total_deposited: string;
          total_withdrawn: string;
          total_earned: string;
          current_balance: string;
          apy: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          wallet_address?: string | null;
          total_deposited?: string;
          total_withdrawn?: string;
          total_earned?: string;
          current_balance?: string;
          apy?: string;
        };
        Update: {
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          wallet_address?: string | null;
          total_deposited?: string;
          total_withdrawn?: string;
          total_earned?: string;
          current_balance?: string;
          apy?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'deposit' | 'withdraw' | 'claim';
          amount: string;
          hash: string;
          status: 'pending' | 'confirmed' | 'failed';
          gas_fee: string | null;
          block_number: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: 'deposit' | 'withdraw' | 'claim';
          amount: string;
          hash: string;
          status?: 'pending' | 'confirmed' | 'failed';
          gas_fee?: string | null;
          block_number?: string | null;
        };
        Update: {
          status?: 'pending' | 'confirmed' | 'failed';
          gas_fee?: string | null;
          block_number?: string | null;
        };
      };
      vault_data: {
        Row: {
          id: string;
          user_id: string;
          total_assets: string;
          user_shares: string;
          user_assets: string;
          apy: string;
          earned_yield: string;
          strategies: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_assets?: string;
          user_shares?: string;
          user_assets?: string;
          apy?: string;
          earned_yield?: string;
          strategies?: any;
        };
        Update: {
          total_assets?: string;
          user_shares?: string;
          user_assets?: string;
          apy?: string;
          earned_yield?: string;
          strategies?: any;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'success' | 'error' | 'warning' | 'info';
          title: string;
          message: string;
          read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: 'success' | 'error' | 'warning' | 'info';
          title: string;
          message: string;
          read?: boolean;
          action_url?: string | null;
        };
        Update: {
          read?: boolean;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          user_id: string;
          event_name: string;
          properties: any;
          created_at: string;
        };
        Insert: {
          user_id: string;
          event_name: string;
          properties?: any;
        };
        Update: {
          properties?: any;
        };
      };
    };
  };
}

export class SupabaseService {
  private client: SupabaseClient<Database>;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('SupabaseService');
    
    if (!CONFIG.supabase.url || !CONFIG.supabase.serviceRoleKey) {
      throw new Error('Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
    }

    this.client = createClient<Database>(
      CONFIG.supabase.url,
      CONFIG.supabase.serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    this.logger.info('Supabase service initialized');
  }

  // User operations
  async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    try {
      const { data, error } = await this.client
        .from('users')
        .insert(userData)
        .select()
        .single();

      if (error) {
        this.logger.error('Error creating user:', error);
        throw error;
      }

      this.logger.info('User created successfully:', data.id);
      return data;
    } catch (error) {
      this.logger.error('Failed to create user:', error);
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        this.logger.error('Error fetching user:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch user:', error);
      throw error;
    }
  }

  async getUserByWalletAddress(walletAddress: string) {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (error) {
        this.logger.error('Error fetching user by wallet address:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch user by wallet address:', error);
      throw error;
    }
  }

  async updateUser(userId: string, updates: Database['public']['Tables']['users']['Update']) {
    try {
      const { data, error } = await this.client
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        this.logger.error('Error updating user:', error);
        throw error;
      }

      this.logger.info('User updated successfully:', userId);
      return data;
    } catch (error) {
      this.logger.error('Failed to update user:', error);
      throw error;
    }
  }

  // Transaction operations
  async createTransaction(transactionData: Database['public']['Tables']['transactions']['Insert']) {
    try {
      const { data, error } = await this.client
        .from('transactions')
        .insert(transactionData)
        .select()
        .single();

      if (error) {
        this.logger.error('Error creating transaction:', error);
        throw error;
      }

      this.logger.info('Transaction created successfully:', data.id);
      return data;
    } catch (error) {
      this.logger.error('Failed to create transaction:', error);
      throw error;
    }
  }

  async getTransactionsByUserId(userId: string, limit: number = 50, offset: number = 0) {
    try {
      const { data, error } = await this.client
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        this.logger.error('Error fetching transactions:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch transactions:', error);
      throw error;
    }
  }

  async updateTransactionStatus(transactionId: string, status: 'pending' | 'confirmed' | 'failed', blockNumber?: string, gasFee?: string) {
    try {
      const updates: Database['public']['Tables']['transactions']['Update'] = { status };
      
      if (blockNumber) {
        updates.block_number = blockNumber;
      }
      
      if (gasFee) {
        updates.gas_fee = gasFee;
      }

      const { data, error } = await this.client
        .from('transactions')
        .update(updates)
        .eq('id', transactionId)
        .select()
        .single();

      if (error) {
        this.logger.error('Error updating transaction status:', error);
        throw error;
      }

      this.logger.info('Transaction status updated successfully:', transactionId);
      return data;
    } catch (error) {
      this.logger.error('Failed to update transaction status:', error);
      throw error;
    }
  }

  // Vault data operations
  async getVaultData(userId: string) {
    try {
      const { data, error } = await this.client
        .from('vault_data')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        this.logger.error('Error fetching vault data:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch vault data:', error);
      throw error;
    }
  }

  async updateVaultData(userId: string, updates: Database['public']['Tables']['vault_data']['Update']) {
    try {
      const { data, error } = await this.client
        .from('vault_data')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        this.logger.error('Error updating vault data:', error);
        throw error;
      }

      this.logger.info('Vault data updated successfully:', userId);
      return data;
    } catch (error) {
      this.logger.error('Failed to update vault data:', error);
      throw error;
    }
  }

  // Notification operations
  async createNotification(notificationData: Database['public']['Tables']['notifications']['Insert']) {
    try {
      const { data, error } = await this.client
        .from('notifications')
        .insert(notificationData)
        .select()
        .single();

      if (error) {
        this.logger.error('Error creating notification:', error);
        throw error;
      }

      this.logger.info('Notification created successfully:', data.id);
      return data;
    } catch (error) {
      this.logger.error('Failed to create notification:', error);
      throw error;
    }
  }

  async getNotificationsByUserId(userId: string, limit: number = 20, offset: number = 0) {
    try {
      const { data, error } = await this.client
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        this.logger.error('Error fetching notifications:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch notifications:', error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId: string) {
    try {
      const { data, error } = await this.client
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) {
        this.logger.error('Error marking notification as read:', error);
        throw error;
      }

      this.logger.info('Notification marked as read:', notificationId);
      return data;
    } catch (error) {
      this.logger.error('Failed to mark notification as read:', error);
      throw error;
    }
  }

  // Analytics operations
  async trackEvent(userId: string, eventName: string, properties: any = {}) {
    try {
      const { data, error } = await this.client
        .from('analytics_events')
        .insert({
          user_id: userId,
          event_name: eventName,
          properties
        })
        .select()
        .single();

      if (error) {
        this.logger.error('Error tracking event:', error);
        throw error;
      }

      this.logger.info('Event tracked successfully:', eventName);
      return data;
    } catch (error) {
      this.logger.error('Failed to track event:', error);
      throw error;
    }
  }

  async getAnalyticsEvents(userId: string, eventName?: string, limit: number = 100, offset: number = 0) {
    try {
      let query = this.client
        .from('analytics_events')
        .select('*')
        .eq('user_id', userId);

      if (eventName) {
        query = query.eq('event_name', eventName);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        this.logger.error('Error fetching analytics events:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch analytics events:', error);
      throw error;
    }
  }

  // Utility methods
  async getUserStats(userId: string) {
    try {
      const { data, error } = await this.client
        .rpc('get_user_stats', { user_uuid: userId });

      if (error) {
        this.logger.error('Error fetching user stats:', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Failed to fetch user stats:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('count')
        .limit(1);

      if (error) {
        this.logger.error('Supabase health check failed:', error);
        return false;
      }

      this.logger.info('Supabase health check passed');
      return true;
    } catch (error) {
      this.logger.error('Supabase health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const supabaseService = new SupabaseService();
