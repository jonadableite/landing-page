import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Zap, Shield, Clock, Star, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackCTAClick } from '../lib/analytics';
import { useUTM } from '../lib/utm';

interface StickyCallToActionProps {
  /** Show/hide the sticky CTA */
  isVisible?: boolean;
  /** Callback when CTA is clicked */
  onCtaClick?: (action: 'trial' | 'buy') => void;
  /** Callback when sticky is dismissed */
  onDismiss?: () => void;
  /** Custom trial button text */
  trialText?: string;
  /** Custom buy button text */
  buyText?: string;
  /** Show dismiss button */
  showDismiss?: boolean;
  /** Position of the sticky CTA */
  position?: 'top' | 'bottom';
  /** Custom className for styling */
  className?: string;
}

export const StickyCallToAction: React.FC<StickyCallToActionProps> = ({
  isVisible = true,
  onCtaClick,
  onDismiss,
  trialText = "🚀 Teste Grátis 7 Dias",
  buyText = "💎 Comprar Agora",
  showDismiss = true,
  position = 'bottom',
  className = '',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(0);
  const navigate = useNavigate();
  const { params: utmParams } = useUTM();

  // Ofertas rotativas para aumentar conversão
  const offers = [
    { icon: "🔥", text: "Últimas 24h: 70% OFF", highlight: "OFERTA LIMITADA" },
    { icon: "⚡", text: "Aumente vendas em 300%", highlight: "RESULTADO COMPROVADO" },
    { icon: "🎯", text: "Setup em apenas 5 minutos", highlight: "SUPER FÁCIL" },
    { icon: "💰", text: "ROI de 500% garantido", highlight: "GARANTIA TOTAL" }
  ];

  // Track scroll position to show/hide sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollPosition > windowHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotacionar ofertas a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const handleCtaClick = (action: 'trial' | 'buy') => {
    trackCTAClick('sticky_cta', action, utmParams as Record<string, string>);

    if (action === 'trial') {
      navigate('/trial-form');
    } else {
      // Redirecionar para o link do Hotmart
      window.open('https://pay.hotmart.com/K99734443S?off=unhl7sd0&checkoutMode=6&bid=1759884647707', '_blank');
    }

    onCtaClick?.(action);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const shouldShow = isVisible && !isDismissed && isScrolled;

  const stickyVariants: Variants = {
    hidden: {
      y: position === 'bottom' ? 100 : -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: position === 'bottom' ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          variants={stickyVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`
            fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 z-50
            bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]
            border-t-2 border-gradient-to-r from-[#4f47e6] via-blue-500 to-cyan-500
            shadow-2xl backdrop-blur-lg
            ${className}
          `}
        >
          {/* Background Pattern Animado */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

          {/* Borda animada superior */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4f47e6] to-transparent">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4f47e6]/80 via-blue-400 to-cyan-400"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          <div className="relative px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Left Side - Oferta Rotativa */}
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                <motion.div
                  className="flex-shrink-0"
                  variants={pulseVariants}
                  animate="pulse"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#4f47e6] via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.div
                    key={currentOffer}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{offers[currentOffer].icon}</span>
                      <span className="text-white font-bold text-sm sm:text-base">
                        {offers[currentOffer].text}
                      </span>
                      <motion.span
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {offers[currentOffer].highlight}
                      </motion.span>
                    </div>
                  </motion.div>

                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-blue-200">
                    <span className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Garantia 07 dias</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>4.9/5 (2.000+ reviews)</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+500% ROI</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - CTAs Modernos */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                {/* Trial Button */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleCtaClick('trial')}
                  className="
                    relative px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    hover:from-emerald-400 hover:to-teal-400
                    text-white rounded-xl shadow-lg hover:shadow-xl
                    border border-emerald-400/30 hover:border-emerald-300/50
                    transition-all duration-300 overflow-hidden
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-1">
                    <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                    {trialText}
                  </span>
                </motion.button>

                {/* Buy Button - Mais Destacado */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleCtaClick('buy')}
                  className="
                    relative px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold
                    bg-gradient-to-r from-[#4f47e6] via-blue-600 to-cyan-600
                    hover:from-[#4f47e6]/90 hover:via-blue-500 hover:to-cyan-500
                    text-white rounded-xl shadow-2xl hover:shadow-[#4f47e6]/25
                    border-2 border-[#4f47e6]/50 hover:border-[#4f47e6]/70
                    transform transition-all duration-300 overflow-hidden
                    focus:outline-none focus:ring-2 focus:ring-[#4f47e6]/50
                  "
                >
                  {/* Efeito de brilho animado */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />

                  <span className="relative flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    {buyText}
                  </span>

                  {/* Badge de desconto */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full transform rotate-12">
                    70% OFF
                  </div>
                </motion.button>

                {/* Dismiss Button */}
                {showDismiss && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDismiss}
                    className="
                      p-2 text-white/60 hover:text-white/90
                      hover:bg-white/10 rounded-full transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-[#4f47e6]/50
                    "
                    aria-label="Fechar"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Contador de urgência (opcional) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 300, ease: "linear" }} // 5 minutos
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing sticky CTA state
export const useStickyCallToAction = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if user has dismissed the sticky CTA before
  useEffect(() => {
    const dismissed = localStorage.getItem('sticky_cta_dismissed');
    if (dismissed) {
      const dismissedTime = new Date(dismissed);
      const now = new Date();
      const hoursSinceDismissed = (now.getTime() - dismissedTime.getTime()) / (1000 * 60 * 60);

      // Show again after 12 hours (mais agressivo para conversão)
      if (hoursSinceDismissed < 12) {
        setIsDismissed(true);
        setIsVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('sticky_cta_dismissed', new Date().toISOString());
  };

  const show = () => {
    setIsVisible(true);
    setIsDismissed(false);
    localStorage.removeItem('sticky_cta_dismissed');
  };

  const hide = () => {
    setIsVisible(false);
  };

  return {
    isVisible: isVisible && !isDismissed,
    show,
    hide,
    handleDismiss,
  };
};

export default StickyCallToAction;