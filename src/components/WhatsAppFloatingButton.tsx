/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = 'whatleads',
  message = 'Olá! Gostaria de saber mais sobre o WhatLeads.',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Mostrar o botão após 4 segundos para dar tempo da página carregar
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6
          }}
          className={`
            fixed z-50 ${className}
            /* Mobile positioning - mais acima para evitar conflito */
            bottom-20 right-4 
            /* Tablet positioning */
            sm:bottom-24 sm:right-6
            /* Desktop positioning */
            lg:bottom-28 lg:right-8
          `}
          style={{ overflow: 'visible' }}
        >
          {/* Tooltip/Message Bubble - Responsivo */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute bg-white rounded-lg shadow-xl border px-3 py-2 z-50
                  /* Mobile tooltip positioning */
                  right-14 bottom-0 max-w-[200px] text-xs
                  /* Tablet and desktop */
                  sm:right-16 sm:px-4 sm:py-3 sm:max-w-xs sm:text-sm
                "
                style={{ 
                  filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))',
                  marginBottom: '8px'
                }}
              >
                <div className="text-gray-800 font-medium whitespace-nowrap">
                  Fale conosco no WhatsApp!
                </div>
                <div className="text-gray-600 mt-1 hidden sm:block">
                  Resposta rápida garantida
                </div>
                {/* Arrow pointing to button - Responsivo */}
                <div className="absolute right-0 bottom-3 sm:bottom-4 transform translate-x-full">
                  <div className="w-0 h-0 border-l-6 border-l-white border-t-3 border-t-transparent border-b-3 border-b-transparent sm:border-l-8 sm:border-t-4 sm:border-b-4"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button - Tamanhos responsivos */}
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
            // Garantir área de toque adequada no mobile
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            {/* Pulsing Ring Animation - Responsivo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-green-400 rounded-full"
            />

            {/* Second Pulsing Ring (delayed) - Responsivo */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute inset-0 bg-green-300 rounded-full"
            />

            {/* Main Button Circle - Tamanhos responsivos */}
            <div className="
              relative bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg 
              flex items-center justify-center transition-all duration-300 
              group-hover:shadow-xl group-hover:from-green-500 group-hover:to-green-700
              /* Mobile size */
              w-12 h-12
              /* Tablet size */
              sm:w-14 sm:h-14
              /* Desktop size */
              lg:w-16 lg:h-16
            ">
              {/* WhatsApp Icon - Tamanhos responsivos */}
              <motion.svg
                className="
                  /* Mobile icon size */
                  w-6 h-6
                  /* Tablet icon size */
                  sm:w-7 sm:h-7
                  /* Desktop icon size */
                  lg:w-8 lg:h-8
                "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.085"
                  fill="white"
                />
              </motion.svg>

              {/* Notification Badge - Tamanhos responsivos */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 500 }}
                className="
                  absolute bg-red-500 rounded-full flex items-center justify-center
                  /* Mobile badge */
                  -top-0.5 -right-0.5 w-4 h-4
                  /* Tablet and desktop badge */
                  sm:-top-1 sm:-right-1 sm:w-5 sm:h-5
                "
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="
                    bg-white rounded-full
                    /* Mobile dot */
                    w-1.5 h-1.5
                    /* Tablet and desktop dot */
                    sm:w-2 sm:h-2
                  "
                />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloatingButton;