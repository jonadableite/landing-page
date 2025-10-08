// Analytics System - SOLID Design Pattern
// Single Responsibility: Each class handles one analytics provider
// Open/Closed: Easy to extend with new providers
// Liskov Substitution: All providers implement same interface
// Interface Segregation: Clean, focused interfaces
// Dependency Inversion: Depends on abstractions, not concretions

export interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
  value?: number;
  currency?: string;
}

export interface AnalyticsProvider {
  initialize(): Promise<void>;
  track(event: AnalyticsEvent): void;
  identify(userId: string, traits?: Record<string, any>): void;
  page(name?: string, properties?: Record<string, any>): void;
}

// Google Tag Manager Provider
export class GTMProvider implements AnalyticsProvider {
  private containerId: string;
  private isInitialized = false;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${this.containerId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', this.containerId);

    this.isInitialized = true;
  }

  track(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    (window as any).gtag('event', event.name, {
      ...event.parameters,
      value: event.value,
      currency: event.currency || 'BRL',
    });
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    (window as any).gtag('config', this.containerId, {
      user_id: userId,
      custom_map: traits,
    });
  }

  page(name?: string, properties?: Record<string, any>): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    (window as any).gtag('event', 'page_view', {
      page_title: name,
      ...properties,
    });
  }
}

// Facebook Pixel Provider
export class FacebookPixelProvider implements AnalyticsProvider {
  private pixelId: string;
  private isInitialized = false;

  constructor(pixelId: string) {
    this.pixelId = pixelId;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load Facebook Pixel
    !(function(f: any, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    (window as any).fbq('init', this.pixelId);
    (window as any).fbq('track', 'PageView');

    this.isInitialized = true;
  }

  track(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    const fbEventName = this.mapEventName(event.name);
    (window as any).fbq('track', fbEventName, {
      ...event.parameters,
      value: event.value,
      currency: event.currency || 'BRL',
    });
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    (window as any).fbq('init', this.pixelId, {
      external_id: userId,
      ...traits,
    });
  }

  page(name?: string, properties?: Record<string, any>): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;

    (window as any).fbq('track', 'PageView', {
      page_name: name,
      ...properties,
    });
  }

  private mapEventName(eventName: string): string {
    const eventMap: Record<string, string> = {
      'cta_click': 'Lead',
      'checkout_start': 'InitiateCheckout',
      'purchase': 'Purchase',
      'signup': 'CompleteRegistration',
      'view_pricing': 'ViewContent',
      'add_to_cart': 'AddToCart',
    };

    return eventMap[eventName] || 'CustomEvent';
  }
}

// Analytics Manager - Facade Pattern
export class AnalyticsManager {
  private providers: AnalyticsProvider[] = [];
  private isInitialized = false;

  addProvider(provider: AnalyticsProvider): void {
    this.providers.push(provider);
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    await Promise.all(
      this.providers.map(provider => provider.initialize())
    );

    this.isInitialized = true;
  }

  track(event: AnalyticsEvent): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      try {
        provider.track(event);
      } catch (error) {
        console.warn('Analytics tracking error:', error);
      }
    });
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      try {
        provider.identify(userId, traits);
      } catch (error) {
        console.warn('Analytics identify error:', error);
      }
    });
  }

  page(name?: string, properties?: Record<string, any>): void {
    if (!this.isInitialized) return;

    this.providers.forEach(provider => {
      try {
        provider.page(name, properties);
      } catch (error) {
        console.warn('Analytics page error:', error);
      }
    });
  }
}

// Singleton Analytics Instance
let analyticsInstance: AnalyticsManager | null = null;

export const getAnalytics = (): AnalyticsManager => {
  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsManager();
    
    // Add providers based on environment variables
    const gtmId = import.meta.env.VITE_GTM_ID;
    const fbPixelId = import.meta.env.VITE_FB_PIXEL_ID;

    if (gtmId) {
      analyticsInstance.addProvider(new GTMProvider(gtmId));
    }

    if (fbPixelId) {
      analyticsInstance.addProvider(new FacebookPixelProvider(fbPixelId));
    }
  }

  return analyticsInstance;
};

// Convenience tracking functions
export const trackEvent = (name: string, parameters?: Record<string, any>, value?: number) => {
  getAnalytics().track({ name, parameters, value });
};

export const trackCTAClick = (location: string, plan?: string, utm?: Record<string, string>) => {
  trackEvent('cta_click', {
    location,
    plan,
    ...utm,
  });
};

export const trackCheckoutStart = (plan: string, value: number) => {
  trackEvent('checkout_start', { plan }, value);
};

export const trackPurchase = (plan: string, value: number, transactionId: string) => {
  trackEvent('purchase', {
    plan,
    transaction_id: transactionId,
  }, value);
};

export const trackPageView = (pageName: string, utm?: Record<string, string>) => {
  getAnalytics().page(pageName, utm);
};

// Initialize Analytics - convenience function
export const initializeAnalytics = async (): Promise<void> => {
  try {
    await getAnalytics().initialize();
  } catch (error) {
    console.warn('Failed to initialize analytics:', error);
  }
};