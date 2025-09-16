import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Zap,
  Clock
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'price_alert' | 'transaction' | 'reward';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  data?: any;
}

interface NotificationSettings {
  priceAlerts: boolean;
  transactions: boolean;
  rewards: boolean;
  general: boolean;
  sound: boolean;
  desktop: boolean;
}

export const RealTimeNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    priceAlerts: true,
    transactions: true,
    rewards: true,
    general: true,
    sound: true,
    desktop: true,
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Initialize with some sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Transaction Confirmed',
        message: 'Your USDT deposit of 100 tokens has been confirmed',
        timestamp: new Date(Date.now() - 300000),
        isRead: false,
      },
      {
        id: '2',
        type: 'price_alert',
        title: 'Price Alert Triggered',
        message: 'USDT/KAIA price reached $0.000130 (above your target)',
        timestamp: new Date(Date.now() - 600000),
        isRead: false,
      },
      {
        id: '3',
        type: 'reward',
        title: 'Rewards Available',
        message: 'You have 25.5 USDT in trading rewards ready to claim',
        timestamp: new Date(Date.now() - 900000),
        isRead: false,
      },
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.isRead).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      generateRandomNotification();
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update unread count
    setUnreadCount(notifications.filter(n => !n.isRead).length);
  }, [notifications]);

  const generateRandomNotification = () => {
    const notificationTypes: Notification['type'][] = [
      'success', 'error', 'warning', 'info', 'price_alert', 'transaction', 'reward'
    ];
    
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const newNotification = createNotificationByType(randomType);
    
    addNotification(newNotification);
  };

  const createNotificationByType = (type: Notification['type']): Notification => {
    const baseNotification = {
      id: Date.now().toString(),
      type,
      timestamp: new Date(),
      isRead: false,
    };

    switch (type) {
      case 'success':
        return {
          ...baseNotification,
          title: 'Transaction Successful',
          message: 'Your trade has been executed successfully',
        };
      case 'error':
        return {
          ...baseNotification,
          title: 'Transaction Failed',
          message: 'Your transaction failed due to insufficient gas',
        };
      case 'warning':
        return {
          ...baseNotification,
          title: 'High Slippage Warning',
          message: 'Price impact is higher than expected (>5%)',
        };
      case 'info':
        return {
          ...baseNotification,
          title: 'Market Update',
          message: 'New trading pair USDT/ETH is now available',
        };
      case 'price_alert':
        return {
          ...baseNotification,
          title: 'Price Alert',
          message: 'USDT/KAIA price reached your target of $0.000125',
        };
      case 'transaction':
        return {
          ...baseNotification,
          title: 'New Transaction',
          message: 'Received 50 USDT from 0x1234...5678',
        };
      case 'reward':
        return {
          ...baseNotification,
          title: 'Rewards Earned',
          message: 'You earned 5.2 USDT in liquidity rewards',
        };
      default:
        return {
          ...baseNotification,
          title: 'Notification',
          message: 'You have a new notification',
        };
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep last 50
    
    // Play sound if enabled
    if (settings.sound && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }

    // Show desktop notification if enabled
    if (settings.desktop && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'price_alert':
        return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'transaction':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'reward':
        return <Zap className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      case 'price_alert':
        return 'border-l-purple-500 bg-purple-50';
      case 'transaction':
        return 'border-l-green-500 bg-green-50';
      case 'reward':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                    !notification.isRead ? 'bg-opacity-100' : 'bg-opacity-50'
                  } hover:bg-opacity-75 transition-colors`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${
                        !notification.isRead ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {notification.message}
                      </p>
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={clearAllNotifications}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-40 transform translate-x-full">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Price Alerts</span>
              <input
                type="checkbox"
                checked={settings.priceAlerts}
                onChange={(e) => setSettings({ ...settings, priceAlerts: e.target.checked })}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Transactions</span>
              <input
                type="checkbox"
                checked={settings.transactions}
                onChange={(e) => setSettings({ ...settings, transactions: e.target.checked })}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Rewards</span>
              <input
                type="checkbox"
                checked={settings.rewards}
                onChange={(e) => setSettings({ ...settings, rewards: e.target.checked })}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">General</span>
              <input
                type="checkbox"
                checked={settings.general}
                onChange={(e) => setSettings({ ...settings, general: e.target.checked })}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Sound</span>
              <input
                type="checkbox"
                checked={settings.sound}
                onChange={(e) => setSettings({ ...settings, sound: e.target.checked })}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Desktop</span>
              <input
                type="checkbox"
                checked={settings.desktop}
                onChange={(e) => setSettings({ ...settings, desktop: e.target.checked })}
                className="rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Audio element for notification sounds */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default RealTimeNotifications;
