/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

import clarity from '@microsoft/clarity';
import { clarityOptimization } from './clarity-optimization';
import clarityPerformanceOptimizer from './clarity-performance';

interface ClarityConfig {
  projectId: string;
  enableHeatmaps?: boolean;
  enableRecordings?: boolean;
  enableAnalytics?: boolean;
}

interface ConversionEvent {
  eventName: string;
  value?: number;
  currency?: string;
  properties?: Record<string, any>;
}

class ClarityService {
  private isInitialized = false;
  private config: ClarityConfig | null = null;

  /**
   * Inicializa o Microsoft Clarity
   */
  initialize(config: ClarityConfig): void {
    if (this.isInitialized) {
      console.warn('Clarity já foi inicializado');
      return;
    }

    this.config = config;

    try {
      // Inicializar Clarity com o project ID
      clarity.init(config.projectId);

      this.isInitialized = true;
      console.log('Microsoft Clarity inicializado com sucesso');

      // Identificar sessão inicial
      this.identifySession();
    } catch (error) {
      console.error('Erro ao inicializar Microsoft Clarity:', error);
    }
  }

  /**
   * Identifica informações da sessão atual
   */
  private identifySession(): void {
    if (!this.isInitialized) return;

    try {
      // Capturar informações de UTM e referrer
      const urlParams = new URLSearchParams(window.location.search);
      const sessionData: Record<string, any> = {
        page_url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      };

      // Capturar parâmetros UTM
      const utmParams = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
      ];
      utmParams.forEach((param) => {
        const value = urlParams.get(param);
        if (value) {
          sessionData[param] = value;
        }
      });

      // Identificar sessão no Clarity
      clarity('identify', sessionData);
    } catch (error) {
      console.error('Erro ao identificar sessão:', error);
    }
  }

  /**
   * Rastreia eventos de conversão críticos
   */
  trackConversion(event: ConversionEvent): void {
    if (!this.isInitialized) {
      console.warn(
        'Clarity não foi inicializado. Evento não enviado:',
        event.eventName
      );
      return;
    }

    try {
      const eventData = {
        event_name: event.eventName,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        ...event.properties,
      };

      if (event.value !== undefined) {
        eventData.value = event.value;
      }

      if (event.currency) {
        eventData.currency = event.currency;
      }

      clarity('event', event.eventName, eventData);
      console.log('Evento de conversão rastreado:', event.eventName, eventData);
    } catch (error) {
      console.error('Erro ao rastrear evento de conversão:', error);
    }
  }

  /**
   * Rastreia cliques em CTAs com otimizações avançadas
   */
  trackCTAClick(
    ctaName: string,
    ctaLocation: string,
    targetUrl?: string
  ): void {
    // Incrementa contador para otimização
    clarityOptimization.incrementCTAClicks();

    this.trackConversion({
      eventName: 'cta_click',
      properties: {
        cta_name: ctaName,
        cta_location: ctaLocation,
        target_url: targetUrl,
        user_agent: navigator.userAgent,
      },
    });
  }

  /**
   * Rastreia interações com formulários com otimizações
   */
  trackFormStart(formName: string, formLocation: string): void {
    // Incrementa contador para otimização
    clarityOptimization.incrementFormInteractions();

    this.trackConversion({
      eventName: 'form_start',
      properties: {
        form_name: formName,
        form_location: formLocation,
        timestamp: Date.now(),
      },
    });
  }

  /**
   * Rastreia envio de formulário
   */
  trackFormSubmit(
    formName: string,
    formLocation: string,
    success: boolean = true
  ): void {
    this.trackConversion({
      eventName: success ? 'form_submit_success' : 'form_submit_error',
      properties: {
        form_name: formName,
        form_location: formLocation,
      },
    });
  }

  /**
   * Rastreia visualização de página com otimizações
   */
  trackPageView(pageName: string, pageCategory?: string): void {
    // Incrementa contador para otimização
    clarityOptimization.incrementPageViews();

    this.trackConversion({
      eventName: 'page_view',
      properties: {
        page_name: pageName,
        page_category: pageCategory,
        page_title: document.title,
      },
    });
  }

  /**
   * Rastreia início do processo de checkout
   */
  trackCheckoutStart(planName: string, planPrice: string): void {
    this.trackConversion({
      eventName: 'checkout_start',
      value: parseFloat(planPrice.replace(/[^\d,]/g, '').replace(',', '.')),
      currency: 'BRL',
      properties: {
        plan_name: planName,
        plan_price: planPrice,
      },
    });
  }

  /**
   * Rastreia compra finalizada
   */
  trackPurchase(
    planName: string,
    planPrice: string,
    transactionId?: string
  ): void {
    this.trackConversion({
      eventName: 'purchase',
      value: parseFloat(planPrice.replace(/[^\d,]/g, '').replace(',', '.')),
      currency: 'BRL',
      properties: {
        plan_name: planName,
        plan_price: planPrice,
        transaction_id: transactionId,
      },
    });
  }

  /**
   * Rastreia tempo gasto em seções específicas
   */
  trackTimeOnSection(sectionName: string, timeSpent: number): void {
    this.trackConversion({
      eventName: 'time_on_section',
      properties: {
        section_name: sectionName,
        time_spent_seconds: timeSpent,
      },
    });
  }

  /**
   * Rastreia scroll depth
   */
  trackScrollDepth(percentage: number): void {
    this.trackConversion({
      eventName: 'scroll_depth',
      properties: {
        scroll_percentage: percentage,
        page_height: document.body.scrollHeight,
        viewport_height: window.innerHeight,
      },
    });
  }

  /**
   * Rastreia exit intent
   */
  trackExitIntent(trigger: string): void {
    this.trackConversion({
      eventName: 'exit_intent',
      properties: {
        trigger: trigger,
        time_on_page: Date.now() - performance.timing.navigationStart,
      },
    });
  }

  /**
   * Define atributos customizados do usuário
   */
  setUserAttributes(attributes: Record<string, any>): void {
    if (!this.isInitialized) return;

    try {
      clarity('identify', attributes);
    } catch (error) {
      console.error('Erro ao definir atributos do usuário:', error);
    }
  }

  /**
   * Obtém o ID da sessão atual do Clarity
   */
  getSessionId(): string | null {
    if (!this.isInitialized) return null;

    try {
      return (window as any).clarity?.getSessionId?.() || null;
    } catch (error) {
      console.error('Erro ao obter ID da sessão:', error);
      return null;
    }
  }
}

// Instância singleton
export const clarityService = new ClarityService();

// Configuração padrão otimizada para conversões com performance
export const initializeClarity = (
  projectId: string,
  config?: Partial<ClarityConfig>
) => {
  const clarityConfig: ClarityConfig = {
    projectId,
    enableHeatmaps: true,
    enableRecordings: true,
    enableAnalytics: true,
    ...config,
  };

  // Inicializa com otimização de performance
  clarityPerformanceOptimizer.initializeClarityWithDelay(() => {
    clarityService.initialize(clarityConfig);

    // Inicia monitoramento de performance
    clarityPerformanceOptimizer.monitorAndAdjustPerformance();
  });
};

export default clarityService;
