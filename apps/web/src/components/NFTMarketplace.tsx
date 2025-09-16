import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Search, Filter, SortAsc, Heart, Eye, TrendingUp, Clock, Users, DollarSign, Star, Zap, Target, AlertTriangle, Grid, List } from 'lucide-react';

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
  views: number;
  likes: number;
  lastSale?: string;
  floorPrice?: string;
  volume24h?: string;
  traits?: { name: string; value: string; rarity: number }[];
  isFavorite?: boolean;
  isVerified?: boolean;
  auctionEnd?: string;
  bidCount?: number;
  highestBid?: string;
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
    collateralValue: '1000',
    views: 1250,
    likes: 89,
    lastSale: '0.6',
    floorPrice: '0.45',
    volume24h: '12.5',
    traits: [
      { name: 'Background', value: 'Cosmic', rarity: 5 },
      { name: 'Eyes', value: 'Laser', rarity: 3 },
      { name: 'Accessory', value: 'Golden Crown', rarity: 1 }
    ],
    isFavorite: true,
    isVerified: true,
    auctionEnd: '2024-02-15T18:00:00Z',
    bidCount: 12,
    highestBid: '0.55'
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
    collateralValue: '750',
    views: 890,
    likes: 67,
    lastSale: '0.35',
    floorPrice: '0.28',
    volume24h: '8.2',
    traits: [
      { name: 'Background', value: 'Forest', rarity: 8 },
      { name: 'Eyes', value: 'Green', rarity: 6 },
      { name: 'Accessory', value: 'Shield', rarity: 4 }
    ],
    isFavorite: false,
    isVerified: true
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
    collateralValue: '500',
    views: 650,
    likes: 45,
    lastSale: '0.22',
    floorPrice: '0.18',
    volume24h: '5.8',
    traits: [
      { name: 'Background', value: 'Battle', rarity: 12 },
      { name: 'Eyes', value: 'Red', rarity: 8 },
      { name: 'Accessory', value: 'Sword', rarity: 6 }
    ],
    isFavorite: false,
    isVerified: false
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
    collateralValue: '250',
    views: 320,
    likes: 23,
    lastSale: '0.12',
    floorPrice: '0.08',
    volume24h: '2.1',
    traits: [
      { name: 'Background', value: 'Farm', rarity: 25 },
      { name: 'Eyes', value: 'Blue', rarity: 20 },
      { name: 'Accessory', value: 'Hat', rarity: 15 }
    ],
    isFavorite: false,
    isVerified: false
  }
];

export const NFTMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my-nfts' | 'collateral'>('marketplace');
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rarity' | 'views' | 'likes' | 'volume'>('price');
  const [filterRarity, setFilterRarity] = useState<'all' | 'common' | 'rare' | 'epic' | 'legendary'>('all');
  const [filterCollection, setFilterCollection] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showOnlyCollateral, setShowOnlyCollateral] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-white';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleBuy = async (nft: NFT) => {
    try {
      console.log(`Initiating purchase of ${nft.name} for ${nft.price} ETH`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Successfully purchased ${nft.name}!`);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleUseAsCollateral = async (nft: NFT) => {
    try {
      console.log(`Using ${nft.name} as collateral for ${nft.collateralValue} USDT loan`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Successfully set ${nft.name} as collateral!`);
    } catch (error) {
      console.error('Collateral setup failed:', error);
    }
  };

  const toggleFavorite = async (nftId: string) => {
    try {
      console.log(`Toggling favorite for NFT ${nftId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Favorite status updated for NFT ${nftId}`);
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  // Get unique collections for filter
  const collections = Array.from(new Set(mockNFTs.map(nft => nft.collection)));

  // Filter and sort NFTs
  const filteredNFTs = mockNFTs
    .filter(nft => {
      if (searchQuery && !nft.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !nft.collection.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterRarity !== 'all' && nft.rarity !== filterRarity) return false;
      if (filterCollection !== 'all' && nft.collection !== filterCollection) return false;
      if (showOnlyVerified && !nft.isVerified) return false;
      if (showOnlyCollateral && !nft.isCollateral) return false;
      const price = parseFloat(nft.price);
      if (price < priceRange[0] || price > priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'rarity':
          const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'volume':
          return parseFloat(b.volume24h || '0') - parseFloat(a.volume24h || '0');
        default:
          return 0;
      }
    });

  const renderNFTCard = (nft: NFT) => (
    <Card key={nft.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group">
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {nft.isVerified && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
          )}
          {nft.isCollateral && (
            <div className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full font-medium">
              Collateral
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <button
            onClick={() => toggleFavorite(nft.id)}
            className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${nft.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Eye className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        {nft.auctionEnd && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
              <div className="flex items-center justify-between">
                <span>Auction ends:</span>
                <span className="font-medium">{new Date(nft.auctionEnd).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-sm truncate text-gray-900">{nft.name}</h3>
            <p className="text-xs text-gray-600 mt-1">{nft.collection}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)} shadow-sm ml-2`}>
            {nft.rarity.toUpperCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Price</p>
            <p className="text-sm font-bold text-gray-900">{nft.price} ETH</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Floor</p>
            <p className="text-sm font-bold text-gray-900">{nft.floorPrice} ETH</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{nft.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{nft.likes}</span>
            </div>
          </div>
          {nft.volume24h && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{nft.volume24h} ETH</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button 
            onClick={() => handleBuy(nft)}
            className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            size="sm"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
          {nft.auctionEnd && (
            <Button 
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              size="sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              Place Bid ({nft.bidCount} bids)
            </Button>
          )}
          <Button 
            onClick={() => handleUseAsCollateral(nft)}
            variant="outline"
            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
            size="sm"
          >
            <Target className="w-4 h-4 mr-2" />
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

      {/* Search and Filters */}
      {activeTab === 'marketplace' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NFTs, collections..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>

              <select
                value={filterCollection}
                onChange={(e) => setFilterCollection(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Collections</option>
                {collections.map(collection => (
                  <option key={collection} value={collection}>{collection}</option>
                ))}
              </select>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOnlyVerified}
                  onChange={(e) => setShowOnlyVerified(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Verified Only</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOnlyCollateral}
                  onChange={(e) => setShowOnlyCollateral(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Collateral Only</span>
              </label>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="price">Price</option>
                  <option value="rarity">Rarity</option>
                  <option value="views">Views</option>
                  <option value="likes">Likes</option>
                  <option value="volume">Volume</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'} gap-6`}>
          {filteredNFTs.map(renderNFTCard)}
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
                <div className="text-center p-6 bg-gradient-to-br from-white to-orange-50 rounded-xl border border-orange-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">50%</p>
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
