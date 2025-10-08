import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Gift } from 'lucide-react';

interface CountdownProps {
  /** Target date for countdown */
  targetDate?: Date;
  /** Duration in hours from now (alternative to targetDate) */
  durationHours?: number;
  /** Title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Show days in countdown */
  showDays?: boolean;
  /** Show seconds in countdown */
  showSeconds?: boolean;
  /** Callback when countdown reaches zero */
  onComplete?: () => void;
  /** Custom styling */
  variant?: 'default' | 'compact' | 'minimal';
  /** Color theme */
  theme?: 'purple' | 'red' | 'orange' | 'green';
  /** Custom className */
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  durationHours = 24,
  title = "⏰ Oferta por Tempo Limitado",
  subtitle = "Aproveite antes que expire!",
  showDays = true,
  showSeconds = true,
  onComplete,
  variant = 'default',
  theme = 'purple',
  className = '',
}) => {
  // Calculate target date
  const finalTargetDate = useMemo(() => {
    if (targetDate) return targetDate;
    
    const now = new Date();
    return new Date(now.getTime() + durationHours * 60 * 60 * 1000);
  }, [targetDate, durationHours]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => 
    calculateTimeLeft(finalTargetDate)
  );

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(finalTargetDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0 && !isExpired) {
        setIsExpired(true);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [finalTargetDate, isExpired, onComplete]);

  // Theme configurations
  const themes = {
    purple: {
      gradient: 'from-purple-600 to-blue-600',
      bg: 'bg-purple-900/20',
      border: 'border-purple-500/30',
      text: 'text-purple-300',
      accent: 'text-purple-400',
    },
    red: {
      gradient: 'from-red-600 to-pink-600',
      bg: 'bg-red-900/20',
      border: 'border-red-500/30',
      text: 'text-red-300',
      accent: 'text-red-400',
    },
    orange: {
      gradient: 'from-orange-600 to-red-600',
      bg: 'bg-orange-900/20',
      border: 'border-orange-500/30',
      text: 'text-orange-300',
      accent: 'text-orange-400',
    },
    green: {
      gradient: 'from-green-600 to-emerald-600',
      bg: 'bg-green-900/20',
      border: 'border-green-500/30',
      text: 'text-green-300',
      accent: 'text-green-400',
    },
  };

  const currentTheme = themes[theme];

  if (isExpired && timeLeft.total <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          text-center p-6 rounded-xl bg-gray-900/50 border border-gray-700/50
          ${className}
        `}
      >
        <div className="text-gray-400 text-lg font-medium">
          ⏰ Oferta Expirada
        </div>
        <div className="text-gray-500 text-sm mt-2">
          Fique atento às próximas promoções!
        </div>
      </motion.div>
    );
  }

  const renderTimeUnit = (value: number, label: string, index: number) => (
    <motion.div
      key={`${label}-${value}`}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      <div className={`
        relative overflow-hidden rounded-lg ${currentTheme.bg} ${currentTheme.border} border
        ${variant === 'compact' ? 'w-12 h-12' : variant === 'minimal' ? 'w-10 h-10' : 'w-16 h-16'}
      `}>
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute inset-0 flex items-center justify-center
              ${variant === 'compact' ? 'text-lg' : variant === 'minimal' ? 'text-base' : 'text-2xl'}
              font-bold text-white
            `}
          >
            {value.toString().padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
        
        {/* Animated background */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-10
        `} />
      </div>
      
      <div className={`
        mt-2 text-xs font-medium ${currentTheme.text}
        ${variant === 'minimal' ? 'text-xs' : 'text-sm'}
      `}>
        {label}
      </div>
    </motion.div>
  );

  const timeUnits = [
    ...(showDays && timeLeft.days > 0 ? [{ value: timeLeft.days, label: 'Dias' }] : []),
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' },
    ...(showSeconds ? [{ value: timeLeft.seconds, label: 'Seg' }] : []),
  ];

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <Clock className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-medium text-white">
          {timeUnits.map(unit => `${unit.value.toString().padStart(2, '0')}`).join(':')}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        text-center p-6 rounded-xl ${currentTheme.bg} ${currentTheme.border} border
        backdrop-blur-sm relative overflow-hidden
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift className={`w-5 h-5 ${currentTheme.accent}`} />
            </motion.div>
            <h3 className="text-lg font-bold text-white">
              {title}
            </h3>
          </div>
          
          {subtitle && (
            <p className={`text-sm ${currentTheme.text}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Countdown Display */}
        <div className={`
          flex items-center justify-center space-x-4
          ${variant === 'compact' ? 'space-x-3' : 'space-x-6'}
        `}>
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              {renderTimeUnit(unit.value, unit.label, index)}
              {index < timeUnits.length - 1 && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-white text-2xl font-bold pb-6"
                >
                  :
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${currentTheme.gradient}`}
              initial={{ width: '100%' }}
              animate={{ 
                width: `${Math.max(0, (timeLeft.total / (durationHours * 60 * 60 * 1000)) * 100)}%`
              }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className={`text-xs ${currentTheme.text} mt-2`}>
            Tempo restante
          </div>
        </div>

        {/* Urgency Indicator */}
        {timeLeft.total < 3600000 && ( // Less than 1 hour
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex items-center justify-center space-x-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-red-400" />
            </motion.div>
            <span className="text-red-400 text-sm font-medium">
              Últimas horas!
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Utility function to calculate time left
function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: difference };
}

// Hook for managing countdown state
export const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => 
    calculateTimeLeft(targetDate)
  );
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isExpired };
};

export default Countdown;