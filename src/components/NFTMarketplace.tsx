import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

// @lovable:nft-marketplace-component

interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  collection: string;
  owner: string;
  isCollateral: boolean;
  collateralValue: string;
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'LINE Yield Pioneer #001',
    image: 'https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=LYP001',
    price: '0.5',
    rarity: 'legendary',
    collection: 'LINE Yield Pioneers',
    owner: '0x1234...5678',
    isCollateral: true,
    collateralValue: '1000'
  },
  {
    id: '2',
    name: 'Kaia Guardian #042',
    image: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=KG042',
    price: '0.3',
    rarity: 'epic',
    collection: 'Kaia Guardians',
    owner: '0x9876...5432',
    isCollateral: true,
    collateralValue: '750'
  },
  {
    id: '3',
    name: 'DeFi Warrior #128',
    image: 'https://via.placeholder.com/200x200/F59E0B/FFFFFF?text=DW128',
    price: '0.2',
    rarity: 'rare',
    collection: 'DeFi Warriors',
    owner: '0x4567...8901',
    isCollateral: false,
    collateralValue: '500'
  },
  {
    id: '4',
    name: 'Yield Farmer #256',
    image: 'https://via.placeholder.com/200x200/EF4444/FFFFFF?text=YF256',
    price: '0.1',
    rarity: 'common',
    collection: 'Yield Farmers',
    owner: '0x2345...6789',
    isCollateral: false,
    collateralValue: '250'
  }
];

export const NFTMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my-nfts' | 'collateral'>('marketplace');
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleBuy = (nft: NFT) => {
    alert(`Buying ${nft.name} for ${nft.price} ETH`);
  };

  const handleUseAsCollateral = (nft: NFT) => {
    alert(`Using ${nft.name} as collateral for ${nft.collateralValue} USDT loan`);
  };

  const renderNFTCard = (nft: NFT) => (
    <Card key={nft.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-sm truncate text-gray-900">{nft.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)} shadow-sm`}>
            {nft.rarity.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-3">{nft.collection}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-gray-900">{nft.price} ETH</span>
          {nft.isCollateral && (
            <span className="text-xs text-emerald-600 bg-gradient-to-r from-emerald-100 to-green-100 px-3 py-1 rounded-full font-medium shadow-sm">
              Collateral
            </span>
          )}
        </div>
        <div className="space-y-3">
          <Button 
            onClick={() => handleBuy(nft)}
            className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            size="sm"
          >
            Buy Now
          </Button>
          <Button 
            onClick={() => handleUseAsCollateral(nft)}
            variant="outline"
            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
            size="sm"
          >
            Use as Collateral
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          NFT Marketplace
        </h1>
        <p className="text-lg text-gray-600">Buy, sell, and use NFTs as collateral</p>
      </div>

      <div className="flex space-x-1 bg-gradient-to-r from-emerald-50 to-green-50 p-1 rounded-xl border border-emerald-200">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'marketplace'
              ? 'bg-white text-emerald-700 shadow-lg'
              : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('my-nfts')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'my-nfts'
              ? 'bg-white text-emerald-700 shadow-lg'
              : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
          }`}
        >
          My NFTs
        </button>
        <button
          onClick={() => setActiveTab('collateral')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'collateral'
              ? 'bg-white text-emerald-700 shadow-lg'
              : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
          }`}
        >
          Collateral
        </button>
      </div>

      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockNFTs.map(renderNFTCard)}
        </div>
      )}

      {activeTab === 'my-nfts' && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-emerald-400 mb-6">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No NFTs Owned</h3>
            <p className="text-gray-600 mb-6">You don't have any NFTs yet. Browse the marketplace to find your first NFT!</p>
            <Button 
              onClick={() => setActiveTab('marketplace')}
              className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Browse Marketplace
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'collateral' && (
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Collateral Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$2,500</p>
                  <p className="text-sm text-gray-600 mt-2">Total Collateral Value</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">$1,250</p>
                  <p className="text-sm text-gray-600 mt-2">Available Loan Amount</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">50%</p>
                  <p className="text-sm text-gray-600 mt-2">Collateral Ratio</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Request Loan
                </Button>
                <Button variant="outline" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300">
                  View Active Loans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
