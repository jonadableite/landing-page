// src/components/HowItWorks.tsx


/**
 * @copyright 2025 jonadab-whatlead
 * @license Apache-2.0
 */


import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaBolt, FaChartLine, FaRobot, FaShieldAlt } from "react-icons/fa";


const steps = [
	{
		icon: FaRobot,
		title: "IA com muitos modelos disponíveis", // Changed text heres
		description:
			"Configure suas automações com nossa IA avançada e agentes de IA.",
		color: "from-green-400 to-primary",
		gradient: "bg-gradient-to-r from-green-400/20 to-primary/20",
	},
	{
		icon: FaShieldAlt,
		title: "Proteção Garantida",
		description:
			"Sistema anti-ban que protege suas contas e mantém suas operações seguras.",
		color: "from-blue-400 to-blue-600",
	},
	{
		icon: FaBolt,
		title: "Disparos em Massa",
		description:
			"Envie milhares de mensagens personalizadas com alto índice de entrega.",
		color: "from-yellow-400 to-orange-500",
	},
	{
		icon: FaChartLine,
		title: "Análise de Resultados",
		description:
			"Acompanhe métricas e resultados em tempo real com dashboards detalhados.",
		color: "from-purple-400 to-purple-600",
	},
];


const HowItWorks = () => {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { margin: "-100px" });
	const [activeStep, setActiveStep] = useState(0);


	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});


	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);


	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	};


	const itemVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};


	return (
		<motion.section
			ref={containerRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="relative min-h-screen py-24 overflow-hidden"
		>
			{/* Animated Background (Gradiente suave) */}
			{/* <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity }}
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(20, 16, 51, 0.121) 0%, rgba(20, 16, 51, 0.1) 50%, transparent 70%)",
            "radial-gradient(circle at 80% 50%, rgba(20, 16, 51, 0.208) 0%, rgba(20, 16, 51, 0.1) 50%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      /> */}


			<motion.div
				style={{ scale }}
				className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
			>
				{/* Section Header */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="text-center mb-20"
				>
					<motion.h2
						variants={itemVariants}
						className="text-5xl md:text-6xl font-bold mb-6"
					>
						<motion.span
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
							className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text"
						>
							Como
						</motion.span>{" "}
						<motion.span
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{
								duration: 3,
								repeat: Number.POSITIVE_INFINITY,
								delay: 1.5,
							}}
							className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
						>
							Funciona
						</motion.span>
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className="text-xl text-gray-400 max-w-3xl mx-auto"
					>
						Processo simplificado e eficiente para automatizar suas campanhas
					</motion.p>
				</motion.div>


				{/* Steps Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
				>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ scale: 1.05, zIndex: 1 }}
							className="relative group"
							onHoverStart={() => setActiveStep(index)}
						>
							<motion.div
								className="relative z-10 h-full p-8 rounded-2xl bg-deep-purple/10 border border-gray-700 backdrop-blur-sm transition-all duration-300"
								animate={{
									borderColor:
										activeStep === index
											? "rgb(79, 71, 230)"
											: "rgba(75, 85, 99, 0.7)",
									boxShadow:
										activeStep === index ? "0 0 20px rgb(79, 71, 230)" : "none",
								}}
							>
								{/* Step Number */}
								<motion.div
									className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-deep-purple flex items-center justify-center"
									animate={{
										scale: activeStep === index ? [1, 1.2, 1] : 1,
										borderColor:
											activeStep === index
												? "rgba(37, 211, 102, 0.5)"
												: "rgba(75, 85, 99, 0.7)",
									}}
									transition={{ duration: 0.5 }}
								>
									<span className="text-primary font-bold">{index + 1}</span>
								</motion.div>


								{/* Icon */}
								<motion.div
									whileHover={{ rotate: 360, scale: 1.1 }}
									transition={{ type: "spring", stiffness: 260, damping: 20 }}
									className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} p-4 mb-6 shadow-lg`}
								>
									<step.icon className="w-full h-full text-white" />
								</motion.div>


								{/* Content */}
								<motion.h3
									className="text-xl font-bold text-white mb-4"
									animate={{
										color: activeStep === index ? "#25D366" : "#ffffff",
									}}
								>
									{step.title}
								</motion.h3>
								<motion.p
									className="text-gray-400"
									animate={{
										opacity: activeStep === index ? 1 : 0.7,
									}}
								>
									{step.description}
								</motion.p>


								{/* Connector */}
								{index < steps.length - 1 && (
									<motion.div
										className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block"
										animate={{
											x: [0, 10, 0],
											opacity: activeStep === index ? 1 : 0.3,
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
										}}
									>
										<BsArrowRight className="text-2xl text-primary" />
									</motion.div>
								)}
							</motion.div>


							{/* Hover Effect */}
							<motion.div
								className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300"
								animate={{
									opacity: activeStep === index ? 0.2 : 0,
									background: `linear-gradient(to right, ${step.color})`,
								}}
							/>
						</motion.div>
					))}
				</motion.div>


				{/* CTA Button */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="text-center mt-20"
				></motion.div>
			</motion.div>


			{/* Scroll Progress Indicator */}
			<motion.div
				style={{ y }}
				className="fixed right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
			>
				<motion.div
					style={{ scaleY: scrollYProgress }}
					className="w-1 h-24 bg-gradient-to-b from-primary to-transparent rounded-full origin-top"
				/>
			</motion.div>


			{/* Gradiente para transição suave para a próxima seção */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep via-deep/80 to-transparent pointer-events-none" />
		</motion.section>
	);
};


export default HowItWorks;
