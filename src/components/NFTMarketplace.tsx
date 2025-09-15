import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

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
    <Card key={nft.id} className="overflow-hidden">
      <div className="aspect-square bg-gray-100">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm truncate">{nft.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
            {nft.rarity.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-2">{nft.collection}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold">{nft.price} ETH</span>
          {nft.isCollateral && (
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
              Collateral
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Button 
            onClick={() => handleBuy(nft)}
            className="w-full"
            size="sm"
          >
            Buy Now
          </Button>
          <Button 
            onClick={() => handleUseAsCollateral(nft)}
            variant="outline"
            className="w-full"
            size="sm"
          >
            Use as Collateral
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">NFT Marketplace</h2>
        <p className="text-gray-600">Buy, sell, and use NFTs as collateral</p>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'marketplace'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('my-nfts')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'my-nfts'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My NFTs
        </button>
        <button
          onClick={() => setActiveTab('collateral')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'collateral'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Collateral
        </button>
      </div>

      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockNFTs.map(renderNFTCard)}
        </div>
      )}

      {activeTab === 'my-nfts' && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs Owned</h3>
          <p className="text-gray-600 mb-4">You don't have any NFTs yet. Browse the marketplace to find your first NFT!</p>
          <Button onClick={() => setActiveTab('marketplace')}>
            Browse Marketplace
          </Button>
        </div>
      )}

      {activeTab === 'collateral' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collateral Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">$2,500</p>
                  <p className="text-sm text-gray-600">Total Collateral Value</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">$1,250</p>
                  <p className="text-sm text-gray-600">Available Loan Amount</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">50%</p>
                  <p className="text-sm text-gray-600">Collateral Ratio</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full">
                  Request Loan
                </Button>
                <Button variant="outline" className="w-full">
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
