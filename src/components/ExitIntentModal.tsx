import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, Phone, Zap, Shield, Clock, Star } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { useUTM } from '../lib/utm';

interface ExitIntentModalProps {
  /** Show/hide the modal */
  isVisible?: boolean;
  /** Callback when modal is closed */
  onClose?: () => void;
  /** Callback when lead is captured */
  onLeadCapture?: (data: LeadData) => void;
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Offer text */
  offer?: string;
  /** Show phone field */
  showPhone?: boolean;
  /** Custom className */
  className?: string;
}

interface LeadData {
  email: string;
  phone?: string;
  source: string;
  utm?: Record<string, string>;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  isVisible = false,
  onClose,
  onLeadCapture,
  title = "🎯 Espere! Não perca esta oportunidade",
  subtitle = "Receba GRÁTIS nosso guia completo para aumentar vendas no WhatsApp",
  offer = "🎁 Guia + Templates + Bônus Exclusivos",
  showPhone = true,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { params: utmParams } = useUTM();
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isVisible && modalRef.current) {
      const firstInput = modalRef.current.querySelector('input') as HTMLInputElement;
      firstInput?.focus();
    }
  }, [isVisible]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email inválido';
    }

    // Phone validation (if shown)
    if (showPhone && phone.trim()) {
      const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Telefone inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const leadData: LeadData = {
        email: email.trim(),
        phone: showPhone ? phone.trim() : undefined,
        source: 'exit_intent_modal',
        utm: utmParams,
      };

      // Track the lead capture
      trackEvent('lead_capture', {
        source: 'exit_intent',
        email: email.trim(),
        ...utmParams,
      });

      // Call the callback
      onLeadCapture?.(leadData);

      setIsSubmitted(true);

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error) {
      console.error('Error capturing lead:', error);
      setErrors({ submit: 'Erro ao enviar. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    trackEvent('exit_intent_close', { source: 'exit_intent_modal', ...utmParams });
    onClose?.();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800
              rounded-2xl shadow-2xl border border-[#4f47e6]/20 overflow-hidden
              ${className}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 p-6">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#4f47e6] to-blue-500 rounded-full flex items-center justify-center"
                    >
                      <Gift className="w-8 h-8 text-white" />
                    </motion.div>

                    <h2 className="text-xl font-bold text-white mb-2">
                      {title}
                    </h2>

                    <p className="text-gray-300 text-sm">
                      {subtitle}
                    </p>
                  </div>

                  {/* Offer Highlight */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-[#4f47e6]/30 to-blue-900/30 rounded-xl border border-[#4f47e6]/20">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white mb-2">
                        {offer}
                      </div>

                      <div className="flex items-center justify-center space-x-4 text-sm text-[#4f47e6]/80">
                        <span className="flex items-center space-x-1">
                          <Zap className="w-4 h-4" />
                          <span>Estratégias comprovadas</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Shield className="w-4 h-4" />
                          <span>100% gratuito</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Seu melhor email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                          w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50
                          rounded-lg text-white placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-[#4f47e6]/50 focus:border-[#4f47e6]/50
                          transition-all duration-200
                        "
                        placeholder="seu@email.com"
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    {showPhone && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          WhatsApp (opcional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={handlePhoneChange}
                          className="
                            w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50
                            rounded-lg text-white placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-[#4f47e6]/50 focus:border-[#4f47e6]/50
                            transition-all duration-200
                          "
                          placeholder="(11) 99999-9999"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        w-full py-3 px-6 bg-gradient-to-r from-[#4f47e6] to-blue-500
                    hover:from-[#4f47e6]/90 hover:to-blue-600 disabled:opacity-50
                        text-white font-semibold rounded-lg shadow-lg
                        transition-all duration-200 flex items-center justify-center space-x-2
                      "
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-5 h-5" />
                          <span>Quero Receber Grátis</span>
                        </>
                      )}
                    </motion.button>

                    {errors.submit && (
                      <p className="text-sm text-red-400 text-center">{errors.submit}</p>
                    )}
                  </form>

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Dados protegidos</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Entrega imediata</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Sem spam</span>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    🎉 Perfeito!
                  </h3>

                  <p className="text-gray-300 mb-4">
                    Enviamos o material para seu email.<br />
                    Verifique sua caixa de entrada (e spam).
                  </p>

                  <div className="text-sm text-[#4f47e6]/80">
                    Esta janela fechará automaticamente...
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing exit intent detection
export const useExitIntent = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('exit_intent_shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setShowModal(true);
        setHasShown(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
      }
    };

    // Also show after 30 seconds if user hasn't interacted
    const showAfterDelay = () => {
      if (!hasShown) {
        setShowModal(true);
        setHasShown(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
      }
    };

    // Add event listener after a short delay to avoid immediate triggers
    setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      timeoutId = setTimeout(showAfterDelay, 30000); // 30 seconds
    }, 3000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasShown]);

  const closeModal = () => {
    setShowModal(false);
  };

  const resetExitIntent = () => {
    setHasShown(false);
    sessionStorage.removeItem('exit_intent_shown');
  };

  return {
    showModal,
    closeModal,
    resetExitIntent,
  };
};

export default ExitIntentModal;