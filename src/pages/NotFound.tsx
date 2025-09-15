import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl">404</span>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-gray-600">
            <p className="mb-4">
              Sorry, the page you're looking for doesn't exist.
            </p>
            <p className="text-sm">
              The page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link to="/app/dashboard">
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Go to Dashboard
              </Button>
            </Link>
            
            <Link to="/">
              <Button 
                variant="outline"
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            <p>If you believe this is an error, please contact support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;