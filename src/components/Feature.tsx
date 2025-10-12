//src/components/Feature.tsx
/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

// src/components/Features.tsx
import {
	motion,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
	FaChartLine,
	FaDatabase,
	FaRobot,
	FaShieldAlt,
	FaUserFriends,
	FaWhatsapp,
} from "react-icons/fa";
import { scroller } from "react-scroll";

const Features = () => {
	const ref = useRef(null);
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

	const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };

	const scale = useSpring(
		useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
		springConfig,
	);

	const y = useSpring(
		useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]),
		springConfig,
	);

	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
		springConfig,
	);

	const features = [
		{
			icon: FaWhatsapp,
			title: "Disparos com Segurança e Escala",
			description:
				"Sistema anti-ban que protege suas contas WhatsApp enquanto permite disparos em massa com alta taxa de entrega.",
			color: "from-green-400 to-emerald-600",
			delay: 0.2,
		},
		{
			icon: FaChartLine,
			title: "Relatórios e Métricas Reais",
			description:
				"Acompanhe suas campanhas com relatórios detalhados de mensagens WhatsApp e métricas de conversão em tempo real.",
			color: "from-purple-400 to-purple-600",
			delay: 0.4,
		},
		{
			icon: FaRobot,
			title: "Ferramenta com IA para WhatsApp",
			description:
				"Inteligência artificial avançada para segmentação inteligente e automação completa de suas campanhas.",
			color: "from-blue-400 to-indigo-600",
			delay: 0.6,
		},
		{
			icon: FaShieldAlt,
			title: "Plataforma Anti-Ban WhatsApp",
			description:
				"Controle total das campanhas com sistema de proteção que reduz bloqueios de contas WhatsApp.",
			color: "from-red-400 to-rose-600",
			delay: 0.8,
		},
		{
			icon: FaDatabase,
			title: "Automação Completa para E-commerces",
			description: "Vendas automáticas no WhatsApp com segmentação inteligente e gestão eficiente de leads.",
			color: "from-amber-400 to-orange-600",
			delay: 1.0,
		},
		{
			icon: FaUserFriends,
			title: "WhatsApp Marketing para Agências",
			description: "Suporte e onboarding especializado para agências que gerenciam múltiplos clientes.",
			color: "from-cyan-400 to-teal-600",
			delay: 1.2,
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.section
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.8 }}
			id="recursos"
			className="relative py-24 overflow-hidden z-10"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 1 }}
					className="text-center mb-20"
				>
					<motion.div
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
					>
						<h2 className="text-5xl md:text-6xl font-bold mb-6">
						<span className="bg-gradient-to-r from-white via-primary/80 to-white text-transparent bg-clip-text">
							WhatsApp Marketing Avançado
						</span>
					</h2>
				</motion.div>
				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ delay: 0.5 }}
					className="text-xl text-gray-400 max-w-3xl mx-auto"
				>
					Aumente conversões via WhatsApp com nossa plataforma anti-ban e automação completa para e-commerces
				</motion.p>
				</motion.div>

				{/* Features Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							onHoverStart={() => setHoveredIndex(index)}
							onHoverEnd={() => setHoveredIndex(null)}
							whileHover={{ scale: 1.05, zIndex: 1 }}
							className="relative group"
						>
							<motion.div
								animate={{
									boxShadow:
										hoveredIndex === index
											? "0 20px 40px rgb(20, 16, 51)"
											: "0 0 0 rgba(0,0,0,0)",
								}}
								className="p-8 rounded-2xl bg-deep-purple/10 backdrop-blur-sm border border-gray-700 hover:border-primary/50 transition-all duration-300"
							>
								{/* Icon */}
								<motion.div
									whileHover={{ rotate: 360, scale: 1.1 }}
									transition={{ type: "spring", stiffness: 260, damping: 20 }}
									className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-6`}
								>
									<feature.icon className="w-full h-full text-white" />
								</motion.div>

								{/* Content */}
								<motion.h3
									className="text-2xl font-bold text-white mb-4"
									animate={{
										color: hoveredIndex === index ? "#25D366" : "#ffffff",
									}}
								>
									{feature.title}
								</motion.h3>
								<p className="text-gray-400">{feature.description}</p>

								{/* Hover Effects */}
								<motion.div
									className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 -z-10"
									initial={{ opacity: 0 }}
									animate={{
										opacity: hoveredIndex === index ? 1 : 0,
										scale: hoveredIndex === index ? 1.05 : 1,
									}}
									transition={{ duration: 0.3 }}
								/>
							</motion.div>

							{/* Particle Effects */}
							{hoveredIndex === index && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 pointer-events-none"
								>
									{[...Array(5)].map((_, i) => (
										<motion.div
											key={i}
											initial={{ scale: 0, x: "50%", y: "50%" }}
											animate={{
												scale: [0, 1, 0],
												x: ["50%", `${Math.random() * 100}%`],
												y: ["50%", `${Math.random() * 100}%`],
											}}
											transition={{
												duration: 1,
												delay: i * 0.2,
												repeat: Number.POSITIVE_INFINITY,
											}}
											className="absolute w-2 h-2 bg-primary/30 rounded-full"
										/>
									))}
								</motion.div>
							)}
						</motion.div>
					))}
				</motion.div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ delay: 0.8 }}
					className="text-center mt-20"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => {
							scroller.scrollTo("precos", {
								duration: 800,
								delay: 0,
								smooth: "easeInOutQuart",
								offset: -70,
							});
						}}
						className="relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full group overflow-hidden"
					>
						<motion.span
							className="absolute inset-0 bg-white"
							initial={{ scale: 0 }}
							whileHover={{ scale: 1 }}
							transition={{ duration: 0.3 }}
							style={{ originX: 0 }}
						/>
						<span className="relative z-10 group-hover:text-primary">
							Explorar Todos os Recursos
						</span>
					</motion.button>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				style={{ y }}
				className="absolute right-8 top-1/2 transform -translate-y-1/2"
			>
				<div className="h-20 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
			</motion.div>

			{/* Gradient for smooth transition to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep to-transparent pointer-events-none" />
		</motion.section>
	);
};

export default Features;
