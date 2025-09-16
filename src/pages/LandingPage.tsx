import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const LandingPage = () => {
  return (
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
            <Link to="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Demo</CardTitle>
            <CardDescription>QR code payment system</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/payment-demo">
              <Button className="w-full">Try Payment</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kaia Payments</CardTitle>
            <CardDescription>Kaia blockchain payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/kaia-payments">
              <Button className="w-full">Kaia Pay</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DeFi Demo</CardTitle>
            <CardDescription>Yield farming and staking</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/kaia-defi">
              <Button className="w-full">Start Farming</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trade & Earn</CardTitle>
            <CardDescription>Trading with rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/trade-earn">
              <Button className="w-full">Start Trading</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification</CardTitle>
            <CardDescription>Token management</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/verification">
              <Button className="w-full">Manage Tokens</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LandingPage