// src/components/RefundPolicyLink.tsx
import { ExternalLink, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface RefundPolicyLinkProps {
  variant?: 'inline' | 'footer' | 'modal';
  className?: string;
}

/**
 * Componente reutilizável para links da Política de Reembolso
 * 
 * Uso:
 * ```tsx
 * // No checkout footer
 * <RefundPolicyLink variant="footer" />
 * 
 * // Inline no texto
 * <RefundPolicyLink variant="inline" />
 * 
 * // Em modais
 * <RefundPolicyLink variant="modal" />
 * ```
 */
export default function RefundPolicyLink({
  variant = 'inline',
  className = ''
}: RefundPolicyLinkProps) {

  const baseStyles = 'transition-all duration-200 flex items-center gap-2';

  const variants = {
    inline: 'text-blue-400 hover:text-blue-300 hover:underline text-sm',
    footer: 'text-gray-400 hover:text-white text-sm',
    modal: 'text-blue-500 hover:text-blue-400 font-medium text-base',
  };

  const iconSize = variant === 'modal' ? 18 : 14;

  return (
    <motion.a
      href="/reembolso"
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <FileText size={iconSize} />
      <span>Política de Reembolso e Cancelamento</span>
      {variant === 'modal' && <ExternalLink size={14} />}
    </motion.a>
  );
}

/**
 * Exemplo de uso em Checkout:
 * 
 * ```tsx
 * // CheckoutPage.tsx
 * import RefundPolicyLink from './RefundPolicyLink';
 * 
 * // No footer do checkout
 * <div className="text-center mt-8 space-y-2">
 *   <p className="text-sm text-gray-500">
 *     Ao continuar, você concorda com nossos{' '}
 *     <a href="/terms" className="text-blue-500 hover:underline">Termos de Serviço</a>
 *     {' e '}
 *     <RefundPolicyLink variant="inline" />
 *   </p>
 * </div>
 * ```
 * 
 * Exemplo em Modal de Confirmação:
 * 
 * ```tsx
 * <Dialog>
 *   <DialogContent>
 *     <DialogTitle>Confirmar Assinatura</DialogTitle>
 *     <DialogDescription>
 *       Antes de confirmar, revise nossa{' '}
 *       <RefundPolicyLink variant="modal" />
 *     </DialogDescription>
 *   </DialogContent>
 * </Dialog>
 * ```
 */

