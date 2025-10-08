import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, Clock } from 'lucide-react';
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
  trialText = "Testar Grátis",
  buyText = "Comprar Agora",
  showDismiss = true,
  position = 'bottom',
  className = '',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { params: utmParams } = useUTM();

  // Track scroll position to show/hide sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollPosition > windowHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (action: 'trial' | 'buy') => {
    trackCTAClick('sticky_cta', action, utmParams);
    onCtaClick?.(action);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const shouldShow = isVisible && !isDismissed && isScrolled;

  const stickyVariants = {
    hidden: {
      y: position === 'bottom' ? 100 : -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
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
            bg-gradient-to-r from-[#4f47e6] via-blue-900 to-[#4f47e6]
            border-t-2 border-purple-500/30 shadow-2xl backdrop-blur-sm
            ${className}
          `}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />/{'>'}

          <div className="relative px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Left Side - Value Proposition */}
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-[#1e1b4a] to-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">
                    🚀 Aumente suas vendas no WhatsApp
                  </p>
                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-purple-200">
                    <span className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>7 dias grátis</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Setup em 5min</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - CTAs */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                {/* Trial Button */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleCtaClick('trial')}
                  className="
                    px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium
                    bg-white/10 hover:bg-white/20 text-white
                    border border-white/20 hover:border-white/30
                    rounded-lg backdrop-blur-sm transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                  "
                >
                  {trialText}
                </motion.button>

                {/* Buy Button */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleCtaClick('buy')}
                  className="
                    px-3 py-2 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold
                    bg-gradient-to-r from-[#1e1b4a] to-blue-500
                    hover:from-[#4f47e6] hover:to-blue-600
                    text-white rounded-lg shadow-lg
                    transform transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#4f47e6]
                  "
                >
                  {buyText}
                </motion.button>

                {/* Dismiss Button */}
                {showDismiss && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDismiss}
                    className="
                      p-1 sm:p-2 text-white/60 hover:text-white/80
                      hover:bg-white/10 rounded-full transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    "
                    aria-label="Fechar"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Animated Border */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400"
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

      // Show again after 24 hours
      if (hoursSinceDismissed < 24) {
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