/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

import { useEffect, useRef } from 'react';
import clarityService from '../lib/clarity';
import { clarityOptimization } from '../lib/clarity-optimization';

interface ScrollTrackingOptions {
  /** Porcentagens de scroll para rastrear (padrão: [25, 50, 75, 100]) */
  scrollDepths?: number[];
  /** Tempo mínimo em uma seção para rastrear (em ms, padrão: 3000) */
  minTimeOnSection?: number;
  /** Nome da seção para tracking */
  sectionName?: string;
  /** Se deve rastrear tempo na seção */
  trackTimeOnSection?: boolean;
}

export const useScrollTracking = (options: ScrollTrackingOptions = {}) => {
  const {
    scrollDepths = [25, 50, 75, 100],
    minTimeOnSection = 3000,
    sectionName = 'unknown_section',
    trackTimeOnSection = true,
  } = options;

  const [trackedDepths, setTrackedDepths] = useState<Set<number>>(new Set());
  const sectionStartTime = useRef<number>(Date.now());
  const hasTrackedTime = useRef<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Atualiza dados de otimização
      clarityOptimization.updateMaxScrollDepth(scrollPercentage);

      // Track scroll depths
      scrollDepths.forEach(depth => {
        if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
          clarityService.trackScrollDepth(depth);
          setTrackedDepths(prev => new Set([...prev, depth]));
        }
      });
    };

    // Track time on section
    if (trackTimeOnSection && !hasTrackedTime.current) {
      timeoutId = setTimeout(() => {
        const timeSpent = Date.now() - sectionStartTime.current;
        clarityService.trackTimeOnSection(sectionName, Math.round(timeSpent / 1000));
        hasTrackedTime.current = true;
      }, minTimeOnSection);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [scrollDepths, minTimeOnSection, sectionName, trackTimeOnSection, trackedDepths]);

  // Reset tracking when section changes
  const resetTracking = () => {
    setTrackedDepths(new Set());
    sectionStartTime.current = Date.now();
    hasTrackedTime.current = false;
  };

  return {
    resetTracking,
    trackedDepths: Array.from(trackedDepths),
  };
};

/**
 * Hook para rastrear exit intent
 */
export const useExitIntentTracking = () => {
  const [hasTrackedExitIntent, setHasTrackedExitIntent] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Detectar quando o mouse sai da área superior da página
      if (e.clientY <= 0 && !hasTrackedExitIntent) {
        clarityService.trackExitIntent('mouse_leave_top');
        setHasTrackedExitIntent(true);
      }
    };

    const handleBeforeUnload = () => {
      if (!hasTrackedExitIntent) {
        clarityService.trackExitIntent('page_unload');
        setHasTrackedExitIntent(true);
      }
    };

    // Detectar tentativa de fechar aba/navegador
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'w' || e.key === 't') && !hasTrackedExitIntent) {
        clarityService.trackExitIntent('keyboard_shortcut');
        setHasTrackedExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasTrackedExitIntent]);

  return {
    hasTrackedExitIntent,
    resetExitIntentTracking: () => setHasTrackedExitIntent(false),
  };
};

/**
 * Hook para rastrear interações com elementos específicos
 */
export const useElementInteractionTracking = (elementRef: React.RefObject<HTMLElement>, elementName: string) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleClick = () => {
      clarityService.trackConversion({
        eventName: 'element_interaction',
        properties: {
          element_name: elementName,
          interaction_type: 'click',
          element_position: {
            x: element.offsetLeft,
            y: element.offsetTop,
          },
        },
      });
    };

    const handleMouseEnter = () => {
      clarityService.trackConversion({
        eventName: 'element_hover',
        properties: {
          element_name: elementName,
          interaction_type: 'hover',
        },
      });
    };

    element.addEventListener('click', handleClick);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('click', handleClick);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [elementRef, elementName]);
};