import React, { Component, ErrorInfo, ReactNode } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Copy, 
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
  isReporting: boolean;
  isReported: boolean;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
      isReporting: false,
      isReported: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto-report critical errors
    if (this.isCriticalError(error)) {
      this.reportError(error, errorInfo);
    }
  }

  private isCriticalError(error: Error): boolean {
    const criticalPatterns = [
      /chunk/i,
      /loading/i,
      /network/i,
      /timeout/i,
      /connection/i,
    ];
    
    return criticalPatterns.some(pattern => 
      pattern.test(error.message) || pattern.test(error.name)
    );
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo) => {
    if (this.state.isReporting || this.state.isReported) return;

    this.setState({ isReporting: true });

    try {
      const errorReport = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: this.getUserId(),
        sessionId: this.getSessionId(),
      };

      // In a real application, you would send this to your error reporting service
      console.log('Error report:', errorReport);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.setState({ isReported: true });
    } catch (reportError) {
      console.error('Failed to report error:', reportError);
    } finally {
      this.setState({ isReporting: false });
    }
  };

  private getUserId(): string {
    // In a real app, get from auth context or localStorage
    return localStorage.getItem('userId') || 'anonymous';
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private copyErrorDetails = async () => {
    const errorDetails = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
      // You could show a toast notification here
      console.log('Error details copied to clipboard');
    } catch (err) {
      console.error('Failed to copy error details:', err);
    }
  };

  private getErrorType(error: Error): 'network' | 'chunk' | 'runtime' | 'unknown' {
    if (error.message.includes('Loading chunk') || error.message.includes('ChunkLoadError')) {
      return 'chunk';
    }
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return 'network';
    }
    if (error.message.includes('TypeError') || error.message.includes('ReferenceError')) {
      return 'runtime';
    }
    return 'unknown';
  }

  private getErrorIcon(errorType: string) {
    switch (errorType) {
      case 'network':
        return <XCircle className="w-12 h-12 text-red-600" />;
      case 'chunk':
        return <RefreshCw className="w-12 h-12 text-yellow-600" />;
      case 'runtime':
        return <Bug className="w-12 h-12 text-purple-600" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-red-600" />;
    }
  }

  private getErrorTitle(errorType: string) {
    switch (errorType) {
      case 'network':
        return 'Network Error';
      case 'chunk':
        return 'Loading Error';
      case 'runtime':
        return 'Application Error';
      default:
        return 'Something went wrong';
    }
  }

  private getErrorDescription(errorType: string) {
    switch (errorType) {
      case 'network':
        return 'There was a problem connecting to the server. Please check your internet connection and try again.';
      case 'chunk':
        return 'There was a problem loading the application. This usually happens when the app has been updated.';
      case 'runtime':
        return 'An unexpected error occurred in the application. Our team has been notified.';
      default:
        return 'An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.';
    }
  }

  private getSuggestedActions(errorType: string) {
    switch (errorType) {
      case 'network':
        return [
          { label: 'Check your internet connection', icon: Info },
          { label: 'Try again in a few moments', icon: RefreshCw },
        ];
      case 'chunk':
        return [
          { label: 'Refresh the page to get the latest version', icon: RefreshCw },
          { label: 'Clear your browser cache', icon: Info },
        ];
      case 'runtime':
        return [
          { label: 'Refresh the page', icon: RefreshCw },
          { label: 'Contact support if the problem persists', icon: Info },
        ];
      default:
        return [
          { label: 'Refresh the page', icon: RefreshCw },
          { label: 'Go to home page', icon: Home },
        ];
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorType = this.getErrorType(this.state.error!);
      const suggestedActions = this.getSuggestedActions(errorType);

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-white shadow-lg border border-gray-200">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                {this.getErrorIcon(errorType)}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {this.getErrorTitle(errorType)}
              </CardTitle>
              <p className="text-gray-600">
                {this.getErrorDescription(errorType)}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Error Details</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">ID: {this.state.errorId}</span>
                    <button
                      onClick={this.copyErrorDetails}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy error details"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-mono bg-white p-3 rounded border overflow-x-auto">
                  {this.state.error?.message}
                </div>
              </div>

              {/* Suggested Actions */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Suggested Actions</h3>
                <div className="space-y-2">
                  {suggestedActions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                      <action.icon className="w-4 h-4 text-gray-400" />
                      <span>{action.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {this.state.retryCount < this.maxRetries && (
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again ({this.maxRetries - this.state.retryCount} attempts left)
                  </Button>
                )}
                
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Page
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Error Reporting Status */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Error reporting status:</span>
                  <div className="flex items-center space-x-2">
                    {this.state.isReporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                        <span className="text-blue-600">Reporting...</span>
                      </>
                    ) : this.state.isReported ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Reported</span>
                      </>
                    ) : (
                      <>
                        <Info className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Not reported</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Development Info */}
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <summary className="font-medium text-red-800 cursor-pointer">
                    Development Error Details
                  </summary>
                  <pre className="mt-2 text-xs text-red-700 overflow-x-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;
