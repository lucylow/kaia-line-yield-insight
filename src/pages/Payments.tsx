import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Payments: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Payment System
        </h1>
        <p className="text-lg text-gray-600">QR code payments and blockchain transactions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">QR Code Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Generate QR codes for instant payments</p>
            <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Generate QR Code
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Kaia Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Send payments on Kaia blockchain</p>
            <Button className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300" variant="outline">
              Send Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
