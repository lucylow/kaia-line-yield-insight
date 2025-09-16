import React from 'react';
import { Button, Card, CardHeader, CardContent, CardTitle } from '@shared';
import { Image, Heart, ShoppingCart, Star } from 'lucide-react';

export const NFTMarketplace: React.FC = () => {
  const nfts = [
    {
      id: 1,
      name: 'Kaia Genesis',
      price: '0.5 KAI',
      image: '/api/placeholder/300/300',
      likes: 42,
      rarity: 'Legendary'
    },
    {
      id: 2,
      name: 'LINE Yield Badge',
      price: '0.2 KAI',
      image: '/api/placeholder/300/300',
      likes: 28,
      rarity: 'Rare'
    },
    {
      id: 3,
      name: 'DeFi Warrior',
      price: '1.2 KAI',
      image: '/api/placeholder/300/300',
      likes: 156,
      rarity: 'Epic'
    },
    {
      id: 4,
      name: 'Yield Farmer',
      price: '0.8 KAI',
      image: '/api/placeholder/300/300',
      likes: 89,
      rarity: 'Rare'
    }
  ];

  const getRarityColor = (rarity: string) => {
    const colors = {
      'Common': 'bg-gray-100 text-gray-800',
      'Rare': 'bg-blue-100 text-blue-800',
      'Epic': 'bg-purple-100 text-purple-800',
      'Legendary': 'bg-orange-100 text-orange-800'
    };
    return colors[rarity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NFT Marketplace</h1>
        <p className="text-gray-600">Buy, sell, and trade NFTs on the Kaia blockchain</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
              <Image className="h-16 w-16 text-gray-400" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{nft.name}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                  {nft.rarity}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">{nft.price}</span>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{nft.likes}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full">
                  Make Offer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
