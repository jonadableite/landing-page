// src/components/Pricing.tsx
/**
 * @copyright 2025 jonadab-whatlead
 * @license Apache-2.0
 */
import {
  AnimatePresence, // Import AnimatePresence
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle, Crown, Star, Zap, Shield, Clock, Award, TrendingUp, Users, Gift } from "lucide-react";
import { useRef, useState } from "react";
import { trackCTAClick } from "../lib/analytics";
import { useUTM } from "../lib/utm";
import { Countdown } from "./Countdown";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { params: utmParams } = useUTM();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleSubscription = (checkoutUrl: string, planName: string, price: number) => {
    trackCTAClick('pricing_plan_select', {
      plan_name: planName,
      price: price,
      billing_cycle: isYearly ? 'yearly' : 'monthly',
      position: 'pricing_section',
      ...utmParams,
    });
    
    console.log("Redirecionando para o checkout da Hotmart:", checkoutUrl);
    window.location.href = checkoutUrl;
  };

  // Helper function to format currency values to "R$X.XX"
  const formatCurrency = (value: number): string => {
    return `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Define raw plan data with numerical prices
  const rawPlans = [
    {
      name: "Starter WhatsApp",
      icon: <Zap className="w-8 h-8" />,
      annualPriceValue: 1299.00, // Numerical annual price
      monthlyPriceValue: 129.90, // Numerical monthly price
      description: "Aumente conversões via WhatsApp com proteção anti-ban",
      color: "from-blue-500 to-cyan-400",
      features: [
        "15.000 mensagens WhatsApp/mês",
        "1.000 leads qualificados/mês",
        "2 automações de vendas ativas",
        "Plataforma anti-ban WhatsApp",
        "Relatórios de mensagens básicos",
        "Sistema de aquecimento básico",
      ],
      checkoutUrlMonthly: "https://pay.hotmart.com/K99734443S?off=6dzaxpbx&checkoutMode=10",
      checkoutUrlYearly: "https://pay.hotmart.com/K99734443S?off=496h6ukc&checkoutMode=6",
    },
    {
      name: "Pro WhatsApp",
      icon: <Star className="w-8 h-8" />,
      annualPriceValue: 2499.00, // Numerical annual price
      monthlyPriceValue: 249.90, // Numerical monthly price
      popular: true,
      description:
        "Vendas automáticas no WhatsApp com IA e controle total das campanhas",
      color: "from-violet-500 to-purple-500",
      features: [
        "2 Agentes de IA para WhatsApp",
        "50.000 mensagens WhatsApp/mês",
        "5.000 leads segmentados/mês",
        "Automação completa para e-commerces",
        "Suporte e onboarding especializado",
        "Relatórios e métricas reais",
        "API completa para integrações",
        "Sistema anti-ban avançado",
        "Segmentação inteligente WhatsApp",
      ],
      checkoutUrlMonthly: "https://pay.hotmart.com/K99734443S?off=yfn3498r&checkoutMode=6",
      checkoutUrlYearly: "https://pay.hotmart.com/K99734443S?off=unhl7sd0&checkoutMode=6",
    },
    {
      name: "Enterprise WhatsApp",
      icon: <Crown className="w-8 h-8" />,
      annualPriceValue: 4999.00, // Numerical annual price
      monthlyPriceValue: 499.90, // Numerical monthly price
      description:
        "WhatsApp marketing para agências com disparos ilimitados e segurança máxima",
      color: "from-orange-500 to-pink-500",
      features: [
        "Agentes de IA ilimitados",
        "Disparos com segurança e escala",
        "Mensagens WhatsApp ilimitadas",
        "Automação completa ilimitada",
        "Leads e conversões ilimitados",
        "Ferramenta com IA avançada",
        "Suporte 24/7 VIP especializado",
        "Relatórios personalizados",
        "API dedicada para WhatsApp",
        "Setup assistido completo",
        "Integrações personalizadas",
        "Sistema anti-ban personalizado",
        "Treinamento especializado da equipe",
      ],
      checkoutUrlMonthly: "https://pay.hotmart.com/K99734443S?off=rxy4yhqx&checkoutMode=6",
      checkoutUrlYearly: "https://pay.hotmart.com/K99734443S?off=vi4ma9kh&checkoutMode=6",
    },
  ];

  // Dynamically calculate and format prices based on isYearly state
  const plans = rawPlans.map(plan => {
    const displayedPrice = isYearly
      ? formatCurrency(plan.annualPriceValue)
      : formatCurrency(plan.monthlyPriceValue);

    // Calculate the equivalent monthly price only if yearly is selected
    const equivalentMonthlyPrice = isYearly
      ? formatCurrency(plan.annualPriceValue / 12)
      : null;

    const checkoutUrl = isYearly ? plan.checkoutUrlYearly : plan.checkoutUrlMonthly;

    return {
      ...plan,
      price: displayedPrice,
      monthlyPriceEquivalent: equivalentMonthlyPrice,
      checkoutUrl: checkoutUrl,
    };
  });

  return (
    <div
      ref={containerRef}
      id="precos"
      className="min-h-screen bg-gradient-to-br from-deep-purple via-deep to-deep-purple/90 py-20 px-4 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(112, 37, 211, 0.045) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(109, 37, 211, 0.089) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          animate={{
            y: ["0vh", "100vh"],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          style={{ y, opacity }}
          className="text-center space-y-8 mb-20"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block"
          >
            <h2 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Planos WhatsApp
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Anti-Ban e Automação
              </span>
            </h2>
          </motion.div>
          {/* Pricing Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            {/* Text "Mensal" with color animation */}
            <motion.span
              animate={{ color: isYearly ? '#9ca3af' : '#e5e7eb' }} // Animate to gray-400 or gray-100
              className="text-lg transition-colors duration-300"
            >
              Mensal
            </motion.span>
            {/* Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-20 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-1 flex items-center" // Added flex items-center for vertical alignment
            >
              <motion.div
                animate={{ x: isYearly ? 40 : 0 }} // Move 40px to the right for yearly
                transition={{ type: "spring", stiffness: 700, damping: 30 }} // Spring animation for smoother toggle
                className="w-8 h-8 rounded-full bg-white shadow-lg"
              />
            </motion.button>
            {/* Text "Anual" with color animation */}
            <motion.span
              animate={{ color: isYearly ? '#e5e7eb' : '#9ca3af' }} // Animate to gray-100 or gray-400
              className="text-lg transition-colors duration-300"
            >
              Anual
            </motion.span>
            {/* "Economize 20%" badge with AnimatePresence */}
            <AnimatePresence>
              {isYearly && (
                <motion.span
                  key="save-badge" // Key required for AnimatePresence
                  initial={{ opacity: 0, scale: 0.8, x: -10 }} // Initial state (fade in from left, slightly smaller)
                  animate={{ opacity: 1, scale: 1, x: 0 }} // Animate to visible state
                  exit={{ opacity: 0, scale: 0.8, x: -10 }} // Animate out (fade out to left, slightly smaller)
                  transition={{ duration: 0.3 }} // Smooth transition
                  className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-white" // Use inline-flex for potential icon alignment
                >
                  Economize 20%
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        {/* Pricing Cards */}
        {/* Added items-stretch to ensure grid items stretch to fill the cell height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <AnimatePresence>
            {/* Added filter(Boolean) for robustness */}
            {plans.filter(Boolean).map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                className="relative group" // This is the grid item
              >
                {/* Main Card Content */}
                <motion.div
                  animate={
                    hoveredPlan === index ? { scale: 1.05 } : { scale: 1 }
                  }
                  // Added transition for scale for smoother effect
                  transition={{ duration: 0.3 }}
                  className={`
                    relative p-8 rounded-2xl
                    bg-deep-purple/30 backdrop-blur-xl
                    border border-gray-700
                    ${plan.popular ? "ring-2 ring-primary" : ""}
                    h-full flex flex-col // Added h-full and flex flex-col
                  `}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-5 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-white text-sm font-medium">
                        Mais Popular
                      </div>
                    </motion.div>
                  )}
                  <div
                    className={`
                      w-16 h-16 rounded-xl mb-6
                      flex items-center justify-center
                      bg-gradient-to-r ${plan.color}
                    `}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">
                      /{isYearly ? "ano" : "mês"}
                    </span>
                  </div>
                  {/* MonthlyPrice (apenas se for plano anual) */}
                  {isYearly && plan.monthlyPriceEquivalent && (
                    <div className="text-sm text-green-500 mb-4">
                      Equivalente a {plan.monthlyPriceEquivalent}/mês
                    </div>
                  )}
                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-8">
                    {plan.description}
                  </p>
                  {/* Features list - flex-grow allows it to take up available space */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {/* Using index as key here is generally okay for static lists */}
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onHoverStart={() => setHoveredFeature(feature)}
                        onHoverEnd={() => setHoveredFeature(null)}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <motion.div
                          animate={
                            hoveredFeature === feature
                              ? { scale: 1.2 }
                              : { scale: 1 }
                          }
                        >
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </motion.div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  {/* Button - mt-auto pushes it to the bottom */}
                  <motion.button
                    onClick={() => handleSubscription(plan.checkoutUrl)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-full py-4 rounded-xl font-bold text-white
                      bg-gradient-to-r ${plan.color}
                      group relative overflow-hidden
                      mt-auto // Added mt-auto
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Começar Agora
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </motion.div>
                {/* Glow Effect - Adjusted to scale with the card */}
                <motion.div
                  animate={
                    hoveredPlan === index
                      ? { opacity: 0.2, scale: 1.05 } // Added scale animation
                      : { opacity: 0, scale: 1 } // Ensure scale resets
                  }
                  // Added transition for scale
                  transition={{ duration: 0.3 }}
                  className={`
                    absolute -inset-1 rounded-2xl
                    bg-gradient-to-r ${plan.color} blur-xl
                  `}
                  style={{ zIndex: -1 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 text-lg mb-4">
            Precisa de um plano personalizado?
          </p>
          <motion.a
            href="https://wa.me/5512988444921"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-primary to-secondary group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Falar com Especialista
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
