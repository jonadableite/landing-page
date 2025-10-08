// UTM Parameter Management System - SOLID Design
// Single Responsibility: Each class handles specific UTM functionality
// Open/Closed: Easy to extend with new storage providers
// Interface Segregation: Clean interfaces for different concerns

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Ads Click ID
  fbclid?: string; // Facebook Click ID
}

export interface UTMStorage {
  save(params: UTMParameters): void;
  load(): UTMParameters | null;
  clear(): void;
}

// Local Storage Implementation
export class LocalStorageUTM implements UTMStorage {
  private readonly storageKey = 'whatleads_utm_params';
  private readonly expirationKey = 'whatleads_utm_expiry';
  private readonly defaultExpirationDays = 30;

  save(params: UTMParameters): void {
    if (typeof window === 'undefined') return;

    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + this.defaultExpirationDays);

      localStorage.setItem(this.storageKey, JSON.stringify(params));
      localStorage.setItem(this.expirationKey, expirationDate.toISOString());
    } catch (error) {
      console.warn('Failed to save UTM parameters:', error);
    }
  }

  load(): UTMParameters | null {
    if (typeof window === 'undefined') return null;

    try {
      const expirationStr = localStorage.getItem(this.expirationKey);
      if (expirationStr) {
        const expiration = new Date(expirationStr);
        if (new Date() > expiration) {
          this.clear();
          return null;
        }
      }

      const paramsStr = localStorage.getItem(this.storageKey);
      return paramsStr ? JSON.parse(paramsStr) : null;
    } catch (error) {
      console.warn('Failed to load UTM parameters:', error);
      return null;
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.expirationKey);
    } catch (error) {
      console.warn('Failed to clear UTM parameters:', error);
    }
  }
}

// Session Storage Implementation (shorter persistence)
export class SessionStorageUTM implements UTMStorage {
  private readonly storageKey = 'whatleads_utm_session';

  save(params: UTMParameters): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(params));
    } catch (error) {
      console.warn('Failed to save UTM parameters to session:', error);
    }
  }

  load(): UTMParameters | null {
    if (typeof window === 'undefined') return null;

    try {
      const paramsStr = sessionStorage.getItem(this.storageKey);
      return paramsStr ? JSON.parse(paramsStr) : null;
    } catch (error) {
      console.warn('Failed to load UTM parameters from session:', error);
      return null;
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      sessionStorage.removeItem(this.storageKey);
    } catch (error) {
      console.warn('Failed to clear UTM parameters from session:', error);
    }
  }
}

// UTM Manager - Main class for UTM handling
export class UTMManager {
  private storage: UTMStorage;
  private currentParams: UTMParameters | null = null;

  constructor(storage: UTMStorage = new LocalStorageUTM()) {
    this.storage = storage;
    this.initialize();
  }

  private initialize(): void {
    // Load existing UTM parameters
    this.currentParams = this.storage.load();

    // Capture new UTM parameters from URL
    const urlParams = this.extractFromURL();
    if (Object.keys(urlParams).length > 0) {
      // Merge with existing params (new params take precedence)
      this.currentParams = {
        ...this.currentParams,
        ...urlParams,
      };
      this.storage.save(this.currentParams);
    }
  }

  private extractFromURL(): UTMParameters {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMParameters = {};

    // Extract UTM parameters
    const utmKeys: (keyof UTMParameters)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'fbclid',
    ];

    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    return utmParams;
  }

  getParams(): UTMParameters {
    return this.currentParams || {};
  }

  getParam(key: keyof UTMParameters): string | undefined {
    return this.currentParams?.[key];
  }

  setParams(params: Partial<UTMParameters>): void {
    this.currentParams = {
      ...this.currentParams,
      ...params,
    };
    this.storage.save(this.currentParams);
  }

  clearParams(): void {
    this.currentParams = null;
    this.storage.clear();
  }

  // Get formatted string for analytics
  getAnalyticsString(): string {
    const params = this.getParams();
    return Object.entries(params)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join('&');
  }

  // Get source attribution for display
  getSourceAttribution(): string {
    const params = this.getParams();
    
    if (params.gclid) return 'Google Ads';
    if (params.fbclid) return 'Facebook Ads';
    if (params.utm_source) {
      const source = params.utm_source.toLowerCase();
      const medium = params.utm_medium?.toLowerCase();
      
      if (source === 'google' && medium === 'cpc') return 'Google Ads';
      if (source === 'facebook' || source === 'fb') return 'Facebook';
      if (source === 'instagram' || source === 'ig') return 'Instagram';
      if (source === 'youtube') return 'YouTube';
      if (source === 'linkedin') return 'LinkedIn';
      if (source === 'twitter') return 'Twitter';
      if (medium === 'email') return 'Email';
      if (medium === 'social') return 'Social Media';
      
      return params.utm_source;
    }
    
    return 'Direct';
  }

  // Check if traffic is from paid source
  isPaidTraffic(): boolean {
    const params = this.getParams();
    return !!(
      params.gclid ||
      params.fbclid ||
      params.utm_medium?.toLowerCase().includes('cpc') ||
      params.utm_medium?.toLowerCase().includes('paid')
    );
  }

  // Get campaign name for display
  getCampaignName(): string | undefined {
    return this.getParam('utm_campaign');
  }
}

// Singleton instance
let utmManagerInstance: UTMManager | null = null;

export const getUTMManager = (): UTMManager => {
  if (!utmManagerInstance) {
    utmManagerInstance = new UTMManager();
  }
  return utmManagerInstance;
};

// Convenience functions
export const getUTMParams = (): UTMParameters => {
  return getUTMManager().getParams();
};

export const getUTMParam = (key: keyof UTMParameters): string | undefined => {
  return getUTMManager().getParam(key);
};

export const getSourceAttribution = (): string => {
  return getUTMManager().getSourceAttribution();
};

export const isPaidTraffic = (): boolean => {
  return getUTMManager().isPaidTraffic();
};

export const getCampaignName = (): string | undefined => {
  return getUTMManager().getCampaignName();
};

// Hook for React components
export const useUTM = () => {
  const manager = getUTMManager();
  
  return {
    params: manager.getParams(),
    getParam: (key: keyof UTMParameters) => manager.getParam(key),
    sourceAttribution: manager.getSourceAttribution(),
    isPaidTraffic: manager.isPaidTraffic(),
    campaignName: manager.getCampaignName(),
    setParams: (params: Partial<UTMParameters>) => manager.setParams(params),
    clearParams: () => manager.clearParams(),
  };
};