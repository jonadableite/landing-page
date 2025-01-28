// src/components/Pricing.tsx
/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle, Crown, Star, Zap } from "lucide-react";
import { useRef, useState } from "react";

export default function PricingPage() {
	const [isYearly, setIsYearly] = useState(false);
	const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
	const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

	const plans = [
		{
			name: "Starter",
			icon: <Zap className="w-8 h-8" />,
			price: isYearly ? "290" : "29",
			color: "from-blue-500 to-cyan-400",
			features: [
				"5.000 mensagens/mês",
				"10 automações ativas",
				"Suporte por email",
				"Analytics básico",
				"API limitada",
			],
		},
		{
			name: "Pro",
			icon: <Star className="w-8 h-8" />,
			price: isYearly ? "890" : "89",
			color: "from-violet-500 to-purple-500",
			popular: true,
			features: [
				"50.000 mensagens/mês",
				"Automações ilimitadas",
				"Suporte prioritário",
				"Analytics avançado",
				"API completa",
				"Integrações premium",
			],
		},
		{
			name: "Enterprise",
			icon: <Crown className="w-8 h-8" />,
			price: isYearly ? "1990" : "199",
			color: "from-orange-500 to-pink-500",
			features: [
				"Mensagens ilimitadas",
				"Recursos exclusivos",
				"Suporte 24/7 VIP",
				"Analytics personalizado",
				"API dedicada",
				"Setup assistido",
				"Treinamento da equipe",
			],
		},
	];

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
								Escolha o Plano
							</span>
							<br />
							<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								Ideal para Você
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
						<span className="text-gray-400 text-lg">Mensal</span>
						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsYearly(!isYearly)}
							className="relative w-20 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-1"
						>
							<motion.div
								animate={{ x: isYearly ? 40 : 0 }}
								className="w-8 h-8 rounded-full bg-white shadow-lg"
							/>
						</motion.button>
						<span className="text-gray-400 text-lg">Anual</span>
						<motion.span
							animate={{
								scale: isYearly ? [1, 1.1, 1] : 1,
							}}
							transition={{ duration: 0.3 }}
							className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-white"
						>
							Economize 20%
						</motion.span>
					</motion.div>
				</motion.div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<AnimatePresence>
						{plans.map((plan, index) => (
							<motion.div
								key={plan.name}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 50 }}
								transition={{ delay: index * 0.2 }}
								onHoverStart={() => setHoveredPlan(index)}
								onHoverEnd={() => setHoveredPlan(null)}
								className="relative group"
							>
								<motion.div
									animate={
										hoveredPlan === index ? { scale: 1.05 } : { scale: 1 }
									}
									className={`
                    relative p-8 rounded-2xl
                    bg-deep-purple/30 backdrop-blur-xl
                    border border-gray-700
                    ${plan.popular ? "ring-2 ring-primary" : ""}
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
											R${plan.price}
										</span>
										<span className="text-gray-400">
											/{isYearly ? "ano" : "mês"}
										</span>
									</div>

									<ul className="space-y-4 mb-8">
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

									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={`
                      w-full py-4 rounded-xl font-bold text-white
                      bg-gradient-to-r ${plan.color}
                      group relative overflow-hidden
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

								{/* Glow Effect */}
								<motion.div
									animate={
										hoveredPlan === index ? { opacity: 0.2 } : { opacity: 0 }
									}
									className={`
                    absolute -inset-1 rounded-2xl
                    bg-gradient-to-r ${plan.color} blur-xl
                    transition-opacity duration-300
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
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-primary to-secondary group relative overflow-hidden"
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
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
}
