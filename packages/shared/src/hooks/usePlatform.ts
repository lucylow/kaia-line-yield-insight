import { useState, useEffect } from 'react';

export interface PlatformInfo {
  isLiff: boolean;
  isWeb: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  userAgent: string;
  platform: 'liff' | 'web';
}

export function usePlatform(): PlatformInfo {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isLiff: false,
    isWeb: true,
    isMobile: false,
    isDesktop: true,
    userAgent: '',
    platform: 'web'
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isLiff = typeof window !== 'undefined' && 
      (window as any).liff !== undefined && 
      (window as any).liff.isInClient();
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isDesktop = !isMobile;
    const isWeb = !isLiff;

    setPlatformInfo({
      isLiff,
      isWeb,
      isMobile,
      isDesktop,
      userAgent,
      platform: isLiff ? 'liff' : 'web'
    });
  }, []);

  return platformInfo;
}
