import React, { useState } from 'react'
import { useKaiaWallet } from '../hooks/useKaiaWallet'

interface WalletConnectProps {
  onConnect?: (address: string) => void
  onDisconnect?: () => void
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect
}) => {
  const { wallet, connectWallet, disconnectWallet, isLoading, error } = useKaiaWallet()
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  const handleConnect = async (walletType: 'metamask' | 'kaikas' | 'line') => {
    try {
      const address = await connectWallet(walletType)
      if (address && onConnect) {
        onConnect(address)
      }
      setShowWalletOptions(false)
    } catch (err) {
      console.error('Wallet connection failed:', err)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    if (onDisconnect) {
      onDisconnect()
    }
  }

  if (wallet.isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <div className="font-medium">Connected</div>
          <div className="text-gray-500">
            {wallet.account?.slice(0, 6)}...{wallet.account?.slice(-4)}
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowWalletOptions(!showWalletOptions)}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {showWalletOptions && (
        <div className="absolute top-full mt-2 right-0 bg-white border rounded-lg shadow-lg p-4 min-w-[200px] z-50">
          <div className="space-y-2">
            <button
              onClick={() => handleConnect('metamask')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center space-x-3"
            >
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span>MetaMask</span>
            </button>
            <button
              onClick={() => handleConnect('kaikas')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center space-x-3"
            >
              <div className="w-6 h-6 bg-purple-500 rounded"></div>
              <span>Kaikas</span>
            </button>
            <button
              onClick={() => handleConnect('line')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center space-x-3"
            >
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span>LINE Wallet</span>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
