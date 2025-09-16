import { useNavigate, useLocation } from 'react-router-dom';
import { routeConfig } from '../router/routes';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToRoute = (path: string) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const getCurrentRoute = () => {
    return location.pathname;
  };

  const getCurrentRouteConfig = () => {
    const currentPath = location.pathname;
    
    // Check protected routes
    const protectedRoute = routeConfig.protected.find(route => 
      route.path === currentPath || currentPath.startsWith(route.path + '/')
    );
    
    if (protectedRoute) {
      return protectedRoute;
    }

    // Check public routes
    const publicRoute = routeConfig.public.find(route => 
      route.path === currentPath
    );
    
    if (publicRoute) {
      return publicRoute;
    }

    return null;
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', path: '/', icon: '🏠' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        path: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isProtectedRoute = () => {
    return location.pathname.startsWith('/app');
  };

  const isPublicRoute = () => {
    return !isProtectedRoute();
  };

  return {
    goToRoute,
    goBack,
    goForward,
    getCurrentRoute,
    getCurrentRouteConfig,
    getBreadcrumbs,
    isActiveRoute,
    isProtectedRoute,
    isPublicRoute,
    currentPath: location.pathname,
  };
};
