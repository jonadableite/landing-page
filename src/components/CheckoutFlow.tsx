import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UpsellPage from './UpsellPage';
import DownsellPage from './DownsellPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';

type FlowStep = 'checkout' | 'upsell' | 'downsell' | 'success';

interface CheckoutFlowProps {
  planName: string;
  planPrice: string;
  checkoutUrl: string;
}

export default function CheckoutFlow({ planName, planPrice, checkoutUrl }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInitialPurchase = async () => {
    setIsProcessing(true);
    
    // Simular processamento do pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setCurrentStep('upsell');
  };

  const handleUpsellAccept = () => {
    // Redirecionar para checkout do upsell
    window.location.href = `${checkoutUrl}?upsell=premium`;
  };

  const handleUpsellDecline = () => {
    setCurrentStep('downsell');
  };

  const handleDownsellAccept = () => {
    // Redirecionar para checkout do downsell
    window.location.href = `${checkoutUrl}?upsell=basic`;
  };

  const handleDownsellDecline = () => {
    setCurrentStep('success');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentStep === 'checkout' && (
          <motion.div
            key="checkout"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Finalizar Compra</CardTitle>
                <p className="text-muted-foreground">
                  Você está adquirindo o plano {planName}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {planPrice}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pagamento único • Sem mensalidades
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Garantia de 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Suporte incluído</span>
                  </div>
                </div>

                <Button
                  onClick={handleInitialPurchase}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Finalizar Compra
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao continuar, você concorda com nossos termos de uso
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 'upsell' && (
          <motion.div
            key="upsell"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <UpsellPage
              originalPlan={planName}
              onAccept={handleUpsellAccept}
              onDecline={handleUpsellDecline}
            />
          </motion.div>
        )}

        {currentStep === 'downsell' && (
          <motion.div
            key="downsell"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DownsellPage
              originalPlan={planName}
              onAccept={handleDownsellAccept}
              onDecline={handleDownsellDecline}
            />
          </motion.div>
        )}

        {currentStep === 'success' && (
          <motion.div
            key="success"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  Compra Realizada!
                </CardTitle>
                <p className="text-muted-foreground">
                  Obrigado por escolher o WhatLead
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Você receberá um email com os detalhes de acesso em instantes.
                </p>
                <Button
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full"
                >
                  Acessar Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}