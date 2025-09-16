import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({ 
  children, 
  className 
}) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        isTransitioning 
          ? 'opacity-0 transform translate-x-4' 
          : 'opacity-100 transform translate-x-0',
        className
      )}
    >
      {children}
    </div>
  );
};

// Page transition wrapper with different animation types
interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'none';
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  type = 'fade',
  className 
}) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  const getTransitionClasses = () => {
    switch (type) {
      case 'fade':
        return isTransitioning 
          ? 'opacity-0' 
          : 'opacity-100';
      case 'slide':
        return isTransitioning 
          ? 'opacity-0 transform translate-x-8' 
          : 'opacity-100 transform translate-x-0';
      case 'scale':
        return isTransitioning 
          ? 'opacity-0 transform scale-95' 
          : 'opacity-100 transform scale-100';
      case 'none':
        return '';
      default:
        return isTransitioning 
          ? 'opacity-0' 
          : 'opacity-100';
    }
  };

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        getTransitionClasses(),
        className
      )}
    >
      {children}
    </div>
  );
};
