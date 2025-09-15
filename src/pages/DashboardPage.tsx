import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value</CardTitle>
            <p className="text-sm text-muted-foreground">Total assets under management</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$12,345.67</p>
            <p className="text-sm text-green-600">+5.23% (24h)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Positions</CardTitle>
            <p className="text-sm text-muted-foreground">Current yield farming positions</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Across 2 protocols</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Earned</CardTitle>
            <p className="text-sm text-muted-foreground">Rewards earned this month</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$456.78</p>
            <p className="text-sm text-muted-foreground">15.2% APY average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage