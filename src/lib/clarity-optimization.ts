/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

import clarityService from './clarity';

/**
 * Estratégias avançadas de otimização para conversões usando Microsoft Clarity
 */

interface ConversionOptimizationConfig {
  /** Tempo limite para considerar uma sessão como "engajada" (em ms) */
  engagementThreshold: number;
  /** Porcentagem de scroll para considerar como "interessado" */
  interestScrollThreshold: number;
  /** Tempo mínimo em formulários para considerar como "intent" */
  formIntentThreshold: number;
  /** Número de cliques em CTAs para considerar como "alta intenção" */
  highIntentCTAClicks: number;
}

class ClarityOptimizationService {
  private config: ConversionOptimizationConfig;
  private sessionData: {
    startTime: number;
    ctaClicks: number;
    maxScrollDepth: number;
    formInteractions: number;
    pageViews: number;
    timeOnForms: number;
  };

  constructor(config?: Partial<ConversionOptimizationConfig>) {
    this.config = {
      engagementThreshold: 30000, // 30 segundos
      interestScrollThreshold: 50, // 50% de scroll
      formIntentThreshold: 10000, // 10 segundos em formulários
      highIntentCTAClicks: 3, // 3 cliques em CTAs
      ...config,
    };

    this.sessionData = {
      startTime: Date.now(),
      ctaClicks: 0,
      maxScrollDepth: 0,
      formInteractions: 0,
      pageViews: 1,
      timeOnForms: 0,
    };

    this.initializeOptimizationTracking();
  }

  /**
   * Inicializa o tracking otimizado para conversões
   */
  private initializeOptimizationTracking(): void {
    // Track session quality baseado em engagement
    this.trackSessionQuality();
    
    // Track user intent baseado em comportamento
    this.trackUserIntent();
    
    // Track conversion funnel
    this.trackConversionFunnel();
    
    // Track performance metrics que afetam conversão
    this.trackPerformanceMetrics();
  }

  /**
   * Rastreia qualidade da sessão para otimização
   */
  private trackSessionQuality(): void {
    const checkEngagement = () => {
      const sessionDuration = Date.now() - this.sessionData.startTime;
      
      if (sessionDuration > this.config.engagementThreshold) {
        const qualityScore = this.calculateSessionQuality();
        
        clarityService.trackConversion({
          eventName: 'session_quality_assessment',
          properties: {
            session_duration: sessionDuration,
            quality_score: qualityScore,
            engagement_level: this.getEngagementLevel(qualityScore),
            cta_clicks: this.sessionData.ctaClicks,
            max_scroll_depth: this.sessionData.maxScrollDepth,
            form_interactions: this.sessionData.formInteractions,
            page_views: this.sessionData.pageViews,
          },
        });
      }
    };

    // Check engagement a cada 30 segundos
    setInterval(checkEngagement, 30000);
  }

  /**
   * Calcula score de qualidade da sessão
   */
  private calculateSessionQuality(): number {
    let score = 0;
    
    // Pontuação baseada em tempo na página
    const sessionDuration = Date.now() - this.sessionData.startTime;
    score += Math.min(sessionDuration / 60000, 5) * 20; // Max 100 pontos para 5+ minutos
    
    // Pontuação baseada em scroll depth
    score += (this.sessionData.maxScrollDepth / 100) * 30; // Max 30 pontos
    
    // Pontuação baseada em cliques em CTA
    score += Math.min(this.sessionData.ctaClicks * 15, 45); // Max 45 pontos
    
    // Pontuação baseada em interações com formulários
    score += Math.min(this.sessionData.formInteractions * 10, 25); // Max 25 pontos
    
    return Math.min(score, 100);
  }

  /**
   * Determina nível de engagement baseado no score
   */
  private getEngagementLevel(score: number): string {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    if (score >= 25) return 'low';
    return 'very_low';
  }

  /**
   * Rastreia intenção do usuário baseada em comportamento
   */
  private trackUserIntent(): void {
    // Track high-intent behaviors
    const trackHighIntent = () => {
      const indicators = [];
      
      if (this.sessionData.ctaClicks >= this.config.highIntentCTAClicks) {
        indicators.push('multiple_cta_clicks');
      }
      
      if (this.sessionData.maxScrollDepth >= this.config.interestScrollThreshold) {
        indicators.push('deep_scroll');
      }
      
      if (this.sessionData.timeOnForms >= this.config.formIntentThreshold) {
        indicators.push('form_engagement');
      }
      
      if (indicators.length >= 2) {
        clarityService.trackConversion({
          eventName: 'high_intent_user_identified',
          properties: {
            intent_indicators: indicators,
            session_duration: Date.now() - this.sessionData.startTime,
            conversion_probability: this.calculateConversionProbability(),
          },
        });
      }
    };

    // Check intent a cada 15 segundos
    setInterval(trackHighIntent, 15000);
  }

  /**
   * Calcula probabilidade de conversão baseada em comportamento
   */
  private calculateConversionProbability(): number {
    let probability = 0;
    
    // Base probability
    probability += 10;
    
    // CTA clicks influence
    probability += this.sessionData.ctaClicks * 15;
    
    // Scroll depth influence
    probability += (this.sessionData.maxScrollDepth / 100) * 20;
    
    // Form interaction influence
    probability += this.sessionData.formInteractions * 25;
    
    // Time on site influence
    const sessionMinutes = (Date.now() - this.sessionData.startTime) / 60000;
    probability += Math.min(sessionMinutes * 5, 30);
    
    return Math.min(probability, 100);
  }

  /**
   * Rastreia funil de conversão
   */
  private trackConversionFunnel(): void {
    const funnelSteps = [
      { name: 'awareness', trigger: () => this.sessionData.maxScrollDepth >= 25 },
      { name: 'interest', trigger: () => this.sessionData.maxScrollDepth >= 50 },
      { name: 'consideration', trigger: () => this.sessionData.ctaClicks >= 1 },
      { name: 'intent', trigger: () => this.sessionData.formInteractions >= 1 },
      { name: 'evaluation', trigger: () => this.sessionData.timeOnForms >= 5000 },
    ];

    funnelSteps.forEach(step => {
      if (step.trigger()) {
        clarityService.trackConversion({
          eventName: `funnel_${step.name}`,
          properties: {
            funnel_step: step.name,
            session_data: this.sessionData,
            timestamp: Date.now(),
          },
        });
      }
    });
  }

  /**
   * Rastreia métricas de performance que afetam conversão
   */
  private trackPerformanceMetrics(): void {
    // Track page load performance
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      clarityService.trackConversion({
        eventName: 'page_performance_metrics',
        properties: {
          load_time: perfData.loadEventEnd - perfData.loadEventStart,
          dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          first_paint: performance.getEntriesByType('paint')[0]?.startTime || 0,
          page_size: document.documentElement.innerHTML.length,
          connection_type: (navigator as any).connection?.effectiveType || 'unknown',
        },
      });
    });

    // Track Core Web Vitals
    this.trackCoreWebVitals();
  }

  /**
   * Rastreia Core Web Vitals
   */
  private trackCoreWebVitals(): void {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      clarityService.trackConversion({
        eventName: 'core_web_vital_lcp',
        properties: {
          value: lastEntry.startTime,
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor',
        },
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        clarityService.trackConversion({
          eventName: 'core_web_vital_fid',
          properties: {
            value: (entry as any).processingStart - entry.startTime,
            rating: (entry as any).processingStart - entry.startTime < 100 ? 'good' : 
                   (entry as any).processingStart - entry.startTime < 300 ? 'needs_improvement' : 'poor',
          },
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      
      clarityService.trackConversion({
        eventName: 'core_web_vital_cls',
        properties: {
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor',
        },
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * Atualiza dados da sessão
   */
  updateSessionData(updates: Partial<typeof this.sessionData>): void {
    this.sessionData = { ...this.sessionData, ...updates };
  }

  /**
   * Incrementa contador de cliques em CTA
   */
  incrementCTAClicks(): void {
    this.sessionData.ctaClicks++;
  }

  /**
   * Atualiza profundidade máxima de scroll
   */
  updateMaxScrollDepth(depth: number): void {
    this.sessionData.maxScrollDepth = Math.max(this.sessionData.maxScrollDepth, depth);
  }

  /**
   * Incrementa interações com formulários
   */
  incrementFormInteractions(): void {
    this.sessionData.formInteractions++;
  }

  /**
   * Adiciona tempo gasto em formulários
   */
  addFormTime(time: number): void {
    this.sessionData.timeOnForms += time;
  }

  /**
   * Incrementa visualizações de página
   */
  incrementPageViews(): void {
    this.sessionData.pageViews++;
  }
}

// Instância singleton
export const clarityOptimization = new ClarityOptimizationService();

export default clarityOptimization;