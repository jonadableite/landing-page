import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  Shield,
  Star,
  ArrowRight,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { trackCTAClick } from '@/lib/analytics';
import { useUTM } from '@/lib/utm';

interface DownsellPageProps {
  originalPlan: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function DownsellPage({ originalPlan, onAccept, onDecline }: DownsellPageProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const utmParams = useUTM();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    trackCTAClick('downsell_accept', {
      original_plan: originalPlan,
      downsell_offer: 'basic_upgrade',
      utm_params: utmParams
    });
    onAccept();
  };

  const handleDecline = () => {
    trackCTAClick('downsell_decline', {
      original_plan: originalPlan,
      downsell_offer: 'basic_upgrade',
      utm_params: utmParams
    });
    onDecline();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-orange-500/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full"
      >
        {/* Header de Urgência */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500 font-semibold">
              Última chance: {formatTime(timeLeft)}
            </span>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Espere! Não vá embora ainda...
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-2">
            Entendo que R$ 97 pode ser muito agora
          </p>
          
          <p className="text-xl font-semibold text-primary">
            Que tal começar com algo menor? Apenas R$ 47!
          </p>
        </div>

        {/* Oferta Especial */}
        <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-500/5 to-orange-500/10 relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-orange-600 text-white px-4 py-1 text-sm font-semibold">
            💝 OFERTA ESPECIAL
          </div>
          
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-2xl text-orange-600">Upgrade Básico</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-orange-600">R$ 47</span>
              <Badge variant="destructive">Apenas hoje!</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-through">De R$ 147</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <p className="font-semibold text-lg mb-2">O que você ganha:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Tudo do seu plano atual</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">IA básica para respostas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Até 5.000 contatos</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm">3 automações extras</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Suporte prioritário</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-sm">Templates básicos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Depoimento Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-lg p-6 mb-8"
        >
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg italic mb-3">
              "Comecei com o upgrade básico e em 30 dias já tinha recuperado o investimento. 
              Agora faturei mais de R$ 15.000 só com WhatsApp!"
            </blockquote>
            <cite className="text-sm text-muted-foreground">
              - Maria Silva, E-commerce de Roupas
            </cite>
          </div>
        </motion.div>

        {/* Comparação Rápida */}
        <div className="bg-muted/30 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-center mb-4">Por que vale a pena?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-bold text-green-600 text-lg">+200%</div>
              <div className="text-muted-foreground">Mais conversões</div>
            </div>
            <div>
              <div className="font-bold text-blue-600 text-lg">5x</div>
              <div className="text-muted-foreground">Mais contatos</div>
            </div>
            <div>
              <div className="font-bold text-purple-600 text-lg">24/7</div>
              <div className="text-muted-foreground">Suporte prioritário</div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleAccept}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              SIM! Quero por apenas R$ 47
            </Button>
          </motion.div>

          <Button
            onClick={handleDecline}
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-foreground px-8 py-4"
          >
            Não, continuar sem upgrade
          </Button>
        </div>

        {/* Garantia e Urgência */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Garantia de 30 dias • Sem risco • Cancele quando quiser</span>
          </div>
          <p className="text-xs text-orange-600 font-semibold">
            ⚠️ Esta oferta não estará disponível novamente
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}