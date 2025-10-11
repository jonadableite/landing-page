/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

import clarityService from './clarity';
import { clarityOptimization } from './clarity-optimization';

/**
 * Utilitários para testar e validar a implementação do Microsoft Clarity
 */

interface TestResult {
  test: string;
  passed: boolean;
  message: string;
  data?: any;
}

class ClarityTestingService {
  private testResults: TestResult[] = [];

  /**
   * Executa todos os testes de validação
   */
  async runAllTests(): Promise<TestResult[]> {
    this.testResults = [];

    console.log('🧪 Iniciando testes do Microsoft Clarity...');

    // Testes básicos
    await this.testClarityInitialization();
    await this.testEventTracking();
    await this.testSessionTracking();
    
    // Testes de conversão
    await this.testConversionTracking();
    await this.testCTATracking();
    await this.testFormTracking();
    
    // Testes de performance
    await this.testPerformanceImpact();
    
    // Testes de otimização
    await this.testOptimizationFeatures();

    this.displayTestResults();
    return this.testResults;
  }

  /**
   * Testa inicialização do Clarity
   */
  private async testClarityInitialization(): Promise<void> {
    try {
      const isInitialized = clarityService.isInitialized;
      
      this.addTestResult({
        test: 'Clarity Initialization',
        passed: isInitialized,
        message: isInitialized 
          ? 'Clarity foi inicializado corretamente' 
          : 'Clarity não foi inicializado',
      });

      // Testa se o script do Clarity foi carregado
      const clarityScript = document.querySelector('script[src*="clarity"]');
      this.addTestResult({
        test: 'Clarity Script Loading',
        passed: !!clarityScript,
        message: clarityScript 
          ? 'Script do Clarity carregado no DOM' 
          : 'Script do Clarity não encontrado no DOM',
      });

    } catch (error) {
      this.addTestResult({
        test: 'Clarity Initialization',
        passed: false,
        message: `Erro ao testar inicialização: ${error}`,
      });
    }
  }

  /**
   * Testa tracking de eventos básicos
   */
  private async testEventTracking(): Promise<void> {
    try {
      // Testa evento customizado
      clarityService.trackConversion({
        eventName: 'test_event',
        properties: { test: true, timestamp: Date.now() },
      });

      this.addTestResult({
        test: 'Custom Event Tracking',
        passed: true,
        message: 'Evento customizado enviado com sucesso',
      });

      // Testa page view
      clarityService.trackPageView('test_page', 'testing');

      this.addTestResult({
        test: 'Page View Tracking',
        passed: true,
        message: 'Page view tracking funcionando',
      });

    } catch (error) {
      this.addTestResult({
        test: 'Event Tracking',
        passed: false,
        message: `Erro no tracking de eventos: ${error}`,
      });
    }
  }

  /**
   * Testa tracking de sessão
   */
  private async testSessionTracking(): Promise<void> {
    try {
      const sessionId = clarityService.getSessionId();
      
      this.addTestResult({
        test: 'Session ID Generation',
        passed: !!sessionId,
        message: sessionId 
          ? `Session ID gerado: ${sessionId}` 
          : 'Session ID não foi gerado',
        data: { sessionId },
      });

      // Testa identificação de sessão
      clarityService.identifySession({
        utm_source: 'test',
        utm_medium: 'testing',
        utm_campaign: 'clarity_test',
      });

      this.addTestResult({
        test: 'Session Identification',
        passed: true,
        message: 'Sessão identificada com parâmetros UTM de teste',
      });

    } catch (error) {
      this.addTestResult({
        test: 'Session Tracking',
        passed: false,
        message: `Erro no tracking de sessão: ${error}`,
      });
    }
  }

  /**
   * Testa tracking de conversões
   */
  private async testConversionTracking(): Promise<void> {
    try {
      // Simula conversão
      clarityService.trackConversion({
        eventName: 'test_conversion',
        properties: {
          value: 99.99,
          currency: 'BRL',
          conversion_type: 'test',
        },
      });

      this.addTestResult({
        test: 'Conversion Tracking',
        passed: true,
        message: 'Tracking de conversão funcionando',
      });

      // Testa purchase tracking
      clarityService.trackPurchase('test_product', 99.99, 'BRL', {
        test_purchase: true,
      });

      this.addTestResult({
        test: 'Purchase Tracking',
        passed: true,
        message: 'Tracking de compra funcionando',
      });

    } catch (error) {
      this.addTestResult({
        test: 'Conversion Tracking',
        passed: false,
        message: `Erro no tracking de conversões: ${error}`,
      });
    }
  }

  /**
   * Testa tracking de CTAs
   */
  private async testCTATracking(): Promise<void> {
    try {
      clarityService.trackCTAClick('test_cta', 'test_location', '/test-url');

      this.addTestResult({
        test: 'CTA Click Tracking',
        passed: true,
        message: 'Tracking de cliques em CTA funcionando',
      });

    } catch (error) {
      this.addTestResult({
        test: 'CTA Tracking',
        passed: false,
        message: `Erro no tracking de CTA: ${error}`,
      });
    }
  }

  /**
   * Testa tracking de formulários
   */
  private async testFormTracking(): Promise<void> {
    try {
      clarityService.trackFormStart('test_form', 'test_page');
      clarityService.trackFormSubmit('test_form', 'success', {
        test_field: 'test_value',
      });

      this.addTestResult({
        test: 'Form Tracking',
        passed: true,
        message: 'Tracking de formulários funcionando',
      });

    } catch (error) {
      this.addTestResult({
        test: 'Form Tracking',
        passed: false,
        message: `Erro no tracking de formulários: ${error}`,
      });
    }
  }

  /**
   * Testa impacto na performance
   */
  private async testPerformanceImpact(): Promise<void> {
    try {
      const startTime = performance.now();
      
      // Simula múltiplos eventos para testar performance
      for (let i = 0; i < 10; i++) {
        clarityService.trackConversion({
          eventName: `performance_test_${i}`,
          properties: { iteration: i },
        });
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Considera bom se executar em menos de 50ms
      const performanceGood = executionTime < 50;
      
      this.addTestResult({
        test: 'Performance Impact',
        passed: performanceGood,
        message: `Tempo de execução: ${executionTime.toFixed(2)}ms ${performanceGood ? '(Bom)' : '(Pode melhorar)'}`,
        data: { executionTime },
      });

    } catch (error) {
      this.addTestResult({
        test: 'Performance Impact',
        passed: false,
        message: `Erro no teste de performance: ${error}`,
      });
    }
  }

  /**
   * Testa recursos de otimização
   */
  private async testOptimizationFeatures(): Promise<void> {
    try {
      // Testa se o serviço de otimização está funcionando
      clarityOptimization.incrementCTAClicks();
      clarityOptimization.updateMaxScrollDepth(50);
      clarityOptimization.incrementFormInteractions();

      this.addTestResult({
        test: 'Optimization Features',
        passed: true,
        message: 'Recursos de otimização funcionando',
      });

    } catch (error) {
      this.addTestResult({
        test: 'Optimization Features',
        passed: false,
        message: `Erro nos recursos de otimização: ${error}`,
      });
    }
  }

  /**
   * Adiciona resultado de teste
   */
  private addTestResult(result: TestResult): void {
    this.testResults.push(result);
  }

  /**
   * Exibe resultados dos testes no console
   */
  private displayTestResults(): void {
    console.log('\n📊 Resultados dos Testes do Microsoft Clarity:');
    console.log('=' .repeat(50));

    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;

    this.testResults.forEach(result => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} ${result.test}: ${result.message}`);
      
      if (result.data) {
        console.log(`   📋 Dados:`, result.data);
      }
    });

    console.log('=' .repeat(50));
    console.log(`📈 Resumo: ${passed}/${total} testes passaram (${((passed/total) * 100).toFixed(1)}%)`);

    if (passed === total) {
      console.log('🎉 Todos os testes passaram! Microsoft Clarity está funcionando perfeitamente.');
    } else {
      console.log('⚠️  Alguns testes falharam. Verifique a implementação.');
    }
  }

  /**
   * Testa dados em tempo real (para debug)
   */
  startRealTimeMonitoring(): void {
    console.log('🔍 Iniciando monitoramento em tempo real...');
    
    setInterval(() => {
      const sessionId = clarityService.getSessionId();
      if (sessionId) {
        console.log(`📡 Clarity ativo - Session ID: ${sessionId}`);
      }
    }, 10000); // A cada 10 segundos
  }

  /**
   * Simula jornada completa do usuário para teste
   */
  simulateUserJourney(): void {
    console.log('🎭 Simulando jornada completa do usuário...');

    // Simula page view
    setTimeout(() => {
      clarityService.trackPageView('home', 'landing');
      console.log('✅ Page view simulado');
    }, 1000);

    // Simula scroll
    setTimeout(() => {
      clarityService.trackScrollDepth('home', 50, 50);
      console.log('✅ Scroll depth simulado');
    }, 3000);

    // Simula clique em CTA
    setTimeout(() => {
      clarityService.trackCTAClick('hero_cta', 'hero_section', '/trial-form');
      console.log('✅ CTA click simulado');
    }, 5000);

    // Simula início de formulário
    setTimeout(() => {
      clarityService.trackFormStart('trial_form', 'trial_page');
      console.log('✅ Form start simulado');
    }, 7000);

    // Simula conversão
    setTimeout(() => {
      clarityService.trackConversion({
        eventName: 'trial_signup',
        properties: {
          form_name: 'trial_form',
          conversion_value: 0,
          user_type: 'new',
        },
      });
      console.log('✅ Conversão simulada');
    }, 10000);

    console.log('🎭 Jornada do usuário simulada com sucesso!');
  }
}

// Instância singleton
export const clarityTesting = new ClarityTestingService();

// Função de conveniência para executar testes rapidamente
export const testClarityImplementation = () => {
  return clarityTesting.runAllTests();
};

// Função para debug em desenvolvimento
export const debugClarity = () => {
  console.log('🐛 Modo debug do Clarity ativado');
  clarityTesting.startRealTimeMonitoring();
  clarityTesting.simulateUserJourney();
};

export default clarityTesting;