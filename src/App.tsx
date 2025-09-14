import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'

// Import pages
import LandingPage from '@/pages/LandingPage'
import QRPaymentPage from '@/pages/QRPaymentPage'
import KaiaPaymentPage from '@/pages/KaiaPaymentPage'
import MiniDappDemo from '@/pages/MiniDappDemo'
import TradePage from '@/pages/TradePage'
import TokenManagementPage from '@/pages/TokenManagementPage'
import DashboardPage from '@/pages/DashboardPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/payment-demo" element={<QRPaymentPage />} />
            <Route path="/kaia-payments" element={<KaiaPaymentPage />} />
            <Route path="/kaia-defi" element={<MiniDappDemo />} />
            <Route path="/trade-earn" element={<TradePage />} />
            <Route path="/verification" element={<TokenManagementPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App