// src/components/CTASection.tsx
/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Rocket, Shield, Sparkles, Star, Zap } from "lucide-react";
import { useRef, useState } from "react";

export default function CTASection() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, margin: "-100px" });
	const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
	const [isButtonHovered, setIsButtonHovered] = useState(false);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

	const features = [
		{
			icon: <Rocket className="w-8 h-8" />,
			title: "Automação Inteligente",
			description: "Sistema avançado de automação com IA",
			color: "from-blue-500 to-purple-500",
		},
		{
			icon: <Shield className="w-8 h-8" />,
			title: "Proteção Total",
			description: "Segurança máxima para suas operações",
			color: "from-green-500 to-emerald-500",
		},
		{
			icon: <Sparkles className="w-8 h-8" />,
			title: "Recursos Premium",
			description: "Ferramentas exclusivas e poderosas",
			color: "from-yellow-500 to-orange-500",
		},
		{
			icon: <Zap className="w-8 h-8" />,
			title: "Alta Performance",
			description: "Velocidade e eficiência garantidas",
			color: "from-pink-500 to-rose-500",
		},
		{
			icon: <Star className="w-8 h-8" />,
			title: "Experiência VIP",
			description: "Suporte dedicado 24/7",
			color: "from-purple-500 to-indigo-500",
		},
	];

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen overflow-hidden bg-gradient-to-br from-deep-purple via-deep to-deep-purple/90 py-20 px-4"
		>
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
								Revolucione seu
							</span>
							<br />
							<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								Marketing Digital
							</span>
						</h2>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
					>
						Automatize, escale e potencialize seus resultados com nossa
						plataforma completa de gestão de campanhas.
					</motion.p>
				</motion.div>

				{/* Features Grid */}
				<motion.div
					variants={{
						hidden: { opacity: 0 },
						show: {
							opacity: 1,
							transition: {
								staggerChildren: 0.2,
							},
						},
					}}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							whileHover={{ scale: 1.05, y: -5 }}
							onHoverStart={() => setHoveredFeature(index)}
							onHoverEnd={() => setHoveredFeature(null)}
							className="relative p-8 rounded-2xl bg-deep-purple/30 backdrop-blur-lg border border-gray-700 shadow-xl group"
						>
							<motion.div
								className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
							/>

							<div className="relative z-10">
								<motion.div
									animate={
										hoveredFeature === index ? { rotate: [0, 15, -15, 0] } : {}
									}
									transition={{ duration: 0.5 }}
									className="text-primary mb-6 p-4 bg-white/5 rounded-xl w-fit"
								>
									{feature.icon}
								</motion.div>

								<h3 className="text-2xl font-bold text-white mb-3">
									{feature.title}
								</h3>
								<p className="text-gray-300">{feature.description}</p>
							</div>

							<motion.div
								className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background: `linear-gradient(45deg, ${feature.color})`,
									filter: "blur(20px)",
									zIndex: -1,
								}}
							/>
						</motion.div>
					))}
				</motion.div>

				{/* CTA Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="text-center"
				></motion.div>
			</div>

			{/* Scroll Progress */}
			<motion.div
				style={{ scaleX: scrollYProgress }}
				className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform origin-left"
			/>
		</section>
	);
}
