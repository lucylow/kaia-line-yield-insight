# LINE Yield Platform - Routing Guide

This guide explains the improved routing system implemented for the LINE Yield DApp using React Router v6.

## Overview

The routing system has been completely redesigned to provide:
- **URL-based navigation** with proper browser history support
- **Route guards** for authentication
- **Nested routing** for complex features
- **Code splitting** for better performance
- **Breadcrumb navigation** for better UX
- **Smooth transitions** between pages

## Route Structure

### Public Routes
- `/` - Landing page
- `/landing` - Alternative landing page route

### Protected Routes (Require Wallet Connection)
All protected routes are prefixed with `/app/`:

- `/app/dashboard` - Main dashboard
- `/app/analytics` - Analytics dashboard
- `/app/realtime` - Real-time data dashboard
- `/app/profile` - User profile
- `/app/settings` - User settings

### Feature-Specific Routes

#### Yield Strategies (`/app/strategies/*`)
- `/app/strategies` - Overview of all strategies
- `/app/strategies/create` - Create new strategy
- `/app/strategies/manage` - Manage existing strategies
- `/app/strategies/analytics` - Strategy performance analytics

#### NFT Marketplace (`/app/nft/*`)
- `/app/nft` - NFT marketplace overview
- `/app/nft/create` - Create new NFT
- `/app/nft/my-nfts` - User's NFT collection
- `/app/nft/collections` - Browse collections

#### Trading (`/app/trading/*`)
- `/app/trading` - Trading overview
- `/app/trading/swap` - Token swap interface
- `/app/trading/portfolio` - Portfolio management
- `/app/trading/history` - Trading history

#### Other Features
- `/app/referral` - Referral system
- `/app/transactions` - Transaction history
- `/app/payments` - Payment system
- `/app/wallet-demo` - Wallet connection demo

## Key Components

### 1. Route Configuration (`src/router/routes.tsx`)
Central configuration for all routes with lazy loading:

```typescript
export const routeConfig = {
  public: [
    { path: '/', label: 'Home', icon: '🏠', exact: true },
    { path: '/landing', label: 'Landing', icon: '🏠' },
  ],
  protected: [
    { path: '/app/dashboard', label: 'Dashboard', icon: '📊', exact: true },
    // ... more routes
  ],
  nested: {
    strategies: [
      { path: '/app/strategies', label: 'Overview', icon: '📊' },
      { path: '/app/strategies/create', label: 'Create Strategy', icon: '➕' },
      // ... more nested routes
    ],
  },
};
```

### 2. Protected Route Component (`src/router/ProtectedRoute.tsx`)
Handles authentication and wallet connection:

```typescript
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected, isLoading } = useWallet();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isConnected) return <WalletConnectionPrompt />;
  
  return <>{children}</>;
};
```

### 3. App Layout (`src/layouts/AppLayout.tsx`)
Main layout wrapper for protected routes with:
- Mobile navigation
- Desktop sidebar
- Breadcrumb navigation
- Route transitions
- Footer

### 4. Router Navigation (`src/components/RouterNavigation.tsx`)
Smart navigation components that:
- Automatically detect current route
- Highlight active navigation items
- Handle mobile/desktop differences
- Integrate with wallet connection status

## Navigation Hooks

### useNavigation Hook
Provides utilities for programmatic navigation:

```typescript
const {
  goToRoute,
  goBack,
  goForward,
  getCurrentRoute,
  getCurrentRouteConfig,
  getBreadcrumbs,
  isActiveRoute,
  isProtectedRoute,
  isPublicRoute,
  currentPath
} = useNavigation();
```

### useBreadcrumbs Hook
Generates breadcrumb navigation:

```typescript
const breadcrumbs = useBreadcrumbs();
// Returns: [{ label: 'Home', path: '/' }, { label: 'Dashboard', path: '/app/dashboard' }]
```

## Route Transitions

### RouteTransition Component
Provides smooth transitions between routes:

```typescript
<RouteTransition>
  <Outlet />
</RouteTransition>
```

### PageTransition Component
Different transition types available:
- `fade` - Fade in/out
- `slide` - Slide from right
- `scale` - Scale in/out
- `none` - No transition

## Authentication Flow

1. **Public Routes**: Accessible without wallet connection
2. **Protected Routes**: Require wallet connection
   - If not connected: Show wallet connection prompt
   - If connected: Render the protected content
3. **Route Guards**: Automatically redirect based on authentication state

## Code Splitting

All routes use lazy loading for better performance:

```typescript
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
```

## URL Structure Benefits

### SEO Friendly
- Each page has a unique URL
- Search engines can index individual pages
- Better social media sharing

### User Experience
- Browser back/forward buttons work correctly
- Users can bookmark specific pages
- Direct links to features work properly

### Development Benefits
- Clear separation of concerns
- Easy to add new routes
- Consistent navigation patterns

## Adding New Routes

### 1. Simple Route
Add to `routeConfig.protected`:

```typescript
{ path: '/app/new-feature', label: 'New Feature', icon: '🆕' }
```

### 2. Nested Routes
Create a new routes file:

```typescript
// src/pages/NewFeature/routes.tsx
export const NewFeatureRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="create" element={<Create />} />
      <Route path="manage" element={<Manage />} />
    </Routes>
  );
};
```

### 3. Update Route Configuration
Add to `routeConfig.nested`:

```typescript
newFeature: [
  { path: '/app/new-feature', label: 'Overview', icon: '📊' },
  { path: '/app/new-feature/create', label: 'Create', icon: '➕' },
  { path: '/app/new-feature/manage', label: 'Manage', icon: '⚙️' },
]
```

## Best Practices

### 1. Route Naming
- Use kebab-case for URLs: `/app/yield-strategies`
- Keep URLs descriptive and user-friendly
- Avoid deep nesting (max 3 levels)

### 2. Component Organization
- One component per route
- Lazy load all route components
- Use consistent file naming

### 3. Navigation
- Always use `useNavigate()` for programmatic navigation
- Don't use `window.location.href` for internal navigation
- Provide fallback routes for 404 errors

### 4. Performance
- Lazy load all route components
- Use route-based code splitting
- Implement proper loading states

## Migration from Old System

The old tab-based navigation has been replaced with proper URL routing:

### Before (Tab-based)
```typescript
const [activeTab, setActiveTab] = useState('dashboard');
// No URL changes, no browser history
```

### After (Route-based)
```typescript
const navigate = useNavigate();
navigate('/app/dashboard');
// URL changes, browser history works, bookmarkable
```

## Troubleshooting

### Common Issues

1. **Route not found**: Check route configuration and file paths
2. **Navigation not working**: Ensure `useNavigate()` is used correctly
3. **Authentication issues**: Verify `ProtectedRoute` wrapper
4. **Lazy loading errors**: Check import paths and default exports

### Debug Tools

1. **React Router DevTools**: Install browser extension
2. **Console logging**: Use `useLocation()` to debug current route
3. **Network tab**: Check for failed lazy loading

## Future Enhancements

1. **Route-based analytics**: Track page views per route
2. **Dynamic route generation**: Generate routes from API
3. **Route-based caching**: Cache data per route
4. **Advanced transitions**: More sophisticated page transitions
5. **Route-based permissions**: Fine-grained access control

---

This routing system provides a solid foundation for the LINE Yield platform's navigation and can easily scale as new features are added.
