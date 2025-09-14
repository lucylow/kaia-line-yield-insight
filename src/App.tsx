import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Kaia LINE Yield Insight</h1>
          <p className="text-xl text-muted-foreground mb-8">
            DeFi yield farming and trading platform on Kaia blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>View your portfolio and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Go to Dashboard</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Demo</CardTitle>
              <CardDescription>QR code payment system</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Try Payment</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kaia Payments</CardTitle>
              <CardDescription>Kaia blockchain payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Kaia Pay</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App