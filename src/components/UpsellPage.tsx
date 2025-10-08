import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  X, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  Shield,
  Star,
  ArrowRight,
  Gift
} from 'lucide-react';
import { trackCTAClick } from '@/lib/analytics';
import { useUTM } from '@/lib/utm';

interface UpsellPageProps {
  originalPlan: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellPage({ originalPlan, onAccept, onDecline }: UpsellPageProps) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
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
    trackCTAClick('upsell_accept', {
      original_plan: originalPlan,
      upsell_offer: 'premium_upgrade',
      utm_params: utmParams
    });
    onAccept();
  };

  const handleDecline = () => {
    trackCTAClick('upsell_decline', {
      original_plan: originalPlan,
      upsell_offer: 'premium_upgrade',
      utm_params: utmParams
    });
    onDecline();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header com Urgência */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Clock className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-semibold">
              Oferta expira em: {formatTime(timeLeft)}
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            🎉 Parabéns pela sua compra!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Você acabou de dar o primeiro passo para transformar seu WhatsApp
          </p>
          
          <p className="text-lg font-semibold text-primary">
            Mas que tal MULTIPLICAR seus resultados por apenas R$ 97 a mais?
          </p>
        </div>

        {/* Comparação de Planos */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Plano Atual */}
          <Card className="border-2 border-muted">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Seu Plano Atual</CardTitle>
              <Badge variant="secondary">{originalPlan}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Disparos básicos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Até 1.000 contatos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Suporte por email</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-muted-foreground">IA Avançada</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-muted-foreground">Automações Premium</span>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Premium */}
          <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary/80 text-white px-4 py-1 text-sm font-semibold">
              🔥 UPGRADE
            </div>
            
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl text-primary">Premium Upgrade</CardTitle>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-primary">R$ 97</span>
                <Badge variant="destructive">70% OFF</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-through">De R$ 297</p>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold">Tudo do plano anterior +</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">IA Avançada para conversas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Até 10.000 contatos</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm">Automações Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#4f47e6]" />
                <span className="text-sm">Suporte prioritário 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-pink-500" />
                <span className="text-sm">Bônus: Templates exclusivos</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prova Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-semibold">4.9/5 estrelas</p>
              <p className="text-sm text-muted-foreground">+2.000 avaliações</p>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold">+500% ROI</p>
              <p className="text-sm text-muted-foreground">Resultado médio</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold">+5.000 empresas</p>
              <p className="text-sm text-muted-foreground">Usam o Premium</p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleAccept}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              SIM! Quero o Upgrade por R$ 97
            </Button>
          </motion.div>

          <Button
            onClick={handleDecline}
            variant="ghost"
            size="lg"
            className="text-muted-foreground hover:text-foreground px-8 py-4"
          >
            Não, obrigado. Continuar com o plano atual
          </Button>
        </div>

        {/* Garantia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Garantia de 30 dias • Sem risco • Cancele quando quiser</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}