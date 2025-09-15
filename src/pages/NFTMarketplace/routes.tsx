import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NFTMarketplace } from '../../components/NFTMarketplace';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const NFTMarketplaceOverview: React.FC = () => {
  return <NFTMarketplace />;
};

const CreateNFT: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Create NFT
        </h1>
        <p className="text-lg text-gray-600">Mint your own NFT on Kaia blockchain</p>
      </div>
      
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">NFT Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">NFT Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter NFT name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            <textarea 
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Describe your NFT"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Drag and drop your image here, or click to browse</p>
              <Button variant="outline" className="mt-4">
                Choose File
              </Button>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Create NFT
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const MyNFTs: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          My NFTs
        </h1>
        <p className="text-lg text-gray-600">Manage your NFT collection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg mb-4"></div>
              <CardTitle className="text-lg font-bold">NFT #{i}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-sm font-bold text-emerald-600">0.5 ETH</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Sell
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Collections: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Collections
        </h1>
        <p className="text-lg text-gray-600">Browse NFT collections</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Art Collection', 'Gaming NFTs', 'Utility Tokens'].map((collection, i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4"></div>
              <CardTitle className="text-lg font-bold">{collection}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Items</span>
                <span className="text-sm font-bold">{Math.floor(Math.random() * 1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Floor Price</span>
                <span className="text-sm font-bold text-emerald-600">0.2 ETH</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                View Collection
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const NFTMarketplaceRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<NFTMarketplaceOverview />} />
      <Route path="create" element={<CreateNFT />} />
      <Route path="my-nfts" element={<MyNFTs />} />
      <Route path="collections" element={<Collections />} />
    </Routes>
  );
};
