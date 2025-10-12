import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Zap, Shield, Clock, Star, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackCTAClick } from '../lib/analytics';
import { useUTM } from '../lib/utm';
import clarityService from '../lib/clarity';

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
  trialText = "🚀 Teste Grátis",
  buyText = "💎 Comprar",
  showDismiss = true,
  position = 'bottom',
  className = '',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(0);
  const navigate = useNavigate();
  const { params: utmParams } = useUTM();

  // Ofertas rotativas otimizadas para mobile
  const offers = [
    { icon: "⚡", text: "Oferta Relâmpago", highlight: "70% OFF" },
    { icon: "🔥", text: "Últimas 24h", highlight: "HOJE" },
    { icon: "💎", text: "Acesso Premium", highlight: "LIMITADO" },
    { icon: "🚀", text: "Resultados Garantidos", highlight: "7 DIAS" }
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
    // Track no analytics existente
    trackCTAClick('sticky_cta', action, utmParams as Record<string, string>);

    // Track no Clarity para análise de comportamento
    clarityService.trackCTAClick(
      `sticky_${action}_button`,
      'sticky_bottom_bar',
      action === 'trial' ? '/trial-form' : 'https://pay.hotmart.com/K99734443S'
    );

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

  // Variantes de animação otimizadas para mobile
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
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      y: position === 'bottom' ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants: Variants = {
    hover: {
      scale: 1.02,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
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
            border-t border-[#4f47e6]/20 shadow-2xl backdrop-blur-sm
            ${className}
          `}
        >
          {/* Borda animada superior simplificada */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4f47e6] to-transparent" />

          <div className="relative px-3 sm:px-6 py-3 sm:py-4">
            {/* Layout Mobile-First Responsivo */}
            <div className="max-w-7xl mx-auto">
              {/* Mobile Layout (< 640px) */}
              <div className="sm:hidden">
                {/* Linha 1: Oferta Principal */}
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    key={currentOffer}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 flex-1"
                  >
                    <span className="text-xl">{offers[currentOffer].icon}</span>
                    <span className="text-white font-bold text-base truncate">
                      {offers[currentOffer].text}
                    </span>
                    <motion.span
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {offers[currentOffer].highlight}
                    </motion.span>
                  </motion.div>

                  {/* Dismiss Button Mobile */}
                  {showDismiss && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDismiss}
                      className="
                        ml-2 p-2 text-white/60 hover:text-white/90
                        hover:bg-white/10 rounded-full transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-[#4f47e6]/50
                        min-w-[44px] min-h-[44px] flex items-center justify-center
                      "
                      aria-label="Fechar"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                {/* Linha 2: Badges Simplificados Mobile */}
                <div className="flex items-center justify-center space-x-4 mb-3 text-xs text-blue-200">
                  <span className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Garantia 7d</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>4.9/5</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+500% ROI</span>
                  </span>
                </div>

                {/* Linha 3: Botões Mobile - Touch Friendly */}
                <div className="flex space-x-2">
                  {/* Trial Button Mobile */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleCtaClick('trial')}
                    className="
                      flex-1 relative px-4 py-4 text-sm font-semibold
                      bg-gradient-to-r from-emerald-500 to-teal-500
                      active:from-emerald-600 active:to-teal-600
                      text-white rounded-xl shadow-lg
                      border border-emerald-400/30
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                      min-h-[48px] flex items-center justify-center
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      <span className="font-bold">{trialText}</span>
                    </span>
                  </motion.button>

                  {/* Buy Button Mobile - Destacado */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleCtaClick('buy')}
                    className="
                      flex-1 relative px-4 py-4 text-sm font-bold
                      bg-gradient-to-r from-[#4f47e6] via-blue-600 to-cyan-600
                      active:from-[#4f47e6]/90 active:via-blue-700 active:to-cyan-700
                      text-white rounded-xl shadow-2xl
                      border-2 border-[#4f47e6]/50
                      transition-all duration-200 overflow-hidden
                      focus:outline-none focus:ring-2 focus:ring-[#4f47e6]/50
                      min-h-[48px] flex items-center justify-center
                    "
                  >
                    <span className="relative flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-bold">{buyText}</span>
                    </span>

                    {/* Badge de desconto mobile */}
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full transform rotate-12">
                      70% OFF
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Desktop Layout (>= 640px) */}
              <div className="hidden sm:flex items-center justify-between">
                {/* Left Side - Oferta Principal Desktop */}
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex flex-col space-y-2">
                    {/* Oferta rotativa */}
                    <motion.div
                      key={currentOffer}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{offers[currentOffer].icon}</span>
                        <span className="text-white font-bold text-base lg:text-lg">
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

                    <div className="flex items-center space-x-4 text-sm text-blue-200">
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

                {/* Right Side - CTAs Desktop */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  {/* Trial Button Desktop */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleCtaClick('trial')}
                    className="
                      relative px-5 py-3 text-sm font-semibold
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
                      <Gift className="w-4 h-4" />
                      {trialText}
                    </span>
                  </motion.button>

                  {/* Buy Button Desktop - Mais Destacado */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleCtaClick('buy')}
                    className="
                      relative px-7 py-3 text-sm font-bold
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
                      <ArrowRight className="w-4 h-4" />
                      {buyText}
                    </span>

                    {/* Badge de desconto */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full transform rotate-12">
                      70% OFF
                    </div>
                  </motion.button>

                  {/* Dismiss Button Desktop */}
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
          </div>

          {/* Contador de urgência simplificado para mobile */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 300, ease: "linear" }}
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