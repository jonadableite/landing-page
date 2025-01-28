/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion, useScroll, useTransform } from "framer-motion";
import {
	AlertTriangle,
	CheckCircle,
	FileText,
	Lock,
	Scale,
	Shield,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const complianceFeatures = [
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Conformidade Legal",
		description:
			"Garantimos total conformidade com as leis e regulamentos aplicáveis ao uso do WhatsApp Business API",
	},
	{
		icon: <CheckCircle className="w-6 h-6" />,
		title: "Boas Práticas",
		description:
			"Seguimos as melhores práticas e diretrizes estabelecidas pelo WhatsApp para marketing e comunicação",
	},
	{
		icon: <FileText className="w-6 h-6" />,
		title: "Documentação",
		description:
			"Mantemos documentação detalhada sobre nossos processos de compliance e políticas de uso",
	},
	{
		icon: <Scale className="w-6 h-6" />,
		title: "Transparência",
		description:
			"Operamos com total transparência em relação às nossas práticas de negócio e uso de dados",
	},
	{
		icon: <AlertTriangle className="w-6 h-6" />,
		title: "Gestão de Riscos",
		description:
			"Sistema robusto de identificação e mitigação de riscos relacionados ao compliance",
	},
	{
		icon: <Lock className="w-6 h-6" />,
		title: "Segurança",
		description:
			"Proteção avançada de dados e informações sensíveis dos nossos clientes",
	},
];

const Compliance = () => {
	const navigate = useNavigate();
	const containerRef = useRef(null);
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	return (
		<motion.div
			ref={containerRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="min-h-screen bg-deep text-white p-8 pt-16 sm:pt-20 md:pt-24"
		>
			{/* Animated Background */}
			<motion.div
				className="absolute inset-0 z-0"
				animate={{
					background: [
						"radial-gradient(circle at 20% 20%, rgba(95, 37, 211, 0.15) 0%, transparent 70%)",
						"radial-gradient(circle at 80% 80%, rgba(54, 37, 211, 0.15) 0%, transparent 70%)",
					],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
				}}
			/>

			{/* Floating Particles */}
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 bg-primary/30 rounded-full"
					animate={{
						y: ["0vh", "100vh"],
						x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
					}}
					transition={{
						duration: Math.random() * 10 + 15,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			))}

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<motion.h1
						className="text-4xl md:text-6xl font-bold mb-6"
						style={{ y, opacity }}
					>
						<span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
							Nosso Compromisso com
						</span>
						<br />
						<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
							Compliance e Ética
						</span>
					</motion.h1>

					<motion.p
						className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						Mantemos os mais altos padrões de conformidade e ética em todas as
						nossas operações, garantindo segurança e transparência para nossos
						clientes.
					</motion.p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{complianceFeatures.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							onHoverStart={() => setHoveredCard(index)}
							onHoverEnd={() => setHoveredCard(null)}
							className={`
                p-6 rounded-2xl backdrop-blur-sm
                border border-white/10
                hover:border-primary/50 transition-all duration-300
                ${hoveredCard === index ? "bg-primary/10" : "bg-white/5"}
              `}
						>
							<motion.div
								animate={hoveredCard === index ? { scale: 1.1 } : { scale: 1 }}
								className="flex items-start gap-4"
							>
								<div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary">
									{feature.icon}
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-300">{feature.description}</p>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default Compliance;
