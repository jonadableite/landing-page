/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

/**
 * Otimizações de performance para Microsoft Clarity
 * Garante que o Clarity não impacte negativamente a performance da página
 */

interface PerformanceConfig {
  /** Delay para inicialização do Clarity (em ms) */
  initDelay: number;
  /** Usar Web Workers quando possível */
  useWebWorkers: boolean;
  /** Throttle para eventos de scroll/resize (em ms) */
  eventThrottle: number;
  /** Máximo de eventos por segundo */
  maxEventsPerSecond: number;
  /** Usar requestIdleCallback quando disponível */
  useIdleCallback: boolean;
}

class ClarityPerformanceOptimizer {
  private config: PerformanceConfig;
  private eventQueue: Array<() => void> = [];
  private lastEventTime = 0;
  private eventCount = 0;
  private eventCountResetTimer: NodeJS.Timeout | null = null;

  constructor(config?: Partial<PerformanceConfig>) {
    this.config = {
      initDelay: 1000, // 1 segundo de delay
      useWebWorkers: true,
      eventThrottle: 100, // 100ms throttle
      maxEventsPerSecond: 10,
      useIdleCallback: true,
      ...config,
    };

    this.setupPerformanceOptimizations();
  }

  /**
   * Configura otimizações de performance
   */
  private setupPerformanceOptimizations(): void {
    // Throttle para eventos de scroll e resize
    this.setupEventThrottling();
    
    // Rate limiting para eventos
    this.setupRateLimiting();
    
    // Lazy loading de recursos não críticos
    this.setupLazyLoading();
    
    // Otimização de memory usage
    this.setupMemoryOptimization();
  }

  /**
   * Configura throttling para eventos
   */
  private setupEventThrottling(): void {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (type === 'scroll' || type === 'resize' || type === 'mousemove') {
        const throttledListener = this.throttle(listener as EventListener, this.config.eventThrottle);
        return originalAddEventListener.call(this, type, throttledListener, options);
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    }.bind(this);
  }

  /**
   * Throttle function para limitar frequência de execução
   */
  private throttle(func: EventListener, delay: number): EventListener {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return function(this: any, ...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  /**
   * Configura rate limiting para eventos
   */
  private setupRateLimiting(): void {
    this.eventCountResetTimer = setInterval(() => {
      this.eventCount = 0;
    }, 1000);
  }

  /**
   * Verifica se pode executar evento baseado em rate limiting
   */
  canExecuteEvent(): boolean {
    if (this.eventCount >= this.config.maxEventsPerSecond) {
      return false;
    }
    
    this.eventCount++;
    return true;
  }

  /**
   * Executa função com otimizações de performance
   */
  executeOptimized(fn: () => void, priority: 'high' | 'normal' | 'low' = 'normal'): void {
    if (!this.canExecuteEvent() && priority !== 'high') {
      this.eventQueue.push(fn);
      return;
    }

    if (this.config.useIdleCallback && 'requestIdleCallback' in window && priority === 'low') {
      requestIdleCallback(() => fn(), { timeout: 5000 });
    } else if (priority === 'low') {
      setTimeout(fn, 0);
    } else {
      fn();
    }
  }

  /**
   * Processa fila de eventos quando possível
   */
  private processEventQueue(): void {
    if (this.eventQueue.length === 0) return;

    const batchSize = Math.min(3, this.eventQueue.length);
    const batch = this.eventQueue.splice(0, batchSize);
    
    batch.forEach(fn => {
      if (this.canExecuteEvent()) {
        this.executeOptimized(fn, 'low');
      } else {
        this.eventQueue.unshift(fn); // Volta para a fila
      }
    });

    if (this.eventQueue.length > 0) {
      setTimeout(() => this.processEventQueue(), 100);
    }
  }

  /**
   * Configura lazy loading para recursos não críticos
   */
  private setupLazyLoading(): void {
    // Lazy load de scripts não críticos
    const lazyLoadScript = (src: string, callback?: () => void) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      
      if (callback) {
        script.onload = callback;
      }
      
      // Adiciona script quando a página estiver idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          document.head.appendChild(script);
        });
      } else {
        setTimeout(() => {
          document.head.appendChild(script);
        }, this.config.initDelay);
      }
    };

    // Preload de recursos críticos
    const preloadResource = (href: string, as: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    };

    // Exemplo de uso (pode ser customizado)
    // preloadResource('/critical-styles.css', 'style');
  }

  /**
   * Configura otimização de memória
   */
  private setupMemoryOptimization(): void {
    // Limpa event listeners não utilizados
    const cleanupUnusedListeners = () => {
      // Remove listeners de elementos que não existem mais no DOM
      const elements = document.querySelectorAll('[data-clarity-tracked]');
      elements.forEach(element => {
        if (!document.contains(element)) {
          // Remove listeners (implementação específica dependeria do uso)
          element.removeAttribute('data-clarity-tracked');
        }
      });
    };

    // Executa limpeza periodicamente
    setInterval(cleanupUnusedListeners, 30000); // A cada 30 segundos

    // Limpa cache quando necessário
    const clearCacheIfNeeded = () => {
      if (performance.memory && (performance.memory as any).usedJSHeapSize) {
        const memoryUsage = (performance.memory as any).usedJSHeapSize / (performance.memory as any).totalJSHeapSize;
        
        if (memoryUsage > 0.8) { // Se usando mais de 80% da memória
          // Força garbage collection se disponível
          if ('gc' in window) {
            (window as any).gc();
          }
          
          // Limpa event queue
          this.eventQueue = [];
        }
      }
    };

    setInterval(clearCacheIfNeeded, 60000); // A cada minuto
  }

  /**
   * Inicializa Clarity com delay otimizado
   */
  initializeClarityWithDelay(initFunction: () => void): void {
    const initialize = () => {
      // Verifica se a página está em um estado adequado para inicializar
      if (document.readyState === 'complete') {
        this.executeOptimized(initFunction, 'high');
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            this.executeOptimized(initFunction, 'high');
          }, this.config.initDelay);
        });
      }
    };

    // Usa requestIdleCallback se disponível
    if (this.config.useIdleCallback && 'requestIdleCallback' in window) {
      requestIdleCallback(initialize, { timeout: this.config.initDelay + 1000 });
    } else {
      setTimeout(initialize, this.config.initDelay);
    }
  }

  /**
   * Monitora performance e ajusta configurações dinamicamente
   */
  monitorAndAdjustPerformance(): void {
    const checkPerformance = () => {
      // Verifica FPS
      let lastTime = performance.now();
      let frameCount = 0;
      
      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          
          // Ajusta configurações baseado no FPS
          if (fps < 30) {
            this.config.eventThrottle = Math.min(this.config.eventThrottle * 1.5, 500);
            this.config.maxEventsPerSecond = Math.max(this.config.maxEventsPerSecond - 2, 3);
          } else if (fps > 50) {
            this.config.eventThrottle = Math.max(this.config.eventThrottle * 0.8, 50);
            this.config.maxEventsPerSecond = Math.min(this.config.maxEventsPerSecond + 1, 15);
          }
          
          frameCount = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
      };
      
      requestAnimationFrame(measureFPS);
    };

    // Inicia monitoramento após a página carregar
    if (document.readyState === 'complete') {
      checkPerformance();
    } else {
      window.addEventListener('load', checkPerformance);
    }
  }

  /**
   * Cleanup quando não precisar mais
   */
  cleanup(): void {
    if (this.eventCountResetTimer) {
      clearInterval(this.eventCountResetTimer);
    }
    
    this.eventQueue = [];
  }
}

// Instância singleton
export const clarityPerformanceOptimizer = new ClarityPerformanceOptimizer();

export default clarityPerformanceOptimizer;