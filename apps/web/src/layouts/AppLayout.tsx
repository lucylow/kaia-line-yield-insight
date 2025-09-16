import React from 'react';
import { Outlet } from 'react-router-dom';
import { SimpleNavigation } from '../components/SimpleNavigation';
import { Breadcrumb } from '../components/Breadcrumb';
import { RouteTransition } from '../components/RouteTransition';
import { NetworkBanner } from '../components/NetworkBanner';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <SimpleNavigation />

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        {/* Network Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <NetworkBanner />
        </div>

        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb />
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
          <RouteTransition>
            <Outlet />
          </RouteTransition>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/app/strategies" className="hover:text-emerald-600 transition-colors">Yield Farming</a></li>
                <li><a href="/app/nft" className="hover:text-emerald-600 transition-colors">NFT Marketplace</a></li>
                <li><a href="/app/referral" className="hover:text-emerald-600 transition-colors">Referral Program</a></li>
                <li><a href="/app/payments" className="hover:text-emerald-600 transition-colors">Payment System</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Security Audit</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Discord</a></li>
                <li><a href="#" className="hover:text-gray-900">Telegram</a></li>
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Bug Reports</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">
                © 2024 LINE Yield Platform. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
